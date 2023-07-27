import Link from 'next/link';
import React from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import Image from 'next/image';

//import images
import github from "../assets/images/brands/github.png";
import bitbucket from "../assets/images/brands/bitbucket.png";
import dribbble from "../assets/images/brands/dribbble.png";
import dropbox from "../assets/images/brands/dropbox.png";
import mail_chimp from "../assets/images/brands/mail_chimp.png";
import slack from "../assets/images/brands/slack.png";

const BrowseAppsDropdown = () => {
    return (
        <React.Fragment>
            <Dropdown className="topbar-head-dropdown ms-1 header-item">
                <Dropdown.Toggle id="browser-apps" type="button" className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle arrow-none">
                    <i className='bi bi-grid fs-18'></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-lg p-0 dropdown-menu-end">
                    <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                        <Row className="align-items-center">
                            <Col>
                                <h6 className="m-0 fw-semibold fs-15"> Browse by Apps </h6>
                            </Col>
                            <div className="col-auto">
                                <Link href="/" className="btn btn-sm btn-soft-info"> View All Apps
                                    <i className="ri-arrow-right-s-line align-middle"></i></Link>
                            </div>
                        </Row>
                    </div>

                    <div className="p-2">
                        <Row className="g-0">
                            <Col>
                                <Link className="dropdown-icon-item" href="/">
                                    <Image src={github} alt="Github" width={24} height={24} />
                                    <span>GitHub</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" href="/">
                                    <Image src={bitbucket} alt="bitbucket" width={24} height={24}  />
                                    <span>Bitbucket</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" href="/">
                                    <Image src={dribbble} alt="dribbble" width={24} height={24}  />
                                    <span>Dribbble</span>
                                </Link>
                            </Col>
                        </Row>

                        <Row className="g-0">
                            <Col>
                                <Link className="dropdown-icon-item" href="/">
                                    <Image src={dropbox} alt="dropbox" width={24} height={24}  />
                                    <span>Dropbox</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" href="/">
                                    <Image src={mail_chimp} alt="mail_chimp" width={24} height={24}  />
                                    <span>Mail Chimp</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" href="/">
                                    <Image src={slack} alt="slack" width={24} height={24}  />
                                    <span>Slack</span>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </Dropdown.Menu>
            </Dropdown>

        </React.Fragment>
    );
}

export default BrowseAppsDropdown;