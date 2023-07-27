import React, { useMemo, useState, useEffect, useCallback } from "react";
import TableContainer from "@common/TableContainer";
import { Spinner } from "react-bootstrap";
import {
  Button,
  Card,
  Col,
  Container,
  Offcanvas,
  Dropdown,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useFormik } from "formik";
import Link from "next/link";
import { GeneralApi, General } from "../api/General";
import { GeneralVal } from "./GeneralYup";
import { GeneralInitialValues } from "./GeneralIntial";
import { GeneralCol } from "./GeneralCol";
import Generalform from "./General.json";
import Image from "next/image";

const Generals = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const generalApi = new GeneralApi();
  const [selectedGeneral, setSelectedGeneral] = useState(null);
  const [isOffcanvas, setIsOffcanvas] = useState<boolean>(false);
  const [info, setInfo] = useState<any>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);
  const [issubmitBtn, setsubmitBtn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let generalList = await generalApi.getListOfGeneral();

      setData(generalList); // Store the results in the data state variable
    }

    fetchData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 3000);
  }, []);



  async function fetchData() {
    let generalApi = new GeneralApi();
    let generalList = await generalApi.getListOfGeneral();
    setData(generalList);
  }

  const createGeneralButton = (e) => {
    e.preventDefault();
    setsubmitBtn(true);
    formik.submitForm();
    fetchData();
  };

  const handleEdit = useCallback((general: General) => {
    setSelectedGeneral(general);
    setIsEdit(true);
    setsubmitBtn(true);
    formik.resetForm({ values: general });
    setShowEditModal(true);
  }, []);

  const handleDelete = (general: General) => {
    setSelectedGeneral(general);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedGeneral) {
      generalApi.deleteGeneral(selectedGeneral).then(() => {
        setShowDeleteModal(false);
        setSelectedGeneral(null);
        fetchData();
        return generalApi.getListOfGeneral();
      });
      fetchData();
    }
  };
  const schema = GeneralVal();
  const Intial = GeneralInitialValues(selectedGeneral);
  const formik = useFormik({
    initialValues: Intial,
    validationSchema: schema,
    onSubmit: async (values) => {
      let generalApi = new GeneralApi();
      if (isEdit) {
        await generalApi.updateGeneral({ ...values, id: selectedGeneral.id });
      } else {
        const newId = Math.floor(Math.random() * Math.pow(10, 8));
        await generalApi.createGeneral({ ...values, id: newId });
      }
      setShowAddModal(false);
      setShowEditModal(false);
      setSelectedGeneral(null);
      setIsEdit(false);
      fetchData();
      formik.resetForm(); // reset the form
    },
  });

  useEffect(() => {
    fetchData();
  }, []);
  const columns = GeneralCol(handleEdit, handleDelete, setInfo, setIsOffcanvas);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    General Information
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
                      General
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
        className="fade modal-lg"
        show={showAddModal || showEditModal}
        onHide={() => {
          setShowAddModal(false);
          setShowEditModal(false);
        }}
        contentClassName="border-0"
        centered
      >
        <Card>
          <Modal.Header className="p-4 pb-0" closeButton>
            <Card.Header className="d-flex align-items-center">
              <Modal.Title id="exampleModalLabel" className="fs-5 fw-bold">
                {isEdit ? "Edit General" : "Add General"}
              </Modal.Title>
            </Card.Header>
          </Modal.Header>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Modal.Body>
              <Card.Body>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ flex: 1, marginRight: 10 }}>
                    <Form.Group className="mb-3" controlId="validationFormik01">
                      {Generalform.map(({ name, type, label, placeholder }) => (
                        <Row className="mb-3 me-3" key={name}>
                          <Col lg={4}>
                            <Form.Label>{label}</Form.Label>
                          </Col>
                          <Col lg={8}>
                            <Form.Control
                              type={type}
                              name={name}
                              placeholder={placeholder}
                              value={formik.values[name]}
                              onChange={formik.handleChange}
                              isValid={
                                formik.touched[name] && !formik.errors[name]
                              }
                              isInvalid={
                                formik.touched[name] && !!formik.errors[name]
                              }
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              {formik.errors[name]}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      ))}
                    </Form.Group>
                  </div>
                </div>
              </Card.Body>
            </Modal.Body>
            <Modal.Footer>
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
                    onClick={createGeneralButton}
                  >
                    Create General Information
                  </Button>
                )}
              </Card.Footer>
            </Modal.Footer>
          </Form>
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
              <Link href="#!" className="btn btn-sm btn-icon btn-ghost-info">
                <i className="ri-pushpin-line fs-15"></i>
              </Link>
            </li>
            <li>
              <Link href="#!" className="btn btn-sm btn-icon btn-ghost-success">
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
            <p className="text-muted mb-4 overview-location">{info.country}</p>
          </div>
          <div className="table-responsive">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <th scope="row">Job Number</th>
                  <td>{info.jobno}</td>
                </tr>
                <tr>
                  <th scope="row">Client</th>
                  <td>{info.client}</td>
                </tr>
                <tr>
                  <th scope="row">Location</th>
                  <td>{info.loc}</td>
                </tr>
                <tr>
                  <th scope="row">Field</th>
                  <td>{info.field}</td>
                </tr>
                <tr>
                  <th scope="row">Rig</th>
                  <td>{info.rig}</td>
                </tr>
                <tr>
                  <th scope="row">Well Name</th>
                  <td>{info.well}</td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  <td>{info.statu}</td>
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this general?</p>
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

export default Generals;
