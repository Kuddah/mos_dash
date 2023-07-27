// context.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";

type Action = { type: "UPDATE_FORM"; payload: any };
type Dispatch = (action: Action) => void;
type State = any;
type FormProviderProps = { children: ReactNode };

const FormStateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

const formReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "UPDATE_FORM":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const FormProvider = ({ children }: FormProviderProps) => {
  const [state, dispatch] = useReducer(formReducer, {});

  return (
    <FormStateContext.Provider value={{ state, dispatch }}>
      {children}
    </FormStateContext.Provider>
  );
};

export const useFormState = () => {
  const context = useContext(FormStateContext);
  if (context === undefined) {
    throw new Error('useFormState must be used within a FormProvider')
  }
  return context;
}
