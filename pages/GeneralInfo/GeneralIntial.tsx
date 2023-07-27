export function GeneralInitialValues(selectedGeneral) {
    return {
      
      jobno: selectedGeneral ? selectedGeneral.jobno : "",
      loc: selectedGeneral ? selectedGeneral.loc : "",
      client: selectedGeneral ? selectedGeneral.client : "",
      field: selectedGeneral ? selectedGeneral.field : "",
      well: selectedGeneral ? selectedGeneral.well : "",
      rig: selectedGeneral ? selectedGeneral.rig : "",
      statu: selectedGeneral ? selectedGeneral.statu : "",
    };
        }
