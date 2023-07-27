export function FIRInfoInCol(handleEdit, handleDelete) {
    return [
      {
        Header: "ID",
        accessor: "dd2",
        disableFilters: true,
      },
      {
        Header: "Submission Date",
        accessor: "submission",
        disableFilters: true,
      },
      {
        Header: "Other Upload",
        accessor: "otherUpload",
        disableFilters: true,
      },
      {
        Header: "Mlu Upload",
        accessor: "mluUpload",
        disableFilters: true,
      },
      {
        Header: "pv Upload",
        accessor: "pvUpload",
        disableFilters: true,
      },
      {
        Header: "Bha Upload",
        accessor: "bhaUpload",
        disableFilters: true,
      },
      {
        Header: "Mud Report Upload",
        accessor: "mudreportUpload",
        disableFilters: true,
      },
      // other columns...
      {
        Header: "Run Upload ",
        accessor: "runUpload",
        disableFilters: true,
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <button onClick={() => handleEdit(row.original)}>Edit</button>
            <button onClick={() => handleDelete(row.original)}>Delete</button>
          </div>
        ),
      },
    ];
  }
  