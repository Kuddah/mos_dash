export function RunInfoOutCol(handleEdit, handleDelete) {
  return [
    {
      Header: "Depth Out",
      accessor: "depth_out",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Inc Out",
      accessor: "inc_out",
      disableFilters: true,
      filterable: true,
    },

    {
      Header: "Azi Out",
      accessor: "azi_out",
      disableFilters: true,
      filterable: true,
    },

    {
      Header: "Date Out",
      accessor: "dateout",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Date TD",
      accessor: "datetd",
      disableFilters: true,
      filterable: true,
    },

    {
      Header: "Drilling Hour",
      accessor: "drillinghour",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Pumping Hour",
      accessor: "pumpinghour",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "BRT Hour",
      accessor: "brthour",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "End Mud Weight",
      accessor: "end_mw",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Job Run ",
      accessor: "jobrun",
      disableFilters: true,
      filterable: true,
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
