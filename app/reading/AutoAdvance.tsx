"use client";

// Demo only: after 3 seconds, move on to the Check results screen.
// (The real app would move on when the AI has finished reading the report.)
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AutoAdvance() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/check"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return null;
}
