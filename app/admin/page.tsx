"use client";

import Link from "next/link";

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
        relative
        min-h-screen
        flex items-center justify-center
        px-6
        overflow-hidden
        text-white
      "
    >

      {/* Background Glow */}
      <div
        className="
          absolute
          top-1/2 left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[700px]
          h-[700px]
          bg-yellow-500/10
          blur-[180px]
          rounded-full
        "
      />

      {/* Top Navigation */}
      <div
        className="
          absolute
          top-8
          left-1/2
          -translate-x-1/2
          z-20
          flex gap-4
        "
      >

        <Link
          href="/"
          className="
            px-6 py-3
            rounded-2xl
            border border-white/10
            bg-white/5
            hover:bg-white/10
            backdrop-blur-sm
            transition
          "
        >
          Home
        </Link>

        <Link
          href="/products"
          className="
            px-6 py-3
            rounded-2xl
            border border-white/10
            bg-white/5
            hover:bg-white/10
            backdrop-blur-sm
            transition
          "
        >
          Products
        </Link>

      </div>

      {/* Login Card */}
      <div
        className="
          relative z-10
          w-full max-w-md
          rounded-[40px]
          border border-white/10
          bg-white/5
          backdrop-blur-md
          p-10
          shadow-[0_20px_80px_rgba(0,0,0,0.45)]
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
          Control Center
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Welcome Back
        </h1>

        <p className="text-zinc-400 mb-10 leading-relaxed">
          Login to manage inventory,
          campaigns, collections,
          and featured fragrances.
        </p>

        {/* Email */}
        <div className="mb-5">

          <label className="block mb-3 text-zinc-400">
            Email
          </label>

          <input
            type="email"
            placeholder="admin@alkawthar.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              px-6 py-5
              rounded-2xl
              bg-black/30
              border border-white/10
              outline-none
              focus:border-yellow-500
              transition
            "
          />

        </div>

        {/* Password */}
        <div className="mb-8">

          <label className="block mb-3 text-zinc-400">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              px-6 py-5
              rounded-2xl
              bg-black/30
              border border-white/10
              outline-none
              focus:border-yellow-500
              transition
            "
          />

        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            bg-yellow-500
            hover:bg-yellow-400
            disabled:opacity-50
            text-black
            py-5
            rounded-2xl
            font-semibold
            transition
            shadow-[0_10px_30px_rgba(234,179,8,0.25)]
          "
        >

          {loading
            ? "Signing In..."
            : "Login"}

        </button>

        {/* Footer */}
        <div
          className="
            mt-8
            text-center
            text-zinc-500
            text-sm
          "
        >
          Powered by Ahanger Labs
        </div>

      </div>

    </main>
  );
}