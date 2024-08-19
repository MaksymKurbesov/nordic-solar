import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useLoadingValue } from "./useLoadingValue";

export const useAuthState = (auth, options = {}) => {
  const { error, loading, setError, setValue, value } = useLoadingValue(
    () => auth.currentUser,
  );

  useEffect(() => {
    const listener = onAuthStateChanged(
      auth,
      async (user) => {
        if (options?.onUserChanged) {
          // onUserChanged function to process custom claims on any other trigger function
          try {
            await options.onUserChanged(user);
          } catch (e) {
            setError(e);
          }
        }
        setValue(user);
      },
      setError,
    );

    return () => {
      listener();
    };
  }, [auth]);

  return [value, loading, error];
};
