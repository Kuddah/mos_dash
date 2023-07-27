export function BonusSheetInitialValues(selectedBonusSheet) {
  const numberOfDays = selectedBonusSheet
    ? selectedBonusSheet.daily_records.length
    : 31; // default to 31 days if no selectedBonusSheet is provided

  return {
    company_name: selectedBonusSheet ? selectedBonusSheet.company_name : "",
    employeeNumber: selectedBonusSheet ? selectedBonusSheet.employeeNumber : "",
    employeename: selectedBonusSheet ? selectedBonusSheet.employeename : "",
    employeegrade: selectedBonusSheet ? selectedBonusSheet.employeegrade : "",
    month: selectedBonusSheet ? selectedBonusSheet.month : "",    
    daily_records: Array.from(
      { length: numberOfDays },
      (_, i) =>
        selectedBonusSheet
          ? selectedBonusSheet.daily_records[i]
          : {
              date: i + 1,
              well: "",
              rig: "",
              job_number: "",
              status: "",
              tierType: "",
              total: "",
            }
    ),
    total_days: selectedBonusSheet ? selectedBonusSheet.total_days : "",
    total_amount: selectedBonusSheet ? selectedBonusSheet.total_amount : "",
  };
}
