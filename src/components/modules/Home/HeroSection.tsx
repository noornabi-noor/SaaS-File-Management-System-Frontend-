import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Folder, Cloud, Layers } from "lucide-react";

export default function HeroSection() {
  return (
    <main
      className="
        bg-gradient-to-b
        from-indigo-100 via-blue-50 to-purple-100
        dark:from-indigo-900 dark:via-black dark:to-purple-900
        text-gray-900 dark:text-white
      "
    >
      {/* HERO SECTION */}
      <section className="text-center py-32 px-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Smart Storage for
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {" "}Modern SaaS Teams
          </span>
        </h1>

        <p className="mt-6 text-gray-700 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          A powerful subscription-based File & Folder Management System
          where admins define limits and users manage storage seamlessly.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Link href="/register">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>

          <Link href="/pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <Folder className="mx-auto mb-4 text-blue-500" size={40} />,
              title: "Folder Hierarchy",
              desc: "Create nested folders with controlled depth based on subscription tier."
            },
            {
              icon: <Cloud className="mx-auto mb-4 text-purple-500" size={40} />,
              title: "Secure Upload",
              desc: "Upload images, videos, audio, and PDFs with strict file size control."
            },
            {
              icon: <Layers className="mx-auto mb-4 text-pink-500" size={40} />,
              title: "Tiered Packages",
              desc: "Free, Silver, Gold & Diamond plans with dynamic admin control."
            },
            {
              icon: <ShieldCheck className="mx-auto mb-4 text-green-500" size={40} />,
              title: "Strict Enforcement",
              desc: "Every file and folder action is validated against active subscription."
            }
          ].map((item) => (
            <Card
              key={item.title}
              className="
                bg-white dark:bg-gray-900
                border-gray-200 dark:border-white/10
                hover:scale-105 transition duration-300
              "
            >
              <CardContent className="p-6 text-center">
                {item.icon}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SUBSCRIPTION PREVIEW */}
      <section className="py-24 bg-gradient-to-b from-indigo-50 via-white to-purple-50 dark:bg-gray-950 dark:from-indigo-900 dark:via-black dark:to-purple-900 px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Subscription Plans</h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {["Free", "Silver", "Gold", "Diamond"].map((plan) => (
            <Card
              key={plan}
              className={`
                bg-white dark:bg-gray-900
                border-gray-200 dark:border-white/10
                text-center p-6
                hover:scale-105 transition
                ${plan === "Gold" ? "border-yellow-500 shadow-lg" : ""}
              `}
            >
              <h3 className="text-2xl font-bold mb-4">{plan}</h3>

              <p className="text-gray-700 dark:text-gray-400 mb-6">
                {plan === "Free" && "Basic access with limited storage"}
                {plan === "Silver" && "Extended storage and file control"}
                {plan === "Gold" && "Advanced limits for growing teams"}
                {plan === "Diamond" && "Unlimited power & maximum flexibility"}
              </p>

              <Link href="/pricing">
                <Button variant={plan === "Gold" ? "default" : "outline"}>Choose Plan</Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-28 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Upgrade Your Storage Experience?
        </h2>

        <p className="text-gray-700 dark:text-gray-400 max-w-xl mx-auto mb-10">
          Start with Free and upgrade anytime. Full control in admin hands,
          seamless experience for users.
        </p>

        <Link href="/register">
          <Button size="lg" className="px-10">Create Account Now</Button>
        </Link>
      </section>
    </main>
  );
}