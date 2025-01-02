import { UserProfile } from "@/core";
import { defaultHeader, domain } from "@/lib/utils";
import { useEffect, useState } from "react";

async function fetchUserProfile(): Promise<UserProfile | null> {
  const response = await fetch(`${domain}/auth/status`, {
    method: "GET",
    ...defaultHeader,
  });
  return response.ok ? ((await response.json()) as UserProfile) : null;
}

export function useUserProfile() {
  const cachedStatus = localStorage.getItem("status");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(
    cachedStatus ? JSON.parse(cachedStatus) : null
  );

  const refreshUserProfile = async () => {
    const userProfile = await fetchUserProfile();
    setUserProfile(userProfile);
    localStorage.setItem("status", JSON.stringify(userProfile));
  };

  useEffect(() => {
    refreshUserProfile();
  }, []);

  return [userProfile, refreshUserProfile] as const;
}
