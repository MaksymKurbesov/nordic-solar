import { useCallback, useMemo, useReducer } from "react";

const defaultState = (defaultValue) => {
  return {
    loading: defaultValue === undefined || defaultValue === null,
    value: defaultValue,
  };
};

const reducer = () => (state, action) => {
  switch (action.type) {
    case "error":
      return {
        ...state,
        error: action.error,
        loading: false,
        value: undefined,
      };
    case "reset":
      return defaultState(action.defaultValue);
    case "value":
      return {
        ...state,
        error: undefined,
        loading: false,
        value: action.value,
      };
    default:
      return state;
  }
};

export const useLoadingValue = (getDefaultValue) => {
  const defaultValue = getDefaultValue ? getDefaultValue() : undefined;
  const [state, dispatch] = useReducer(reducer(), defaultState(defaultValue));

  const reset = useCallback(() => {
    const defaultValue = getDefaultValue ? getDefaultValue() : undefined;
    dispatch({ type: "reset", defaultValue });
  }, [getDefaultValue]);

  const setError = useCallback((error) => {
    dispatch({ type: "error", error });
  }, []);

  const setValue = useCallback((value) => {
    dispatch({ type: "value", value });
  }, []);

  return useMemo(
    () => ({
      error: state.error,
      loading: state.loading,
      reset,
      setError,
      setValue,
      value: state.value,
    }),
    [state.error, state.loading, reset, setError, setValue, state.value],
  );
};
