import { Session, User } from "@supabase/supabase-js";
import { createContext } from "react";

export type AuthContextType = {
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
};

export const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
}>({ session: null, user: null, signOut: () => {} });
