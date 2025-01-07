import { UserProfile } from "@/core";
import { defaultHeader, domain } from "@/lib/utils";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserProfileContextType {
  userProfile: UserProfile | null;
  refreshUserProfile: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType>({
  userProfile: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refreshUserProfile: async () => {},
});

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(
    () =>
      JSON.parse(
        localStorage.getItem("userProfile") ?? "null"
      ) as UserProfile | null
  );

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  }, [userProfile]);

  const fetchUserProfile = useCallback(async () => {
    const response = await fetch(`${domain}/auth/status`, {
      method: "GET",
      ...defaultHeader,
    });
    if (response.ok) {
      const data = (await response.json()) as UserProfile;
      setUserProfile(data);
    } else {
      setUserProfile(null);
    }
  }, []);

  useEffect(() => {
    if (!userProfile) void fetchUserProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserProfileContext.Provider
      value={{ userProfile, refreshUserProfile: fetchUserProfile }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  return useContext(UserProfileContext);
}
