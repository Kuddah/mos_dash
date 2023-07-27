import React, { useMemo, useState, useEffect, useCallback } from "react";
import TableContainer from "@common/TableContainer";
import { Spinner } from "react-bootstrap";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Tab,
  Nav,
  Row,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import approval from "./ToolOrder/Approval.json";
import ToolsOrders from "./ToolOrder/ToolOrder.json";
import Motor from "./ToolOrder/Motor.json";
import LWD from "./ToolOrder/LWD.json";
import { renderColumn } from "@common/Formik";
import { ToolOrderApi, ToolOrder } from "pages/api/ToolOrder";
import { ToolOrderCol } from "./toolordercol";
import { ToolOrderVal } from "./toolOrderYup";
import { ToolOrderInitialValues } from "./toolOrderIntial";

const ToolOrders = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const toolOrderApi = new ToolOrderApi();
  const [selectedToolOrder, setSelectedToolOrder] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);
  const [issubmitBtn, setsubmitBtn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let toolOrderList = await toolOrderApi.getListOfToolOrder();
      setData(toolOrderList); // Store the results in the data state variable
    }

    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 3000);
  }, []);

  const schema = ToolOrderVal();
const intial = ToolOrderInitialValues(selectedToolOrder)
const formik = useFormik({
  initialValues: intial,
  validationSchema: schema,
  onSubmit: async (values) => {
    console.log('Form submitted with values: ', values);

    if (isEdit) {
      console.log('Updating tool order...');
      await toolOrderApi.updateToolOrder({...values, id: selectedToolOrder.id });
      console.log('Tool order updated.');
    } else {
      console.log('Creating new tool order...');
      const newId = Math.floor(Math.random() * Math.pow(10, 8));
      await toolOrderApi.createToolOrder({ ...values, id: newId });
      console.log('New tool order created.');
    }

    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedToolOrder(null);
    setIsEdit(false);
    fetchData();
    formik.resetForm(); // reset the form
    console.log('Form reset.');
  },
});

useEffect(() => {
  fetchData();
}, []);


  const quarterLength = Math.floor(ToolsOrders.length / 2);
  const halfLength = Math.floor(Motor.length / 2);
  const halfLengthlwd = Math.floor(LWD.length / 2);

  async function fetchData() {
    let ToolOrderList = await toolOrderApi.getListOfToolOrder();
    setData(ToolOrderList);
  }
  const handleDelete = (toolOrder: ToolOrder) => {
    setSelectedToolOrder(toolOrder);
    setShowDeleteModal(true);
  };
  const createToolOrderButton = (e) => {
    e.preventDefault();
    console.log('Prevent default action of the event');
    
    setsubmitBtn(true);
    console.log('setsubmitBtn set to true');
    
    formik.submitForm();
    console.log('Formik form submitted');
  
    fetchData();
    console.log('fetchData function called');
  };
  

  const handleEdit = useCallback(
    (toolOrders: ToolOrder) => {
      setSelectedToolOrder(toolOrders);
      setIsEdit(true);
      setsubmitBtn(true);
      formik.resetForm({values: toolOrders});
      setShowEditModal(true);
    },
    [formik]
  );

  const confirmDelete = () => {
    if (selectedToolOrder) {
      toolOrderApi.deleteToolOrder(selectedToolOrder).then(() => {
        setShowDeleteModal(false);
        setSelectedToolOrder(null);
        fetchData();
        return toolOrderApi.getListOfToolOrder();
      });
      fetchData();
    }
  };

  const columns = ToolOrderCol(handleEdit, handleDelete);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card id="toolOrderList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Tool Orders</h5>
                  <div className="d-flex gap-1 flex-wrap">
                    <Button
                      variant="soft-danger"
                      id="remove-actions"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      <i className="ri-delete-bin-2-line"></i>
                    </Button>
                    <Button
                      variant="success"
                      type="button"
                      className="create-btn"
                      onClick={() => setShowAddModal(true)}
                    >
                      <i className="ri-add-line align-bottom me-1"></i>Add Tool
                      Order
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
                      SearchPlaceholder="Search Tool Orders..."
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
        id="ToolOrder-modal"
        className="fade modal-lg"
        show={showAddModal || showEditModal}
        onHide={() => {
          setShowAddModal(false);
          setShowEditModal(false);
        }}
        contentClassName="border-0"
        centered
      >
        <Modal.Header className="p-4 pb-0" closeButton>
          <Modal.Title id="exampleModalLabel" className="fs-5 fw-bold">
            {isEdit ? "Edit Tool Order" : "Add Tool Order"}
          </Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Body>
          <Card.Title
              id="exampleModalLabel"
              className="fs-5 fw-bold my-3 text-center"
            >
              Tool Order
            </Card.Title>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {renderColumn(ToolsOrders.slice(0, quarterLength), formik)}
                {renderColumn(ToolsOrders.slice(quarterLength), formik)}
              </div>
            </Card.Body>
            <Card.Title
              id="exampleModalLabel"
              className="fs-5 fw-bold my-3 text-center"
            >
              Motor Require
            </Card.Title>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {renderColumn(Motor.slice(0, halfLength), formik)}
                {renderColumn(Motor.slice(halfLength), formik)}
              </div>
            </Card.Body>
            <Card.Title
              id="exampleModalLabel"
              className="fs-5 fw-bold my-3 text-center"
            >
              M/LWD Require
            </Card.Title>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {renderColumn(LWD.slice(0, halfLengthlwd), formik)}
                {renderColumn(LWD.slice(halfLengthlwd), formik)}
              </div>
            </Card.Body>
            <Card.Title
              id="exampleModalLabel"
              className="fs-5 fw-bold my-3 text-center"
            >
              Approval
            </Card.Title>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {renderColumn(approval, formik)}
                
              </div>
            </Card.Body>
          </Modal.Body>

          <Modal.Footer>
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
                onClick={createToolOrderButton}
              >
                Create Tool Order
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this Tool Order?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ToolOrders;
