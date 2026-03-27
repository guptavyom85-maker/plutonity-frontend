"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/api";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // This handles the #access_token=... in the URL automatically
        const { data, error } = await supabaseClient.auth.getSession();

        if (error || !data.session) {
          console.error("No session found:", error);
          router.push("/login");
          return;
        }

        const session = data.session;

        // Save token
        localStorage.setItem("access_token", session.access_token);
        localStorage.setItem("user_id", session.user.id);

        // Get username from backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`
            }
          }
        );

        if (response.ok) {
          const profile = await response.json();
          localStorage.setItem("username", profile.username);
        } else {
          // Fallback: use email prefix as username
          const username = session.user.email?.split("@")[0] || "user";
          localStorage.setItem("username", username);
        }

        router.push("/dashboard");

      } catch (err) {
        console.error("Callback error:", err);
        router.push("/login");
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-zinc-400 text-lg mb-4">Signing you in...</div>
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}
