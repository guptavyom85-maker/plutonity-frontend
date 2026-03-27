// app/auth/callback/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/api";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the URL
        const { data, error } = await supabaseClient.auth.getSession();

        if (error || !data.session) {
          router.push("/login");
          return;
        }

        const session = data.session;

        // Save token to localStorage
        localStorage.setItem("access_token", session.access_token);
        localStorage.setItem("user_id", session.user.id);

        // Get or create username from profiles table
        // We call our own backend to do this
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
        }

        router.push("/dashboard");

      } catch (err) {
        console.error("Auth callback error:", err);
        router.push("/login");
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-zinc-400 text-lg mb-2">Signing you in...</div>
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}