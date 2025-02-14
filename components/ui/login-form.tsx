"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials or user does not exist.");
    } else {
      router.push("/");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email and password to log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>

            {/* <div className="relative my-4 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
              <span className="px-2 text-sm text-gray-500">or</span>
              <div className="w-full border-t border-gray-300"></div>
            </div> */}

            {/* Google Sign-in Button */}
            {/* <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <svg className="h-5 w-5" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M24 9.5c3.3 0 6.3 1.2 8.6 3.3l6.4-6.4C34.9 2.2 29.8 0 24 0 14.8 0 6.8 5.6 2.8 13.7l7.8 6C13.3 13.3 18.3 9.5 24 9.5z"></path>
                <path fill="#34A853" d="M46.1 24.5c0-1.5-.1-2.9-.4-4.3H24v8.7h12.6c-.6 3.1-2.3 5.8-4.9 7.7l7.8 6c4.5-4.2 7.1-10.4 7.1-17.4z"></path>
                <path fill="#FBBC05" d="M10.6 28.6c-1-3.1-1-6.5 0-9.6L2.8 13C-1.1 21.2-1.1 30.8 2.8 39l7.8-6c-1.1-2.3-1.1-5 0-7.3z"></path>
                <path fill="#EA4335" d="M24 48c6.5 0 12.4-2.1 17.1-5.7l-7.8-6c-3.3 2.2-7.5 3.3-11.7 3.3-5.7 0-10.7-3.8-12.5-9.1l-7.8 6C6.8 42.4 14.8 48 24 48z"></path>
              </svg>
              Sign in with Google
            </Button> */}

            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <a href="/auth/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
