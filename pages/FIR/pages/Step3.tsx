// pages/step3.tsx
import { useFormik } from "formik";
import { Button, Card, Form, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { useFormState } from "../context";
import { renderColumn } from "@common/Formik";
import Personel from "../json/personnel.json";
import { FIRApi, FIR } from "pages/api/FIR";

const Step3 = ({ formik }) => {
  const halfLengthPersonel = Math.floor(Personel.length / 2);
  return (
    <div className="page-content">
      
        
          <Card.Title
            id="exampleModalLabel"
            className="fs-5 fw-bold my-3 text-center"
          >
            Personel Information
          </Card.Title>
          <Card.Body>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {renderColumn(Personel.slice(0, halfLengthPersonel), formik)}
              {renderColumn(Personel.slice(halfLengthPersonel), formik)}
            </div>
          </Card.Body>            
   
    </div>
  );
};

export default Step3;
