// pages/FirForm.tsx

import FormikStepper from './pages/stepper';
import { FirInitialValues } from './FirIntial';// import or define your initial values
import { Button, Card, Form, Row } from "react-bootstrap";
import { useState } from 'react';

const FirForm = () => {
  const [files, setFiles] = useState([]);
  const handleDrop = (acceptedFiles) => {
    console.log('Files dropped:', acceptedFiles);
    setFiles(acceptedFiles);
  };

  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
    console.log('Files:', files);
  };

  return (
    <div className="page-content">
      <Row>
        <Card>
          <Card.Header>
            {/* ... */}
          </Card.Header>
          <FormikStepper initialValues={FirInitialValues} onSubmit={handleSubmit} handleDrop={handleDrop} />
        </Card>
      </Row>
    </div>
  );
};

export default FirForm;
