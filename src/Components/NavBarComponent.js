import React from 'react'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import From from 'react-bootstrap/Form'

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
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active"  to="#">Task</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" to="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                    >
                                    sgdfhg
                                </a>
                                <ul className="dropdown-menu" >
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" to="#" >Disabled</a>
                            </li>
                        </ul>
                        <From className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <Button className="btn btn-outline-success" type="submit">Search</Button>
                        </From>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <a href="#login">Mark Otto</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </div>
                </div>
            </Navbar>

        </div>
    )
}

export default NavBarComponent
