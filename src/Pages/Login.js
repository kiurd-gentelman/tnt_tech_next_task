import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = ()=>{


    let email
    let password
    // const {email,setEmail} = useState([]);
    // const {password,setPassword} = useState([]);

    const credentialsEmail = (event) =>{
        // console.log(event.target.value)
        email=(event.target.value)
    }
    const credentialsPassword = (event) =>{
        // console.log(event.target.value)
        password = (event.target.value)
    }
    const LoginFormSubmit = (event)=>{
        console.log(3);
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/login', {
            email: email,
            password: password
        }).then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /*Registration*/
    let reg_name
    let reg_email
    let reg_password
    let reg_website
    const RegName = (event) =>{

        reg_name = (event.target.value)
        console.log(reg_name)
    }
    const RegEmail = (event) =>{

        reg_email = (event.target.value)
        console.log(reg_email)
    }
    const RegPassword = (event) =>{

        reg_password = (event.target.value)
        console.log(reg_password)
    }
    const RegWebsite = (event) =>{

        reg_website = (event.target.value)
        console.log(reg_website)
    }

    const RegFormSubmit = (event)=>{
        // const notify = () => toast("Wow so easy!");
        console.log(3);
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/register', {

            name: reg_name,
            email: reg_email,
            password: reg_password,
            website: reg_website
        }).then(function (response) {
            if (response.status == 201){
                toast("registration complete")
                reg_name = ""
                reg_email=""
                reg_password = ""
                reg_website =""
            }

                console.log(response.status);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return(
        <div>


            <Tabs
                id="controlled-tab-example">
                <Tab eventKey="home" title="Home">
                    <div className="mt-5">
                        <Form onSubmit={LoginFormSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={credentialsEmail} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={credentialsPassword} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    <div className="mt-5">
                        <Form onSubmit={RegFormSubmit}>
                            <Form.Group className="mb-3" controlId="RegFormName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" value={reg_name} onChange={RegName}  />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="RegFormEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={reg_email} onChange={RegEmail} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="RegFormPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={reg_password} placeholder="Password" onChange={RegPassword} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="RegFormPassword">
                                <Form.Label>Website</Form.Label>
                                <Form.Control type="text" placeholder="website" value={reg_website} onChange={RegWebsite} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <ToastContainer />
                        </Form>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
export default Login
