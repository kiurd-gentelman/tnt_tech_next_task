import React from 'react'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from "react-router-dom";

const NavBarComponent = () => {
    return (
        < div >
            <Navbar className="navbar navbar-expand-lg navbar-light bg-light" fixed="top">
                    <div className="container-fluid">
                        <a className="navbar-brand" to="#"><b>TNT</b> <sub>Tech Next Task</sub></a>
                        <Button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </Button>
                            <div className="collapse navbar-collapse container" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active"  to="/">All Posts</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="#">Link</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown">
                                            sgdfhg
                                        </Link>
                                        <ul className="dropdown-menu" >
                                            <li><Link className="dropdown-item"  to="#">Action</Link></li>
                                            <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>
                                            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link disabled" to="#" >Disabled</Link>
                                    </li>
                                </ul>
                                <Navbar.Collapse className="justify-content-end">
                                    <Link className="nav-item nav-link" to="/login" >Login</Link>
                                    <Navbar.Text>
                                        <NavDropdown title="Link" id="navbarScrollingDropdown" >
                                            <NavDropdown.Item to="#action3">Profile</NavDropdown.Item>
                                            <NavDropdown.Item href="#action4">Logout</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                                        </NavDropdown>
                                    </Navbar.Text>
                                </Navbar.Collapse>
                            </div>

                    </div>
                </Navbar>
        </div>
    )
}

export default NavBarComponent
