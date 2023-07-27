import * as Yup from "yup";

export function BonusSheetVal() {
  return Yup.object().shape({
    company_name: Yup.string().required(),
    employeename: Yup.string().required(),
    employeegrade: Yup.string().required(),
    employeeNumber: Yup.string().required(),
    segment: Yup.string().required(),
    month: Yup.string().required(),
    daily_records: Yup.array()
      .of(
        Yup.object().shape({
          date: Yup.number().required('Date is required'),
          well: Yup.string().optional(),
          rig: Yup.string().optional(),
          job_number: Yup.string().optional(),
          status: Yup.string().optional(),
          tierType: Yup.string().optional(),
          total: Yup.number().optional(),
        })
      )
      .required(),
    total_days: Yup.number().required(),
    total_amount: Yup.number().required(),
  });
}
