"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { youtubeId } from "@/lib/selah/youtube";
import type { PlayableEntry } from "@/lib/selah/types";

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId?: string;
          playerVars?: Record<string, number>;
          events?: {
            onReady?: () => void;
            onStateChange?: (e: { data: number }) => void;
          };
        },
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  loadVideoById(id: string): void;
  playVideo(): void;
  pauseVideo(): void;
  setVolume(v: number): void;
  getVolume(): number;
}

type PlayerState = {
  current: PlayableEntry | null;
  playing: boolean;
  volume: number; // 0–100
  kind: "none" | "audio" | "youtube" | "external";
};

type PlayerApi = PlayerState & {
  play: (entry: PlayableEntry) => void;
  toggle: () => void;
  stop: () => void;
  clear: () => void;
  setVolume: (v: number) => void;
};

const PlayerContext = createContext<PlayerApi | null>(null);

const STORAGE_KEY = "selah_player_v1";

function loadStored(): { entry: PlayableEntry | null; volume: number } {
  if (typeof window === "undefined") return { entry: null, volume: 80 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { entry: null, volume: 80 };
    const parsed = JSON.parse(raw);
    return { entry: parsed.entry ?? null, volume: parsed.volume ?? 80 };
  } catch {
    return { entry: null, volume: 80 };
  }
}

function persist(entry: PlayableEntry | null, volume: number) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ entry, volume }));
  } catch {
    // ignore (private browsing, quota, etc.)
  }
}

function loadYouTubeApi(onReady: () => void) {
  if (window.YT?.Player) {
    onReady();
    return;
  }
  const existing = document.getElementById("youtube-iframe-api");
  const prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    prev?.();
    onReady();
  };
  if (!existing) {
    const script = document.createElement("script");
    script.id = "youtube-iframe-api";
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  }
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<PlayableEntry | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(80);
  const [kind, setKind] = useState<PlayerState["kind"]>("none");
  const [hydrated, setHydrated] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytRef = useRef<YTPlayer | null>(null);
  const ytHostRef = useRef<HTMLDivElement | null>(null);
  const ytReadyRef = useRef(false);
  const pendingVideoId = useRef<string | null>(null);

  // Restore the last choice on mount, paused — never auto-play. This has to
  // run in an effect (not during render) since the stored value can only
  // differ from the server-rendered default after hydration, or React would
  // flag a client/server mismatch.
  useEffect(() => {
    const stored = loadStored();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration restore from localStorage, see comment above
    setCurrent(stored.entry);
    setVolumeState(stored.volume);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) persist(current, volume);
  }, [current, volume, hydrated]);

  const ensureYtPlayer = useCallback((videoId: string) => {
    loadYouTubeApi(() => {
      if (!ytHostRef.current) return;
      if (!ytRef.current) {
        ytRef.current = new window.YT!.Player(ytHostRef.current, {
          videoId,
          playerVars: { playsinline: 1 },
          events: {
            onReady: () => {
              ytReadyRef.current = true;
              ytRef.current?.setVolume(volume);
              if (pendingVideoId.current) {
                ytRef.current?.loadVideoById(pendingVideoId.current);
                pendingVideoId.current = null;
              }
              ytRef.current?.playVideo();
            },
            onStateChange: (e) => {
              // 1 = playing, 2 = paused, 0 = ended
              if (e.data === 1) setPlaying(true);
              if (e.data === 2 || e.data === 0) setPlaying(false);
            },
          },
        });
      } else if (ytReadyRef.current) {
        ytRef.current.loadVideoById(videoId);
        ytRef.current.playVideo();
      } else {
        pendingVideoId.current = videoId;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = useCallback(
    (entry: PlayableEntry) => {
      // Stop whatever is currently playing first.
      audioRef.current?.pause();
      ytRef.current?.pauseVideo();

      setCurrent(entry);

      if (entry.sourceType === "HOSTED" && entry.audioUrl) {
        setKind("audio");
        const audio = audioRef.current;
        if (audio) {
          audio.src = entry.audioUrl;
          audio.volume = volume / 100;
          void audio.play().then(() => setPlaying(true));
        }
        return;
      }

      if (entry.sourceType === "EMBED" && entry.embedUrl) {
        const id = youtubeId(entry.embedUrl);
        if (id) {
          setKind("youtube");
          ensureYtPlayer(id);
          return;
        }
        // Non-YouTube embed (e.g. Spotify): we can't drive playback from the
        // footer bar without each platform's own control SDK, so we hand the
        // visitor to the official page instead of faking a player.
        setKind("external");
        setPlaying(false);
        window.open(entry.embedUrl, "_blank", "noopener,noreferrer");
      }
    },
    [ensureYtPlayer, volume],
  );

  const toggle = useCallback(() => {
    if (kind === "audio") {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) {
        void audio.play().then(() => setPlaying(true));
      } else {
        audio.pause();
        setPlaying(false);
      }
    } else if (kind === "youtube") {
      if (playing) {
        ytRef.current?.pauseVideo();
      } else {
        ytRef.current?.playVideo();
      }
    }
  }, [kind, playing]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    ytRef.current?.pauseVideo();
    setPlaying(false);
  }, []);

  const clear = useCallback(() => {
    audioRef.current?.pause();
    ytRef.current?.pauseVideo();
    setPlaying(false);
    setKind("none");
    setCurrent(null);
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v / 100;
    ytRef.current?.setVolume(v);
  }, []);

  return (
    <PlayerContext.Provider
      value={{ current, playing, volume, kind, play, toggle, stop, clear, setVolume }}
    >
      {children}
      {/* Persistent, off-screen media hosts — kept mounted across route
          changes so playback never restarts when the visitor navigates. */}
      <audio
        ref={audioRef}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        className="hidden"
      />
      {/*
        YouTube's terms require an embedded player to stay visibly on
        screen rather than be hidden, so — unlike the <audio> element above —
        this stays a small but genuinely visible video frame, pinned above
        the footer player bar, whenever a YouTube track is loaded.
      */}
      <div
        ref={ytHostRef}
        className={
          kind === "youtube"
            ? "fixed bottom-[76px] left-3 w-20 h-[45px] rounded-lg overflow-hidden shadow-lg z-50"
            : "fixed bottom-[76px] left-3 w-0 h-0 overflow-hidden"
        }
      />
    </PlayerContext.Provider>
  );
}

export function useSelahPlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("useSelahPlayer must be used within PlayerProvider");
  return ctx;
}
