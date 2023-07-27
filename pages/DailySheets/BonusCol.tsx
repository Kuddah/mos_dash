import Link from "next/link";

export function BonusSheetCol(handleEdit, handleDelete, setInfo, setIsOffcanvas) {
  return [
    {
      Header: "Company Number",
      accessor: "company_name",
      filterable: true,
    },
    {
      Header: "Segment",
      accessor: "segment",
      filterable: true,
    },
    {
      Header: "Employee Number",
      accessor: "employeeNumber",
      filterable: true,
    },

    {
      Header: "Employee Name",
      accessor: "employeename",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Grade",
      accessor: "employeegrade",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Month",
      accessor: "month",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Total Days",
      accessor: "total_days",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Total Amount",
      accessor: "total_amount",
      disableFilters: true,
      filterable: true,
    },
    {
      Header: "Action",
      disableFilters: true,
      accessor: (cellProps: any) => {
        return (
          <span>
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
          </span>
        );
      },
    },
  ];
}
