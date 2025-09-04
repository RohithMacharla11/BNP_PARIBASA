
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface AuthUser {
  id: number;
  email: string;
}

export function useAuth({ redirectTo = "/login", protect = false } = {}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.user) {
          setUser(data.user as AuthUser);
        } else {
          setUser(null);
          if (protect) router.push(redirectTo);
        }
      } catch {
        setUser(null);
        if (protect) router.push(redirectTo);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [protect, redirectTo, router]);

  return { user, loading };
}
