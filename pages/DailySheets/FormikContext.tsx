// FormikContext.tsx
import { createContext } from "react";
import { FormikHelpers, FormikValues } from "formik";

type FormikContextType = {
  formik: {
    handleSubmit: (
      e?: React.FormEvent<HTMLFormElement> | undefined
    ) => void;
    handleChange: (
      e: React.ChangeEvent<any>
    ) => void;
    values: FormikValues;
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => any;
    // ... add here other functions and values you use from formik
  } | null;
  setFormik: React.Dispatch<React.SetStateAction<FormikContextType["formik"]>>;
};

export const FormikContext = createContext<FormikContextType>({
  formik: null,
  setFormik: () => {},
});
