import { useContext } from "react";
import { UserContext } from "@/UserContext.tsx";

export const useUser = () => {
  const { state, dispatch } = useContext(UserContext);

  return { user: state.user, dispatch };
};
