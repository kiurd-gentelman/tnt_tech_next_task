import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {toast, ToastContainer} from "react-toastify";
import React from "react";
import axios from "axios";
import PostDetails from "./PostDetails";
import {Link , useHistory} from "react-router-dom";




export  const CreatePost = () =>{
    let title
    let description
    const postTitle = (event) =>{

        title = (event.target.value)
        console.log(title)
    }
    const postDescription = (event) =>{

        description = (event.target.value)
        console.log(description)
    }
    const history = useHistory();
    const postFormSubmit = (event)=>{
        // const notify = () => toast("Wow so easy!");

        let formdata = {
            title: title,
            description: description,
        }
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/post-create', formdata, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            },

        }).then(function (response) {
            if (response.status == '200'){
                toast("registration complete")
                history.push("/dashboard");
                console.log(response.status);
            }

        })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div>
            <h3> Create post</h3>
            <Link className="btn btn-sm btn-success"  to="/dashboard" >Go to Dashboard</Link>
            <div className="mt-5">

                <Form onSubmit={postFormSubmit}>
                    <Form.Group className="mb-3" controlId="RegFormName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={title} onChange={postTitle}  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="RegFormEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={postDescription}
                                      as="textarea"
                                      placeholder="Leave a comment here"
                                      style={{ height: '100px' }}
                        />
                        {/*<Form.Control type="email" placeholder="Enter email" value={reg_email} onChange={postDescription} />*/}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <ToastContainer />
                </Form>
            </div>
        </div>

    )
}
export default CreatePost
