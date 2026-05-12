"use client";

import { useState } from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push("/admin/dashboard");

    } catch (error) {
      console.error(error);

      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
        min-h-screen
        flex items-center justify-center
        px-6
        text-white
      "
    >

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 blur-[140px] rounded-full" />

      <div
        className="
          relative z-10
          w-full max-w-md
          rounded-[40px]
          border border-white/10
          bg-white/5
          backdrop-blur-md
          p-10
        "
      >

        {/* Badge */}
        <div
          className="
            inline-flex
            px-4 py-2
            rounded-full
            border border-yellow-500/20
            bg-yellow-500/10
            text-yellow-500
            uppercase
            tracking-[5px]
            text-xs
            mb-8
          "
        >
          Admin Access
        </div>

        <h1 className="text-5xl font-bold mb-4">
          Welcome Back
        </h1>

        <p className="text-zinc-400 mb-10">
          Access the Al-Kawthar control center.
        </p>

        {/* Inputs */}
        <div className="space-y-6">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              px-5 py-4
              rounded-2xl
              bg-black/30
              border border-white/10
              outline-none
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              px-5 py-4
              rounded-2xl
              bg-black/30
              border border-white/10
              outline-none
            "
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              py-4
              rounded-2xl
              font-semibold
              transition
            "
          >

            {loading
              ? "Signing In..."
              : "Login"}

          </button>

        </div>

      </div>

    </main>
  );
}