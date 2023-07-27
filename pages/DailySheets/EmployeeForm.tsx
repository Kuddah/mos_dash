import React, { useMemo, useState, useContext, useCallback } from "react";
import { useFormik } from "formik";
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
import { renderColumn } from "@common/Formik";
import { BonusSheetApi, BonusSheet } from "../api/Bonus";
import { FormikValues } from "formik";
import bonus from "./json/Bonus.json"; // R
import BonusArray from "./json/BonusArray.json";
import footer from "./json/BonusFooter.json";
import employeesData from "./json/employee.json";
import rateLookup from "./json/Bonusstructure.json";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { FormikContext } from "./FormikContext";
import {
  fetchBonusSheets as onGetBonus,
  createBonusSheet as onAddNewBonus,
  updateBonusSheet as onUpdateBonus,
  deleteBonusSheet as onDeleteBonus,
} from "Components/slices/thunk";
import { BonusSheetVal } from "./BonusVal";
import { BonusSheetInitialValues } from "./BonusIntials";
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
function EmployeeForm({ showAddModal, setShowAddModal, showEditModal, setShowEditModal, onEdit  }) {
  const [display, setDisplay] = useState<boolean>(false);
  const [selectedBonusSheet, setSelectedBonusSheet] = useState(null);
  const [isOffcanvas, setIsOffcanvas] = useState<boolean>(false);
  const [info, setInfo] = useState<any>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [issubmitBtn, setsubmitBtn] = useState(false);
  const [data, setData] = useState([]);
  const dispatch: any = useDispatch();
  const [newdaily_records, setNewDailyRecords] = useState([]);
  const [grade, setGrade] = useState("");
  const [dailyRecords, setDailyRecords] = useState([]);
  const quarterLength = Math.floor(bonus.length / 2);
  const halfLength = Math.floor(footer.length / 2);

  async function fetchData() {
    dispatch(onGetBonus());
  }
  const initialValues = {
    month: "",
    company_name: "",
    employeeNumber: "",
    employeename: "",
    employeegrade: "",
    segment: "",
    daily_records: Array.from({ length: 31 }, (_, index) => {
      const record: {
        date: number;
        well?: string;
        rig?: string;
        job_number?: string;
        status: string;
        tierType?: string;
        total?: number;
      } = {
        date: index + 1,
        status: "",
        total: 0,
      };
  
      for (const bonus of BonusArray) {
        if (bonus.name !== "date" && bonus.name !== "status" && bonus.name !== "total") {
          record[bonus.name] = "";
        }
      }
  
      return record;
    }),
  };
  
  
  


  const validationSchema = BonusSheetVal();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(formik.errors);
      console.log("Submitted values:", values);
      const totalDays = values.daily_records.reduce(
        (acc, curr) => acc + (curr.status === "On Duty" ? 1 : 0),
        0
      );
      const totalAmount = values.daily_records.reduce(
        (acc, curr) => acc + Number(curr.total || 0),
        0
      );

      const bonusSheet = {
        ...values,
        company_name: "Gulf Energy", // replace with actual value
        total_days: totalDays,
        total_amount: totalAmount,
      };

      if (isEdit) {
        const actionResult = await dispatch(
          onUpdateBonus({
            ...bonusSheet,
            id: selectedBonusSheet.id,
          })
        );
        console.log("Update result:", actionResult);
      } else {
        const newId = Math.floor(Math.random() * Math.pow(10, 8));
        const actionResult = await dispatch(
          onAddNewBonus({ ...bonusSheet, id: newId })
        );
        console.log("Add result:", actionResult);
      }
      setShowAddModal(false);
      setShowEditModal(false);
      setSelectedBonusSheet(null);
      setIsEdit(false);
      setsubmitBtn(false); 
      dispatch(onGetBonus());
      formik.resetForm();
    },
  });

  const handleEdit = useCallback((bonusSheet: BonusSheet) => {
    setSelectedBonusSheet(bonusSheet);
    setIsEdit(true);
    setsubmitBtn(true);
    formik.resetForm({ values: bonusSheet });
    setShowEditModal(true);
    
    onEdit(bonusSheet); 
  }, []);

  const createBonusSheetButton = async (e) => {
    e.preventDefault();
    setsubmitBtn(true);
    await formik.submitForm();
    fetchData();
  };
  


  
  
  const [employees, setEmployees] = React.useState(employeesData);

  React.useEffect(() => {
    const employee = employees.find(
      (e) => e.employeeNumber === formik.values.employeeNumber
    );
    if (employee) {
      formik.setFieldValue("employeename", employee.name);
      formik.setFieldValue("employeegrade", employee.assignment);
      formik.setFieldValue("segment", employee.segment);
      formik.setFieldValue("company_name", employee.company_name);
    }
  }, [formik.values.employeeNumber, employees]);

  const getRate = useCallback(
    (grade, tierType) => {
      const gradeRates = rateLookup[grade];
      if (gradeRates) {
        const rate = gradeRates[tierType];
        return rate || 0;
      }
      return 0;
    },
    [rateLookup]
  );

  React.useEffect(() => {
    setGrade(formik.values.employeegrade);
    setDailyRecords(formik.values.daily_records);
  }, [formik.values]);

  React.useEffect(() => {
    setNewDailyRecords(
      dailyRecords.map((daily_record, index) => {
        if (daily_record.status === "On Duty") {
          // Get the rate for the current grade and tier type
          const rate = getRate(grade, daily_record.tierType);
          return {
            ...daily_record,
            total: rate,
          };
        }
        return daily_record;
      })
    );
  }, [dailyRecords, grade, getRate]);

  React.useEffect(() => {
    const { employeegrade: grade, daily_records } = formik.values;

    const newDetails = daily_records.map((daily_record, index) => {
      // Preserve the date
      const date = daily_record.date;
    
      if (daily_record.status === "On Duty") {
        // Get the rate for the current grade and tier type
        const rate = getRate(grade, daily_record.tierType);
        return {
          ...daily_record,
          total: rate,
          date // Include the date here
        };
      }
      return {
        ...daily_record,
        date // Include the date here
      };
    });
    

    // Only update the formik values if newDetails is different from formik.values.daily_records
    if (JSON.stringify(newDetails) !== JSON.stringify(daily_records)) {
      formik.setFieldValue("daily_records", newDetails);
    }
  }, [formik.values.employeegrade, formik.values.daily_records, getRate]);

  const [totals, setTotals] = React.useState({
    total_days: 0,
  });

  React.useEffect(() => {
    console.log("Formik errors:", formik.errors);
  }, [formik.errors]);
  
  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }
  
  React.useEffect(() => {
    if (formik.values.month) {
      const month = monthNamesToNumbers[formik.values.month]; // Convert the selected month string to a number
      const year = new Date().getFullYear();
      const daysInMonth = getDaysInMonth(month, year);
  
      // Create new records with all fields except 'date' set to empty string
      const newDailyRecords = Array.from({ length: daysInMonth }, (_, index) => (
        BonusArray.reduce((acc, cur) => ({ 
          ...acc, 
          [cur.name]: cur.name === 'date' ? index + 1 : '' 
        }), {})
      ));
  
      // Merge new records with the current records in the formik values
      const mergedDailyRecords = formik.values.daily_records.slice(0, daysInMonth).map((record, index) => ({
        ...newDailyRecords[index],
        ...record,
      }));
  
      formik.setFieldValue("daily_records", mergedDailyRecords);
      console.log(mergedDailyRecords);  // Add this line to check the dailyRecords
    }
  }, [formik.values.month]);
  
  
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
  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
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
          <Modal.Body>
            <Card.Body>
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
                  <Modal.Body>
                    <Card.Body>
                      <Card>
                        <Card.Header>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {renderColumn(
                              bonus.slice(0, quarterLength),
                              formik
                            )}
                            {renderColumn(bonus.slice(quarterLength), formik)}
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Row className="my-2 text-center">
                            {BonusArray.map(({ label }, index) => (
                              <Col key={index}>
                                <h5>{label}</h5>
                              </Col>
                            ))}
                          </Row>

                          {formik.values.daily_records.map(
                            (daily_records, index) => (
                              <Row
                                key={index}
                                className="d-flex align-items-center justify-content-center"
                              >
                                {BonusArray.map(
                                  (
                                    {
                                      name,
                                      type,
                                      label,
                                      placeholder,
                                      component,
                                      options,
                                      readonly,
                                    },
                                    subIndex
                                  ) => (
                                    <Col key={subIndex} className="text-center">
                                      <Form.Group
                                        className="mb-3"
                                        controlId={`formBasic${name}${index}${subIndex}`}
                                      >
                                        {component === "select" ? (
                                          <Form.Select
                                            as="select"
                                            name={`daily_records[${index}].${name}`}
                                            onChange={formik.handleChange}
                                            value={daily_records[name]}
                                            required
                                          >
                                            <option value="" disabled>
                                              {placeholder}
                                            </option>
                                            {options.map(
                                              (option, optionIndex) => (
                                                <option
                                                  key={optionIndex}
                                                  value={option}
                                                >
                                                  {option}
                                                </option>
                                              )
                                            )}
                                          </Form.Select>
                                        ) : (
                                          <Form.Control
                                            className="text-center"
                                            type={type}
                                            name={`daily_records[${index}].${name}`}
                                            onChange={formik.handleChange}
                                            value={
                                              name === "date"
                                                ? index + 1
                                                : daily_records[name]
                                            }
                                            placeholder={placeholder}
                                            disabled={readonly}
                                          />
                                        )}
                                      </Form.Group>
                                    </Col>
                                  )
                                )}
                              </Row>
                            )
                          )}
                        </Card.Body>
                        <Card.Body>
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {renderColumn(footer.slice(0, halfLength), formik)}
                            {renderColumn(footer.slice(halfLength), formik)}
                          </div>
                        </Card.Body>
                      </Card>
                    </Card.Body>
                  </Modal.Body>
              </Col>
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
        </Card>
      </Modal>
    </Form>
  );
}

export default EmployeeForm;
