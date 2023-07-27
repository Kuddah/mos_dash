import React, {useCallback} from "react";
import { useFormik } from "formik";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Offcanvas,
  Dropdown,
  Modal,
  Row,
} from "react-bootstrap";
import Bonus from "./json/Bonus.json"; // R
import BonusArray from "./json/BonusArray.json";
import { BonusSheetVal } from "./BonusVal";
import { renderColumn } from "@common/Formik";
import Image from "next/image";
import employeesData from "./json/employee.json";
import rateLookup from "./json/Bonusstructure.json";
import footer from "./json/BonusFooter.json";

import axios from 'axios';

export async function getServerSideProps(context) {
  const COUCHDB_URL = process.env.REACT_APP_COUCHDB_URL;
  const bonusResponse = await axios.get(`${COUCHDB_URL}/bonussheets/bonus`);
  const bonusArrayResponse = await axios.get(`${COUCHDB_URL}/bonussheets/bonusarray`);
  const footerResponse = await axios.get(`${COUCHDB_URL}/bonussheets/footer`);
  const employeeResponse = await axios.get(`${COUCHDB_URL}/bonussheets/employee`);
  const bonusstructureResponse = await axios.get(`${COUCHDB_URL}/bonussheets/bonusstructure`);
  const employee = employeeResponse.data;
  const bonusstructure = bonusstructureResponse.data;
  const bonus = bonusResponse.data;
  const bonusArray = bonusArrayResponse.data;
  const footers = footerResponse.data;

  // Pass data to the page via props
  return { props: { bonus, bonusArray, footers, employee, bonusstructure } }
}

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


function DailyRate({ bonus, bonusArray, footers, employee, bonusstructure }) {
  const formik = useFormik({
    initialValues: {
      month: "",
      employeeNumber: "",
      employeename: "",
      employeegrade: "",
      details: Array(31).fill(
        BonusArray.reduce((acc, cur) => ({ ...acc, [cur.name]: "" }), {})
      ),
    },
    validationSchema: BonusSheetVal(),
    onSubmit: async (values) => {
      console.log(values);
      // Handle form submission here
    },
  });
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
  }, []);

  React.useEffect(() => {
    const { employeegrade: grade, details } = formik.values;

    const newDetails = details.map((detail, index) => {
      if (detail.status === "On Duty") {
        // Get the rate for the current grade and tier type
        const rate = getRate(grade, detail.tierType);
        return {
          ...detail,
          total: rate,
        };
      }
      return detail;
    });

    // Update the formik values
    formik.setFieldValue("details", newDetails);
  }, [formik.values.employeegrade, formik.values.details, getRate]);

  const [totals, setTotals] = React.useState({
    total_days: 0,
  });

  React.useEffect(() => {
    const totalDays = formik.values.details.reduce(
      (acc, curr) => acc + (curr.status === "On Duty" ? 1 : 0),
      0
    );
    const cumTotal = formik.values.details.reduce(
      (acc, curr) => acc + Number(curr.total || 0),
      0
    );
    formik.setFieldValue("total_days", totalDays);
    formik.setFieldValue("total_amount", cumTotal);
  }, [formik.values.details]); // Recompute the total when `details` changes

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  React.useEffect(() => {
    if (formik.values.month) {
      const month = monthNamesToNumbers[formik.values.month]; // Convert the selected month string to a number
      const year = new Date().getFullYear();
      const daysInMonth = getDaysInMonth(month, year);
      formik.setFieldValue(
        "details",
        Array(daysInMonth).fill(
          BonusArray.reduce((acc, cur) => ({ ...acc, [cur.name]: "" }), {})
        )
      );
    }
  }, [formik.values.month]);
  
  const quarterLength = Math.floor(Bonus.length / 2);
  const halfLength = Math.floor(footer.length / 2);
  return (
    <div className="page-content">
      <Container fluid={true}>
        <Row>
          <Card>
            <Col lg={12}>
              <Image
                src={"./GELogo.png"}
                alt="Ge Logo"
                width={300}
                height={80}
              ></Image>
              <h1 className="text-center">Bonus Sheet</h1>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Card.Header>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {renderColumn(Bonus.slice(0, quarterLength), formik)}
                    {renderColumn(Bonus.slice(quarterLength), formik)}
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

                  {formik.values.details.map((detail, index) => (
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
                                  name={`details[${index}].${name}`}
                                  onChange={formik.handleChange}
                                  value={detail[name]}
                                  required
                                >
                                  <option value="" disabled>
                                    {placeholder}
                                  </option>
                                  {options.map((option, optionIndex) => (
                                    <option key={optionIndex} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Form.Select>
                              ) : (
                                <Form.Control
                                  className="text-center"
                                  type={type}
                                  name={`details[${index}].${name}`}
                                  onChange={formik.handleChange}
                                  value={
                                    name === "date" ? index + 1 : detail[name]
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
                  ))}
                </Card.Body>
                <Card.Body>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {renderColumn(footer.slice(0, halfLength), formik)}
                    {renderColumn(footer.slice(halfLength), formik)}
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Card.Footer>
              </Form>
            </Col>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default DailyRate;
