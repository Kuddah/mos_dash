
export function ToolOrderCol(handleEdit, handleDelete) {
  return [
    {
      Header: "Date",
      accessor: "date",
      filterable: true,
    },
    {
      Header: "Job Number",
      accessor: "jobnumber",
      filterable: true,
    },
    {
      Header: "Revision",
      accessor: "revision",
      filterable: true,
    },
    {
      Header: "Job Type",
      accessor: "jobtype",
      filterable: true,
    },
    {
      Header: "Rig Name",
      accessor: "rigname",
      filterable: true,
    },
    {
      Header: "Motor Type",
      accessor: "motortype",
      filterable: true,
    },
    {
      Header: "Tool Size",
      accessor: "toolsize",
      filterable: true,
    },
    {
      Header: "Top Connection",
      accessor: "topconnection",
      filterable: true,
    },
    {
      Header: "Client",
      accessor: "client",
      filterable: true,
    },

    {
      Header: "Required Shipping Date",
      accessor: "requiredshippingdate",
      filterable: true,
    },
    {
      Header: "Deviated",
      accessor: "deviated",
      filterable: true,
    },
    {
      Header: "Bearing Type",
      accessor: "bearingtype",
      filterable: true,
    },
    {
      Header: "Sleeve Stab Size",
      accessor: "sleevestabsize",
      filterable: true,
    },
    {
      Header: "Bottom Connection",
      accessor: "bottomconnection",
      filterable: true,
    },
    {
      Header: "Lobe Config",
      accessor: "lobeconfig",
      filterable: true,
    },
    {
      Header: "Number of Stage",
      accessor: "numberofstage",
      filterable: true,
    },
    {
      Header: "Rubber Type",
      accessor: "rubbertype",
      filterable: true,
    },
    {
      Header: "Bend Angle",
      accessor: "bendangle",
      filterable: true,
    },
    {
      Header: "Pulser",
      accessor: "pulser",
      filterable: true,
    },
    {
      Header: "MWD",
      accessor: "mwd",
      filterable: true,
    },
    {
      Header: "NMDC Collar Size",
      accessor: "nmdccollarsize",
      filterable: true,
    },
    {
      Header: "Gamma",
      accessor: "gamma",
      filterable: true,
    },
    {
      Header: "Resistivity",
      accessor: "resistivity",
      filterable: true,
    },
    {
      Header: "Density",
      accessor: "density",
      filterable: true,
    },
    {
      Header: "Depth From",
      accessor: "depthfrom",
      filterable: true,
    },
    {
      Header: "Depth To",
      accessor: "depthto",
      filterable: true,
    },
    {
      Header: "Flow Rate Min",
      accessor: "flowratemin",
      filterable: true,
    },
    {
      Header: "Flow Rate Max",
      accessor: "flowratemax",
      filterable: true,
    },
    {
      Header: "Battery Type",
      accessor: "batterytype",
      filterable: true,
    },
    {
      Header: "Ordered By",
      accessor: "orderedby",
      filterable: true,
    },
    {
      Header: "Motor Technician",
      accessor: "motortechnician",
      filterable: true,
    },
    {
      Header: "MWD/LWD Technician",
      accessor: "mwldwtechnician",
      filterable: true,
    },
    {
      Header: "Approved By",
      accessor: "approvedby",
      filterable: true,
    },
    {
      Header: "Approved By Date",
      accessor: "approvedbydate",
      filterable: true,
    },
    {
      Header: "Expected Bottom Hole Temp",
      accessor: "expectedbtmholetemp",
      filterable: true,
    },
    {
      Header: "MWD Bottom Con",
      accessor: "mwdbottomcon",
      filterable: true,
    },
    {
      Header: "MWD Top Con",
      accessor: "mwdtopcon",
      filterable: true,
    },
    // Add actions column for Edit and Delete actions
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
