import { useContext } from "react";
import { UserContext } from "@/UserContext.tsx";

export const useUser = () => {
  const { state } = useContext(UserContext);

  return { user: state.user };
};
