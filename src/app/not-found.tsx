"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona o usuário para /home
    router.replace("/home");
  }, [router]);

  return null;
}
