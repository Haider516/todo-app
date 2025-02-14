"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.ok) {
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-lg">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold text-center">Login</h2>
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin} className="w-full">Sign In</Button>
          <Button onClick={() => signIn("google")} variant="outline" className="w-full">Sign in with Google</Button>
          <p className="text-center text-sm">
            Don't have an account? <a href="/auth/signup" className="text-blue-500">Sign up</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
