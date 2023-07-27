import Link from "next/link";
export function GeneralCol(handleEdit, handleDelete, setInfo, setIsOffcanvas) {
  return [
    {
      Header: "Job #",
      accessor: "jobno",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Client",
      accessor: "client",
      
      filterable: true,
    },
    {
      Header: "Location",
      accessor: "loc",
      disableFilters: true,
      filterable: true,
    },

    {
      Header: "Field",
      accessor: "field",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Well",
      accessor: "well",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Rig",
      accessor: "rig",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Status",
      
      filterable: true,
      accessor: (cellProps: any) => {
        switch (cellProps.statu) {
            case "Ongoing":
                return (<span className="badge text-info bg-info-subtle"> {cellProps.statu}</span>)
            case "Estimated":
                return (<span className="badge text-success bg-success-subtle"> {cellProps.statu}</span>)
            case "Callout Received":
                return (<span className="badge badge-soft-secondary"> {cellProps.statu}</span>)
            case "Job Done":
                return (<span className="badge badge-soft-danger"> {cellProps.statu}</span>)
            default:
                return (<span className="badge text-info bg-info-subtle"> {cellProps.statu}</span>)
        }
    },
    },
    {
      Header: "Action",
      disableFilters: true,
      accessor: (cellProps: any) => {
          return (<span>
              <div className="d-flex align-items-center gap-2 justify-content-center">
                  <div>
                      <Link href="#viewContactoffcanvas" data-bs-toggle="offcanvas"
                          onClick={() => { setInfo(cellProps); setIsOffcanvas(true) }}
                          className="text-muted px-1 d-block viewlist-btn">
                          <i className="bi bi-eye-fill"></i>
                      </Link>
                  </div>
                  <div>
                      <Link href="#addContactModal"
                          onClick={() => handleEdit(cellProps)}
                          className="text-muted px-1 d-block">
                          <i className="bi bi-pencil-fill"></i>
                      </Link>
                  </div>
                  <div>
                      <Link href="#removeContactModal" data-bs-toggle="modal" className="text-muted px-1 d-block"
                          onClick={() => handleDelete(cellProps)}
                      >
                          <i className="bi bi-trash-fill"></i>
                      </Link>
                  </div>
              </div>
          </span>)
      },
  },

  ];
}
