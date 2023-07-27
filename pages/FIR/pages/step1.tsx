// pages/step1.tsx
import { Button, Card, Form, Row } from "react-bootstrap";
import { renderColumn } from "@common/Formik";
import info from "../json/Info.json";
import Image from "next/image";
import Incident from "../json/Incident.json"

const Step1= ({ formik }) => {
  const halfLengthinfo = Math.floor(info.length / 2);
  const halfLengthincident = Math.floor(Incident.length / 2);
  return (
    <div className="page-content">
 
        <Card>
          
            <Card.Title
              id="exampleModalLabel"
              className="fs-5 fw-bold my-3 text-center"
            >
              General Information
            </Card.Title>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {renderColumn(info.slice(0, halfLengthinfo), formik)}
                {renderColumn(info.slice(halfLengthinfo), formik)}
              </div>
            </Card.Body>
            <Card.Title
              id="exampleModalLabel"
              className="fs-5 fw-bold my-3 text-center"
            >
              Field Incident Report
            </Card.Title>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {renderColumn(Incident.slice(0, halfLengthincident), formik)}
                {renderColumn(Incident.slice(halfLengthincident), formik)}
              </div>
            </Card.Body>
         
        </Card>
    </div>
  );
};

export default Step1;
