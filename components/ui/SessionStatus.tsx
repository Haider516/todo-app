import { getServerSession } from "next-auth";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import LogoutButton from "./logout";

export default async function SessionStatus() {
  const session = await getServerSession(authOptions); 

  return (
    <div className="flex justify-end mb-4">
      {session ? (
        <LogoutButton />
      ) : (
        <Button onClick={() => signIn()} variant="outline">
          Login
        </Button>
      )}
    </div>
  );
}
