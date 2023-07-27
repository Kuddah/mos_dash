
export function RunInfoinCol(handleEdit, handleDelete) {
  return [
    {
      Header: "BHA Run #",
      accessor: "bha_run",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Hole Size",
      accessor: "hole_size",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Bore Hole",
      accessor: "borehole",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Depth In",
      accessor: "depth_in",
      disableFilters: true,
      filterable: true,
    },

    {
      Header: "Inc In",
      accessor: "inc_in",
      disableFilters: true,
      filterable: true,
    },

    {
      Header: "Azi In",
      accessor: "azi_in",
      disableFilters: true,
      filterable: true,
    },


        {
          Header: "Date In",
          accessor: "datein",
          disableFilters: true,
          filterable: true,
        },



    
    {
      Header: "Mud Type",
      accessor: "mud_type",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Casing Shoe",
      accessor: "casing_shoe",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Casing Size",
      accessor: "casing_size",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Casing Weight",
      accessor: "casing_weight",
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
