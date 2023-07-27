// pages/step2.tsx

import { Button, Card, Form, Row } from "react-bootstrap";

import { renderColumns } from "@common/Formik";
import Image from "next/image";
import story from "../json/story.json"
import Uploads from "../json/Upload.json"

interface Step2Props {
  formik: any;
  handleDrop: (acceptedFiles: any[]) => void; // add this line
}

const Step2: React.FC<Step2Props> = ({ formik, handleDrop }) => {
  const halfLengthuploads = Math.floor(Uploads.length / 2);

  return (
    <div className="page-content">

            <Card.Title
              id="exampleModalLabel"
              className="fs-5 fw-bold my-3 text-center"
            >
              Field Incident Report
            </Card.Title>
            <Card.Body className="my-3">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {renderColumns(story, formik, handleDrop)}                
              </div>
            </Card.Body>
            <Card.Title
              id="exampleModalLabel"
              className="fs-5 fw-bold my-3 text-center"
            >
              File Uploads
            </Card.Title>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {renderColumns(Uploads.slice(0, halfLengthuploads), formik, handleDrop)}
                {renderColumns(Uploads.slice(halfLengthuploads), formik, handleDrop)}
              </div>
            </Card.Body>
    </div>
  );
};

export default Step2;
