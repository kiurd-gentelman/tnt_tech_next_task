import React, {useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from "react-router-dom";

// import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from "react-router-dom";
import axios from "axios";

export const NavBarComponent = (props) => {
    const history = useHistory();
    const {auth} = props;

    // let allUser = '';
    // useEffect((auth) => {
    //     permission_check();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    // let show_permission = false;
    // const  permission_check = ()=>{
    //     if (auth != null){
    //         show_permission = true;
    //     }
    // }
    console.log(auth)
    const logout = ()=>{
        axios.post(`http://127.0.0.1:8000/api/logout`,
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
            .then(res => {
                const persons = res.data;
                // allUser = persons.result;
                localStorage.setItem('token', null);
                history.push("/");
                window.location.reload();
                console.log(persons.data);
                // setAuth(persons.data )
            }).catch(function (error) {
            // handle error
            console.log(error);
            // setAuth(null )
        })
    }
    return (
        < div >
            <Navbar className="navbar navbar-expand-lg navbar-light bg-light" fixed="top">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="#"><b>TNT</b> <sub>Tech Next Task</sub></Link>
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
                                    {(auth != null)?
                                        <li className="nav-item">
                                            <Link className="nav-link active"  to="/dashboard">Dashboard</Link>
                                        </li> :
                                        ''
                                    }

                                    {/*<li className="nav-item">*/}
                                    {/*    <Link className="nav-link" to="#">Link</Link>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item dropdown">*/}
                                    {/*    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown">*/}
                                    {/*        sgdfhg*/}
                                    {/*    </Link>*/}
                                    {/*    <ul className="dropdown-menu" >*/}
                                    {/*        <li><Link className="dropdown-item"  to="#">Action</Link></li>*/}
                                    {/*        <li><Link className="dropdown-item" to="#">Another action</Link></li>*/}
                                    {/*        <li>*/}
                                    {/*            <hr className="dropdown-divider"/>*/}
                                    {/*        </li>*/}
                                    {/*        <li><Link className="dropdown-item" to="#">Something else here</Link></li>*/}
                                    {/*    </ul>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                    {/*    <Link className="nav-link disabled" to="#" >Disabled</Link>*/}
                                    {/*</li>*/}
                                </ul>
                                <Navbar.Collapse className="justify-content-end">
                                    {(auth != null)?
                                        <Navbar.Text>
                                            <NavDropdown title={'Hello ' + auth.name} id="navbarScrollingDropdown" >
                                                {/*<NavDropdown.Item to="/dashboard">Dashboard</NavDropdown.Item>*/}
                                                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                                            </NavDropdown>
                                        </Navbar.Text> :
                                        <Link className="nav-item nav-link" to="/login" >Login / Registration</Link>

                                    }
                                </Navbar.Collapse>
                            </div>
                    </div>
                </Navbar>
        </div>
    )
}

export default NavBarComponent
