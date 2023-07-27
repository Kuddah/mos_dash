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
  Row,
} from "react-bootstrap";
import { useFormik } from "formik";
import { RunInfooutApi, RunInfo } from "pages/api/RunInfoout";
import { RunInfoVal } from "./RunInfoOutYup";
import { RunInfoValues } from "./RunInfoIntialOut";
import { RunInfoOutCol } from "./RunInfoOutCol";
import RunInfoform from "./RuninfoOutForm.json";

const Runinfoin = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const runinfoApi = new RunInfooutApi();
  const [selectedRunInfo, setSelectedRunInfo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);
  const [issubmitBtn, setsubmitBtn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let runinfoList = await runinfoApi.getListOfRunInfo();

      setData(runinfoList); // Store the results in the data state variable
    }

    fetchData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 3000);
  }, []);

  const schema = RunInfoVal();
  const Intial = useMemo(
    () => RunInfoValues(selectedRunInfo),
    [selectedRunInfo]
  );
  const formik = useFormik({
    initialValues: Intial,
    validationSchema: schema,
    onSubmit: async (values) => {
      let runInfoApi = new RunInfooutApi();
      if (isEdit) {
        await runInfoApi.updateRunInfo({ ...values, id: selectedRunInfo.id });
      } else {
        const newId = Math.floor(Math.random() * Math.pow(10, 8));
        await runInfoApi.createRunInfo({ ...values, id: newId });
      }
      setShowAddModal(false);
      setShowEditModal(false);
      setSelectedRunInfo(null);
      setIsEdit(false);
      fetchData();
      formik.resetForm(); // reset the form
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let runinfoApi = new RunInfooutApi();
    let runinfoList = await runinfoApi.getListOfRunInfo();
    setData(runinfoList);
  }

  const createruninfoButton = (e) => {
    e.preventDefault();
    setsubmitBtn(true);
    formik.submitForm();
    fetchData();
  };

  const handleEdit = useCallback((runinfo: RunInfo) => {
    setSelectedRunInfo(runinfo);
    setIsEdit(true);
    setsubmitBtn(true);
    formik.resetForm({ values: runinfo });
    setShowEditModal(true);
  }, []);

  const handleDelete = (runinfo: RunInfo) => {
    setSelectedRunInfo(runinfo);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedRunInfo) {
      runinfoApi.deleteRunInfo(selectedRunInfo).then(() => {
        setShowDeleteModal(false);
        setSelectedRunInfo(null);
        fetchData();
        return runinfoApi.getListOfRunInfo();
      });
      fetchData();
    }
  };

  const columns = RunInfoOutCol(handleEdit, handleDelete);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card id="RunOutList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">API Keys</h5>
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
                      runinfo
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
        id="runOutinfo-modal"
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
          <Modal.Title id="RunOutModalLabel" className="fs-5 fw-bold">
            {isEdit ? "Edit runinfo" : "Add runinfo"}
          </Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1, marginRight: 10 }}>
                <Form.Group
                  className="mb-3"
                  controlId="validationRunOutFormik01"
                >
                  {RunInfoform.map(({ name, type, label, placeholder }) => (
                    <Row className="mb-3 me-3" key={name}>
                      <Col lg={4}>
                        <Form.Label>{label}</Form.Label>
                      </Col>
                      <Col lg={8}>
                        <Form.Control
                          type={type}
                          name={name}
                          placeholder={placeholder}
                          value={formik.values[name] || ""} // Add `|| ''` to provide a default empty string value
                          onChange={formik.handleChange}
                          isValid={formik.touched[name] && !formik.errors[name]}
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
                onClick={createruninfoButton}
              >
                Create API
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
          <p>Are you sure you want to delete this runinfo?</p>
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

export default Runinfoin;
