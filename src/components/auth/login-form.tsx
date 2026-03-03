// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { login } from "@/services/auth/authClient";

// export default function LoginForm() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // Call login API
//       await login({ email, password });
//       // localStorage.setItem("user", JSON.stringify(user));
//       router.push("/dashboard");
//     } catch (err: any) {
//       setError(err.message || "Login failed");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-purple-900 px-4">
//       <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6">
//         <div className="text-center space-y-2">
//           <h2 className="text-3xl font-bold text-white">Welcome Back 👋</h2>
//           <p className="text-gray-300 text-sm">
//             Login to manage your files securely
//           </p>
//         </div>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="space-y-1">
//             <label className="text-gray-200 text-sm">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 transition"
//               required
//             />
//           </div>

//           <div className="space-y-1">
//             <label className="text-gray-200 text-sm">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition"
//               required
//             />
//           </div>

//           {error && (
//             <p className="text-red-400 text-sm text-center">{error}</p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-transform text-white font-semibold shadow-lg disabled:opacity-50"
//           >
//             {loading ? "Signing in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-center text-gray-300 text-sm">
//           Don't have an account?{" "}
//           <Link
//             href="/register"
//             className="text-indigo-400 hover:underline cursor-pointer"
//           >
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }












"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth/authClient";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      await login({ email, password });

      // redirect after login
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Logging in..." : "Login"}
                </Button>

                {/* <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={loginWithGoogle}
                >
                  Sign up with Google
                </Button> */}

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/register" className="underline">
                    Sign up
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
