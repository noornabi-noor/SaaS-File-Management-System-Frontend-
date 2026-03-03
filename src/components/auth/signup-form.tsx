// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { register } from "@/services/auth/authClient";

// export default function SignupForm() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [image, setImage] = useState(""); 
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const user = await register({ name, email, password, role: "user", image });

//       // Save user info to localStorage for Navbar
//       localStorage.setItem("user", JSON.stringify(user));

//       // Redirect to home page
//       router.push("/dashboard");
//     } catch (err: any) {
//       setError(err.message || "Registration failed");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black via-purple-900 to-indigo-900 px-4">
//       <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6">
//         <div className="text-center space-y-2">
//           <h2 className="text-3xl font-bold text-white">Create Account ✨</h2>
//           <p className="text-gray-300 text-sm">Start managing your files in seconds</p>
//         </div>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition"
//             required
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 transition"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-pink-500 transition"
//             required
//           />

//           <input
//             type="url"
//             placeholder="Profile Image URL (optional)"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
//           />

//           {error && <p className="text-red-400 text-sm text-center">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:scale-105 transition-transform text-white font-semibold shadow-lg disabled:opacity-50"
//           >
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-center text-gray-300 text-sm">
//           Already have an account?{" "}
//           <Link href="/login" className="text-indigo-400 hover:underline cursor-pointer">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }







"use client";

import { useState } from "react";
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
import { register } from "@/services/auth/authClient";


export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    // const role = (form.elements.namedItem("role") as HTMLSelectElement).value;
    const image = (form.elements.namedItem("image") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await register({ name, email, password, phone, role:"user", image });
      setSuccessMessage(
        "A verification email has been sent to your inbox. Please check it and verify your email before logging in.",
      );
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </Field>

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
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+880123456789"
                  required
                />
              </Field>

              {/* <Field>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <select
                  id="role"
                  name="role"
                  className="w-full border rounded p-2 text-black dark:text-black bg-white dark:bg-white"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="STUDENT" className="text-black">
                    STUDENT
                  </option>
                  <option value="TUTOR" className="text-black">
                    TUTOR
                  </option>
                </select>
              </Field> */}

              <Field>
                <FieldLabel htmlFor="image">Profile Image URL</FieldLabel>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                />
                <FieldDescription>
                  Provide a link to your profile image.
                </FieldDescription>
              </Field>

              <Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                    />
                  </Field>
                </div>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
              {successMessage && (
                <p className="text-sm text-green-600 text-center">
                  {successMessage}
                </p>
              )}

              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Creating account..." : "Create Account"}
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
                  Already have an account?{" "}
                  <a href="/login" className="underline">
                    Sign in
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="/terms" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}

