import { saveTalkAssignment } from "@/lib/actions/talk-assignments";

function toLocalInputValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function TalkAssignmentForm({
  assignment,
  teachers,
}: {
  assignment?: {
    id: string;
    topic: string;
    description: string;
    teacherId: string;
    scheduledAt: Date;
  };
  teachers: { id: string; name: string; active: boolean }[];
}) {
  return (
    <form action={saveTalkAssignment} className="space-y-5 max-w-xl">
      {assignment && <input type="hidden" name="id" value={assignment.id} />}

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">Topic</label>
        <input
          name="topic"
          required
          defaultValue={assignment?.topic}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">
          Brief description{" "}
          <span className="text-muted font-normal">(what the message covers)</span>
        </label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={assignment?.description}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold mb-1.5">Assigned teacher</label>
          <select
            name="teacherId"
            required
            defaultValue={assignment?.teacherId ?? ""}
            className="w-full p-3 rounded-xl border border-line bg-card"
          >
            <option value="" disabled>
              Choose a teacher…
            </option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
                {!t.active ? " (inactive)" : ""}
              </option>
            ))}
          </select>
          {teachers.length === 0 && (
            <p className="text-[12.5px] text-claret mt-1.5">
              Add a teacher to the roster first (Teach the Teacher → roster).
            </p>
          )}
        </div>
        <div>
          <label className="block text-[13px] font-semibold mb-1.5">
            Date &amp; time of delivery
          </label>
          <input
            type="datetime-local"
            name="scheduledAt"
            required
            defaultValue={assignment ? toLocalInputValue(assignment.scheduledAt) : undefined}
            className="w-full p-3 rounded-xl border border-line bg-card"
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-5 py-3 rounded-full bg-navy text-white font-semibold text-[14.5px]"
      >
        Save
      </button>
    </form>
  );
}
