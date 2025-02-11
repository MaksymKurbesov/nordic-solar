import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useHandleDynamicImportError = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = (event) => {
      if (
        event.message?.includes("Failed to fetch dynamically imported module") ||
        event.message?.includes("Importing a module script failed")
      ) {
        navigate(location.pathname, { replace: true });
      }
    };

    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, [navigate, location]);
};

export default useHandleDynamicImportError;
