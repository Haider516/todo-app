"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <div className="absolute top-4 right-4">
      <Button variant="destructive" onClick={() => signOut({ callbackUrl: "/auth/login" })}>
        Sign Out
      </Button>
    </div>
  );
}
