import React from 'react'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import From from 'react-bootstrap/Form'
import {
  BrowserRouter as Router,
//   Switch,
//   Route,
  Link
} from "react-router-dom";

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
                    <Router>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active"  to="#">Task</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" to="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                    >
                                    sgdfhg
                                </Link>
                                <ul className="dropdown-menu" >
                                    <li><Link className="dropdown-item" href="#">Action</Link></li>
                                    <li><Link className="dropdown-item" href="#">Another action</Link></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><Link className="dropdown-item" href="#">Something else here</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled" to="#" >Disabled</Link>
                            </li>
                        </ul>
                        <From className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <Button className="btn btn-outline-success" type="submit">Search</Button>
                        </From>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <Link to="/login">Mark Otto</Link>
                            </Navbar.Text>
                        </Navbar.Collapse>

                        {/* <Switch>
                            <Route path="/about">
                            <About />
                            </Route>
                            <Route path="/users">
                            <Users />
                            </Route>
                            <Route path="/">
                            <Home />
                            </Route>
                        </Switch> */}
                    </div>
                
                    </Router>
                    
                    </div>
            </Navbar>

        </div>
    )
}

export default NavBarComponent
