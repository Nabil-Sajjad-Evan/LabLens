"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Screen from "@/components/Screen";
import { PageTitle } from "@/components/Headings";
import PrimaryButton from "@/components/PrimaryButton";
import { createClient } from "@/lib/supabase/client";

// Sign in or create an account with email and password (route: /login)
export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    const supabase = createClient();
    const { error } =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    setBusy(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    router.push("/upload");
  }

  const inputClass =
    "mt-2 h-14 w-full rounded-md border-2 border-rule px-4 text-lg text-ink focus:border-brand focus:outline-none";

  return (
    <Screen>
      <PageTitle>{mode === "signin" ? "Sign in" : "Create your account"}</PageTitle>
      <p className="mt-3 text-lg leading-relaxed text-muted">
        Your reports are private to your account.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <label className="block text-[1.0625rem] font-bold text-ink">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="block text-[1.0625rem] font-bold text-ink">
          Password
          <input
            type="password"
            required
            minLength={6}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </label>

        {message && (
          <p role="alert" className="text-[1.0625rem] font-bold text-urgent">
            {message}
          </p>
        )}

        <PrimaryButton type="submit" disabled={busy}>
          {busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
        </PrimaryButton>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setMessage("");
        }}
        className="mt-3 flex min-h-14 items-center text-[1.0625rem] font-bold text-brand underline underline-offset-4"
      >
        {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
      </button>

      <div className="min-h-6 flex-1" />
      <p className="text-sm leading-normal text-muted">
        LabLens explains results in plain language. It does not diagnose. Please talk to your
        doctor about your results.
      </p>
    </Screen>
  );
}