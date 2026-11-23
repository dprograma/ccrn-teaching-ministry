import type { DefaultSession } from "next-auth";

// next-auth v5 re-exports Session/User/JWT from @auth/core — augmenting
// "next-auth" itself only merges a type-only re-export, not the original
// interface, so the augmentation has to target the actual declaring module.

declare module "@auth/core/types" {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: string;
  }
}
