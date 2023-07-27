import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import TableContainer from "@common/TableContainer";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Offcanvas,
  Spinner,
  Modal,
  Row,
} from "react-bootstrap";
import { BonusSheetApi, BonusSheet } from "../api/Bonus";
import Image from "next/image";
import { BonusSheetCol } from "./BonusCol";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBonusSheets as onGetBonus,
  createBonusSheet as onAddNewBonus,
  updateBonusSheet as onUpdateBonus,
  deleteBonusSheet as onDeleteBonus,
} from "Components/slices/thunk";
import EmployeeForm from "./EmployeeForm";
import { RootState, AppDispatch } from "Components/slices";

function DailyRate() {
  const [selectedBonusSheet, setSelectedBonusSheet] = useState(null);
  const [isOffcanvas, setIsOffcanvas] = useState<boolean>(false);
  const [info, setInfo] = useState<any>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch: any = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const bonusSheetApi = new BonusSheetApi();
  const [issubmitBtn, setsubmitBtn] = useState(false);
  const bonusSheetState = useSelector((state: RootState) => {
    return state.bonusSheet;
  });
  const { items: bonusSheets, isLoading, error } = bonusSheetState;

  useEffect(() => {
    dispatch(onGetBonus());
  }, [dispatch]);

  async function fetchData() {
    dispatch(onGetBonus());
  }

  const confirmDelete = () => {
    if (selectedBonusSheet) {
      dispatch(onDeleteBonus(selectedBonusSheet));
      dispatch(onGetBonus());
    }
  };

  const handleDelete = (bonusSheet: BonusSheet) => {
    setSelectedBonusSheet(bonusSheet);
    setShowDeleteModal(true);
  };
  const handleEdit = useCallback((bonusSheet) => {
    setSelectedBonusSheet(bonusSheet);
    setShowEditModal(true);
  }, []);
  const columns = BonusSheetCol(
    handleEdit,
    handleDelete,
    setInfo,
    setIsOffcanvas
  );
  return (
    <div className="page-content">
      <Container fluid={true}>
        <Row>
          <div className="page-content">
            <Container fluid={true}>
              <Row>
                <Col lg={12}>
                  <Card id="apiKeyList">
                    <Card.Header className="d-flex align-items-center">
                      <h5 className="card-title flex-grow-1 mb-0">
                        Bonus Information
                      </h5>
                      <div className="d-flex gap-1 flex-wrap">
                        <Button variant="soft-danger" id="remove-actions">
                          <i className="ri-delete-bin-2-line"></i>
                        </Button>
                        <Button
                          variant="success"
                          type="button"
                          className="create-btn"
                          onClick={() => setShowAddModal(true)}
                        >
                          <i className="ri-add-line align-bottom me-1"></i>Add
                          Sheet
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      {isLoading ? (
                        <div className="text-center">
                          <Spinner animation="border" variant="primary" />
                        </div>
                      ) : error ? (
                        <div>Error: {error}</div>
                      ) : (
                        <TableContainer
                          columns={columns || []}
                          data={bonusSheets || []}
                          isPagination={true}
                          isGlobalFilter={true}
                          iscustomPageSize={false}
                          isBordered={true}
                          customPageSize={15}
                          className="custom-header-css table align-middle table-nowrap"
                          tableClassName="table-centered align-middle table-nowrap mb-0"
                          theadClassName="text-muted table-light"
                          SearchPlaceholder="Search Products..."
                        />
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          <EmployeeForm
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            onEdit={handleEdit}
          />
          <Offcanvas
            show={isOffcanvas}
            onHide={() => setIsOffcanvas(false)}
            placement="end"
            id="viewContactoffcanvas"
            className="offcanvas-end"
          >
            <Offcanvas.Header>
              <ul className="list-unstyled hstack gap-2 mb-0 justify-content-end w-100 me-2">
                <li>
                  <Link
                    href="#!"
                    className="btn btn-sm btn-icon btn-ghost-info"
                  >
                    <i className="ri-pushpin-line fs-15"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#!"
                    className="btn btn-sm btn-icon btn-ghost-success"
                  >
                    <i className="ri-edit-line fs-15"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#!"
                    className="btn btn-sm btn-icon btn-ghost-secondary"
                  >
                    <i className="ri-more-2-fill fs-15"></i>
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsOffcanvas(false)}
              ></button>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <div className="text-center">
                <div className="mb-3">
                  <Image
                    src={info.img}
                    alt=""
                    className="avatar-lg d-block mx-auto rounded-circle overview-userimg"
                  />
                </div>
                <h5
                  className="offcanvas-title mb-2 overview-name"
                  id="viewContactoffcanvasLabel"
                >
                  {info.name}
                </h5>
                <p className="text-muted mb-4 overview-location">
                  {info.country}
                </p>
              </div>
              <div className="table-responsive">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Employee Number</th>
                      <td>{info.employeeNumber}</td>
                    </tr>
                    <tr>
                      <th scope="row">Employee Name</th>
                      <td>{info.employeename}</td>
                    </tr>
                    <tr>
                      <th scope="row">Grade</th>
                      <td>{info.employeegrade}</td>
                    </tr>
                    <tr>
                      <th scope="row">Month</th>
                      <td>{info.month}</td>
                    </tr>
                    <tr>
                      <th scope="row">Total Days</th>
                      <td>{info.total_days}</td>
                    </tr>
                    <tr>
                      <th scope="row">Total Amount</th>
                      <td>{info.total_amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="hstack gap-2">
                <Button variant="secondary" type="button" className="w-100">
                  Edit
                </Button>
                <Button variant="info" type="button" className="w-100">
                  Delete
                </Button>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this general?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Close
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </Container>
    </div>
  );
}

export default DailyRate;
