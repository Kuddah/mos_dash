import React, { useState, useEffect, ReactElement } from "react";
import Image from "next/image";
import Head from "next/head";
import { Container, Row, Col, Card, Alert, Button, Form } from "react-bootstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

import avatar from "@assets/images/users/avatar-1.jpg";

// actions
import { editProfile, resetProfileFlag } from "../../Components/slices/thunk";
import Layout from "@common/Layout";

const UserProfile = () => {
  const dispatch: any = useDispatch();

  const [email, setemail] = useState<string>("admin@gmail.com");
  const [uid, setuid] = useState<number>(1);

  const [userName, setUserName] = useState<string>("Admin");

  const { success, error } = useSelector((state: any) => ({
    success: state.Profile.success,
    error: state.Profile.error
  }));

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.NEXT_PUBLIC_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser") || "");
        setUserName(obj.displayName);
        setemail(obj.email)
        setuid(obj.uid)
      } else if (
        process.env.NEXT_PUBLIC_DEFAULTAUTH === "fake" ||
        process.env.NEXT_PUBLIC_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser") || "");
        setUserName(obj.username);
        setemail(obj.email)
        setuid(obj.uid)
      }
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success, error]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: userName || 'Admin',
      idx: uid || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    }
  });

  return (
    <React.Fragment>
      <Head>
        <title>Profile | Hybrix - React Admin & Dashboard Template</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              {error && error ? <Alert variant="danger">{error}</Alert> : null}
              {success ? <Alert variant="success">Username Updated To {userName}</Alert> : null}
              <Card>
                <Card.Body>
                  <div className="d-flex">
                    <div className="mx-3">
                      <Image src={avatar} alt="" className="avatar-md rounded-circle img-thumbnail" />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{userName || "Admin"}</h5>
                        <p className="mb-1">Email Id : {email}</p>
                        <p className="mb-0">Id No : #{uid}</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <Card.Body>
              <Form className="form-horizontal" onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }}>
                <div className="form-group">
                  <Form.Label className="form-label">User Name</Form.Label>
                  <Form.Control name="username" className="form-control" placeholder="Enter User Name" type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    isInvalid={
                      validation.touched.username && validation.errors.username ? true : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (<Form.Control.Feedback type="invalid">{validation.errors.username}</Form.Control.Feedback>) : null}
                  <Form.Control name="uid" value={uid} type="hidden" />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" variant="danger"> Update User Name </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};


UserProfile.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
};

export default UserProfile;