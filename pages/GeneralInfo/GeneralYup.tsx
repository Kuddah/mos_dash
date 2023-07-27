import * as Yup from "yup";
export function GeneralVal() {
    return Yup.object().shape({
      jobno: Yup.string().required(),
      loc: Yup.string().required(),
      client: Yup.string().required(),
      field: Yup.string().required(),
      well: Yup.string().required(),
      rig: Yup.string().required(),
      statu: Yup.string().required(),
    });
}