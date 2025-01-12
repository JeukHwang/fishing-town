import { UserProfile } from "@/core";
import { rawApi } from "@/lib/utils";
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
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const UserProfileContext = createContext<ContextProps<false>>({
  userProfile: null,
  signIn: () => new Promise(() => false),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => new Promise(() => {}),
});

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const fetchUserProfile = useCallback(async () => {
    const response = await rawApi(`auth/status`, { method: "GET" });
    if (response.ok) {
      const data = (await response.json()) as UserProfile;
      setUserProfile(data);
    } else {
      setUserProfile(null);
    }
  }, []);

  useEffect(() => {
    void fetchUserProfile();
    setInterval(() => {
      void (async () => {
        await rawApi("auth/refresh", { method: "GET" });
        await fetchUserProfile();
      })();
    }, 20 * 60 * 1000);
  }, [fetchUserProfile]);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const response = await rawApi(`auth/signin`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      await fetchUserProfile();
      return true;
    } else {
      return false;
    }
  };

  const signOut = async () => {
    await rawApi(`auth/signout`, { method: "GET" });
    setUserProfile(null);
  };

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        signIn,
        signOut,
      }}
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
