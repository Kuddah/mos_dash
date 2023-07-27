import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { bootstrapUi, advanceUi, customUi, form, apexCharts, designGraphics, tables, maps } from '@common/data';
import Image from 'next/image';
import Link from 'next/link';

// Import images
import overviewimg from '@assets/images/overview.png'

const Components = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Row className="justify-content-between align-items-center mt-5">
                        <Col lg={5}>
                            <div className="me-5">
                                    <div className="mb-2">
                                    <span className="badge badge-soft-secondary">Welcome To Hybrix</span>
                                </div>
                                <h1 className="display-6 lh-base fw-medium">Components for <span className="text-primary">Fast & Beautiful</span> Admin Template.</h1>
                                <p className="lead text-muted mb-4 pb-1">Build whatever you want without a single line of CSS/SASS code by just using our low-level utility classes and base components.</p>
                                <div className="d-flex align-items-center gap-4 text-center">
                                    <div>
                                        <h4><span className="counter-value">
                                                32
                                            </span>+</h4>
                                        <p className="text-muted mb-0">Components</p>
                                    </div>
                                    <div>
                                        <h4><span className="counter-value">
                                                20
                                            </span>+</h4>
                                        <p className="text-muted mb-0">Plugins</p>
                                    </div>
                                    <div>
                                        <h4><span className="counter-value">
                                                5
                                            </span>k</h4>
                                        <p className="text-muted mb-0">Icons</p>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={6}>
                            <Image src={overviewimg} alt="" className="img-fluid" />
                        </Col>

                        <Row className="mt-5 pt-4">
                            <Col lg={12}>
                                <Card>
                                    <Card.Header>
                                        <h5 className="card-title text-uppercase mb-0">Bootstrap UI</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="gy-4">    
                                            {(bootstrapUi || []).map((item:any, key:number) => (
                                                <Col xxl={3} lg={4} md={6} key={key}>
                                                    <Card className="mb-0">
                                                        <Card.Body>
                                                            <h6 className="fs-15">{item.title}</h6>
                                                            <p className="text-muted mb-3 text-truncate-two-lines">{item.description}</p>
                                                            <Link href={item.link}>Read More <i className="bi bi-arrow-right align-middle"></i></Link>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Header>
                                        <h5 className="card-title text-uppercase mb-0">ADVANCE UI</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="gy-4">    
                                            {(advanceUi || []).map((item:any, key:number) => (
                                                <Col xxl={3} lg={4} md={6} key={key}>
                                                    <Card className="mb-0">
                                                        <Card.Body>
                                                            <h6 className="fs-15">{item.title}</h6>
                                                            <p className="text-muted mb-3 text-truncate-two-lines">{item.description}</p>
                                                            <Link href={item.link}>Read More <i className="bi bi-arrow-right align-middle"></i></Link>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Header>
                                        <h5 className="card-title text-uppercase mb-0">CUSTOM UI <span className="badge badge-pill bg-danger ms-1 align-bottom">Custom</span></h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="gy-4">    
                                            {(customUi || []).map((item:any, key:number) => (
                                                <Col xxl={3} lg={4} md={6} key={key}>
                                                    <Card className="mb-0">
                                                        <Card.Body>
                                                            <h6 className="fs-15">{item.title}</h6>
                                                            <p className="text-muted mb-3 text-truncate-two-lines">{item.description}</p>
                                                            <Link href={item.link}>Read More <i className="bi bi-arrow-right align-middle"></i></Link>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Header>
                                        <h5 className="card-title text-uppercase mb-0">FORMS</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="gy-4">    
                                            {(form || []).map((item:any, key:number) => (
                                                <Col xxl={3} lg={4} md={6} key={key}>
                                                    <Card className="mb-0">
                                                        <Card.Body>
                                                            <h6 className="fs-15">{item.title}</h6>
                                                            <p className="text-muted mb-3 text-truncate-two-lines">{item.description}</p>
                                                            <Link href={item.link}>Read More <i className="bi bi-arrow-right align-middle"></i></Link>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Header>
                                        <h5 className="card-title text-uppercase mb-0">APEXCHARTS</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="gy-4">    
                                            {(apexCharts || []).map((item:any, key:number) => (
                                                <Col xxl={3} lg={4} md={6} key={key}>
                                                    <Card className="mb-0">
                                                        <Card.Body>
                                                            <h6 className="fs-15">{item.title}</h6>
                                                            <p className="text-muted mb-3 text-truncate-two-lines">{item.description}</p>
                                                            <Link href={item.link}>Read More <i className="bi bi-arrow-right align-middle"></i></Link>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Header>
                                        <h5 className="card-title text-uppercase mb-0">DESIGN & GRAPHICS</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="gy-4">    
                                            {(designGraphics || []).map((item:any, key:number) => (
                                                <Col xxl={3} lg={4} md={6} key={key}>
                                                    <Card className="mb-0">
                                                        <Card.Body>
                                                            <h6 className="fs-15">{item.title}</h6>
                                                            <p className="text-muted mb-3 text-truncate-two-lines">{item.description}</p>
                                                            <Link href={item.link}>Read More <i className="bi bi-arrow-right align-middle"></i></Link>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Header>
                                        <h5 className="card-title text-uppercase mb-0">TABLES</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="gy-4">    
                                            {(tables || []).map((item:any, key:number) => (
                                                <Col xxl={3} lg={4} md={6} key={key}>
                                                    <Card className="mb-0">
                                                        <Card.Body>
                                                            <h6 className="fs-15">{item.title}</h6>
                                                            <p className="text-muted mb-3 text-truncate-two-lines">{item.description}</p>
                                                            <Link href={item.link}>Read More <i className="bi bi-arrow-right align-middle"></i></Link>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Header>
                                        <h5 className="card-title text-uppercase mb-0">Maps</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="gy-4">    
                                            {(maps || []).map((item:any, key:number) => (
                                                <Col xxl={3} lg={4} md={6} key={key}>
                                                    <Card className="mb-0">
                                                        <Card.Body>
                                                            <h6 className="fs-15">{item.title}</h6>
                                                            <p className="text-muted mb-3 text-truncate-two-lines">{item.description}</p>
                                                            <Link href={item.link}>Read More <i className="bi bi-arrow-right align-middle"></i></Link>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>

                            </Col>
                        </Row>

                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
};

export default Components;