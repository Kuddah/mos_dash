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
import BonusArray from "./json/BonusArray.json";
import { BonusSheetVal } from "./BonusVal";
import Image from "next/image";
import footer from "./json/BonusFooter.json";
import { BonusSheetCol } from "./BonusCol";
import EmployeeForm from "./EmployeeForm";
import Link from "next/link";
import employeesData from './json/employee.json';
import rateLookup from './json/Bonusstructure.json';

const monthNamesToNumbers = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
}; 

function DailyRate() {
  const [display, setDisplay] = useState<boolean>(false);
  const bonusSheetApi = useMemo(() => new BonusSheetApi(), []);
  const [selectedBonusSheet, setSelectedBonusSheet] = useState(null);
  const [isOffcanvas, setIsOffcanvas] = useState<boolean>(false);
  const [info, setInfo] = useState<any>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);
  const [issubmitBtn, setsubmitBtn] = useState(false);
  const [newdaily_records, setNewDailyRecords] = useState([]);
  const [grade, setGrade] = useState("");
const [dailyRecords, setDailyRecords] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let bonusList = await bonusSheetApi.getListOfBonusSheet();
      setData(bonusList); // Store the results in the data state variable
    }
    
    fetchData();
  }, [bonusSheetApi]);
  
  
  async function fetchData() {
    let bonusList = await bonusSheetApi.getListOfBonusSheet();
    setData(bonusList);
  }
  console.log(data);
  const initialValues = {
    month: "",
    employeeNumber: "",
    employeename: "",
    employeegrade: "",
    daily_records: Array(31).fill(
      BonusArray.reduce((acc, cur) => ({ ...acc, [cur.name]: "" }), {})
    ),
  };
  const validationSchema = BonusSheetVal();
  const handleSubmit = async (values) => {
    console.log(values);

    if (isEdit) {
      await bonusSheetApi.updateBonusSheet({
        ...values,
        id: selectedBonusSheet.id,
      });
    } else {
      const newId = Math.floor(Math.random() * Math.pow(10, 8));
      await bonusSheetApi.createBonusSheet({ ...values, id: newId });
    }
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedBonusSheet(null);
    setIsEdit(false);
    fetchData();
    formik.resetForm(); // reset the form
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
});

  const createBonusSheetButton = (e) => {
    e.preventDefault();
    setsubmitBtn(true);
    formik.submitForm();
    fetchData();
  };

  const handleEdit = useCallback((bonusSheet: BonusSheet) => {
    setSelectedBonusSheet(bonusSheet);
    setIsEdit(true);
    setsubmitBtn(true);
    formik.resetForm({ values: bonusSheet });
    setShowEditModal(true);
  }, []);

  const handleDelete = (bonusSheet: BonusSheet) => {
    setSelectedBonusSheet(bonusSheet);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedBonusSheet) {
      bonusSheetApi.deleteBonusSheet(selectedBonusSheet).then(() => {
        setShowDeleteModal(false);
        setSelectedBonusSheet(null);
        fetchData();
        return bonusSheetApi.getListOfBonusSheet();
      });
      fetchData();
    }
  };
  
  const [employees, setEmployees] = React.useState(employeesData);

  React.useEffect(() => {
    const employee = employees.find(
      (e) => e.employeeNumber === formik.values.employeeNumber
    );
    if (employee) {
      formik.setFieldValue("employeename", employee.name);
      formik.setFieldValue("employeegrade", employee.assignment);
    }
  }, [formik.values.employeeNumber, employees]);

  const getRate = useCallback((grade, tierType) => {
    const gradeRates = rateLookup[grade];
    if (gradeRates) {
      const rate = gradeRates[tierType];
      return rate || 0;
    }
    return 0;
  }, [rateLookup]);
  

  React.useEffect(() => {
    setGrade(formik.values.employeegrade);
    setDailyRecords(formik.values.daily_records);
  }, [formik.values]);
  React.useEffect(() => {
  setNewDailyRecords(dailyRecords.map((daily_record, index) => {
    if (daily_record.status === "On Duty") {
      // Get the rate for the current grade and tier type
      const rate = getRate(grade, daily_record.tierType);
      return {
        ...daily_record,
        total: rate,
      };
    }
    return daily_record;
  }));
}, [dailyRecords, grade, getRate]);

React.useEffect(() => {
  const newRecords = dailyRecords.map((daily_record, index) => {
    if (daily_record.status === "On Duty") {
      // Get the rate for the current grade and tier type
      const rate = getRate(grade, daily_record.tierType);
      return {
        ...daily_record,
        total: rate,
      };
    }
    return daily_record;
  });
  if (JSON.stringify(newRecords) !== JSON.stringify(newdaily_records)) {
    setNewDailyRecords(newRecords);
  }
}, [dailyRecords, grade, getRate]);

React.useEffect(() => {
  if (JSON.stringify(formik.values.daily_records) !== JSON.stringify(newdaily_records)) {
    // Update the formik values
    formik.setFieldValue("daily_records", newdaily_records);
  }
}, [newdaily_records]);


  const [totals, setTotals] = React.useState({
    total_days: 0,
  });

  React.useEffect(() => {
    const totalDays = formik.values.daily_records.reduce(
      (acc, curr) => acc + (curr.status === "On Duty" ? 1 : 0),
      0
    );
    const cumTotal = formik.values.daily_records.reduce(
      (acc, curr) => acc + Number(curr.total || 0),
      0
    );
    formik.setFieldValue("total_days", totalDays);
    formik.setFieldValue("total_amount", cumTotal);
  }, [formik.values.daily_records]); // Recompute the total when `daily_recordss` changes

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  React.useEffect(() => {
    if (formik.values.month) {
      const month = monthNamesToNumbers[formik.values.month]; // Convert the selected month string to a number
      const year = new Date().getFullYear();
      const daysInMonth = getDaysInMonth(month, year);
      formik.setFieldValue(
        "daily_records",
        Array(daysInMonth).fill(
          BonusArray.reduce((acc, cur) => ({ ...acc, [cur.name]: "" }), {})
        )
      );
    }
  }, [formik.values.month]);
  

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
                      {display ? (
                        <TableContainer
                          columns={columns || []}
                          data={data || []}
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
                      ) : (
                        <div className="text-center">
                          <Spinner animation="border" variant="primary" />
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          <Modal
            id="General-modal"
            className="fade modal-xl"
            show={showAddModal || showEditModal}
            onHide={() => {
              setShowAddModal(false);
              setShowEditModal(false);
            }}
            contentClassName="border-0"
            centered
          >
            <Card>
              <Col lg={12}>
                <Modal.Header className="p-4 pb-0" closeButton>
                  <Image
                    src={"./GELogo.png"}
                    alt="Ge Logo"
                    width={300}
                    height={80}
                  ></Image>
                  <h1 className="text-center">Bonus Sheet</h1>
                </Modal.Header>
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <Modal.Body>
                    <Card.Body>
                    <EmployeeForm formik={formik} />
                    </Card.Body>
                  </Modal.Body>
                  <Card.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShowAddModal(false);
                        setShowEditModal(false);
                      }}
                    >
                      Close
                    </Button>
                    {issubmitBtn ? (
                      <Button variant="primary" type="submit" id="add-btn">
                        {!!isEdit ? "Save Changes" : "Add"}
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        type="button"
                        onClick={createBonusSheetButton}
                      >
                        Submit Sheet
                      </Button>
                    )}
                  </Card.Footer>
                </Form>
              </Col>
            </Card>
          </Modal>
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
