import { UserProfile } from "@/core";
import { defaultHeader, domain } from "@/lib/utils";
import {
  Context,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextProps<Auth extends boolean> {
  userProfile: Auth extends true ? UserProfile : UserProfile | null;
  refreshUserProfile: () => Promise<void>;
}

const UserProfileContext = createContext<ContextProps<false>>({
  userProfile: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refreshUserProfile: async () => {},
});

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(
    () =>
      JSON.parse(
        "null"
        // localStorage.getItem("userProfile") ?? "null"
      ) as UserProfile | null
  );

  useEffect(() => {
    // localStorage.setItem("userProfile", JSON.stringify(userProfile));
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
    void (async () => {
      await fetch(`${domain}/auth/refresh`, {
        method: "GET",
        ...defaultHeader,
      });
      setInterval(() => {
        void fetch(`${domain}/auth/refresh`, {
          method: "GET",
          ...defaultHeader,
        });
        console.log("refreshed");
      }, 20 * 60 * 1000);

      if (!userProfile) await fetchUserProfile();
    })();
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

// TODO: remove auth
// TODO: remembe this good practice!!!!!
// eslint-disable-next-line react-refresh/only-export-components
export function useUserProfile<Auth extends boolean>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _props: { auth: Auth } = { auth: false } as { auth: Auth }
) {
  const context = useContext<ContextProps<Auth>>(
    UserProfileContext as unknown as Context<ContextProps<Auth>>
  );
  //   const navigate = useNavigate();
  //   if (auth && context.userProfile === null) {
  //     void navigate(redirectAfterLogin(window.location.pathname));
  //   }
  return context;
}
