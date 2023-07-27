// components/FormikStepper.tsx
import { useFormik } from 'formik';
import { useState } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './Step3';
import { Button, Card, Modal,Form } from 'react-bootstrap';
import { FIRApi, FIR } from 'pages/api/FIR';

const steps = [Step1, Step2, Step3];  // add your step components here

export default function FormikStepper({ initialValues, onSubmit, handleDrop }) {
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const fIRApi = new FIRApi();  
  const isLastStep = step === steps.length - 1;
  const [files, setFiles] = useState([]);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, formikHelpers) => {
      if (isLastStep) {
        const newId = Math.floor(Math.random() * Math.pow(10, 8));
        try {
          await fIRApi.createFir({ ...values, id: newId, files });
          setModalMessage("Form submitted successfully!");
        } catch (error) {
          setModalMessage(`Error: ${error}`);
        }
        setShowModal(true);
      } else {
        setStep(step + 1);
      }
    }
});



  const CurrentStep = steps[step];

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Form onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}>
            
        <CurrentStep formik={formik} handleDrop={handleDrop} />      
        <Card.Footer>
          {step > 0 && <Button onClick={() => setStep(step - 1)}>Back</Button>}
          <Button type="submit">{isLastStep ? 'Submit' : 'Next'}</Button>
        </Card.Footer>
      </Form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submission Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
