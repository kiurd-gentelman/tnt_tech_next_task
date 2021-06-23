import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export const Login = ()=>{
    const {email,setEmail} = useState([]);
    const {password,setPassword} = useState([]);

    const credentialsEmail = (event) =>{
        // console.log(event.target.value)
        setEmail(event.target.value)
    }
    const credentialsPassword = (event) =>{
        // console.log(event.target.value)
        setPassword(event.target.value)
    }
    const formSubmit = (event)=>{
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
    return(
        <div>
            <Form onSubmit={formSubmit}>
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
    )
}
export default Login
