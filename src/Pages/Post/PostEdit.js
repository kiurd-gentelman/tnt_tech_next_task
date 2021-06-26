import React, {useEffect, useState} from 'react'
import {Link, useHistory, useParams} from "react-router-dom"
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {toast, ToastContainer} from "react-toastify";


export const PostDetails = () => {
    const {productId} = useParams()
    useEffect(() => {
        getPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [postTitle, setPostTitle] = useState([]);
    const [post, setPost] = useState([]);
    const getPost = () => {
        axios.get('http://127.0.0.1:8000/api/post-show/'+productId)
            .then(res => {
                const persons = res.data;
                console.log(persons.result.title)
                // allUser = persons.result;
                setPostTitle(persons.result.title )
                setPost(persons.result.description )
            })

    }

    /*Edit option*/

    const ChangeTitle = (event) =>{
        setPostTitle (event.target.value)
    }
    const ChangeDescription = (event) =>{
        setPost (event.target.value)
    }
    const history = useHistory();
    const postFormSubmit = (event)=>{
        // const notify = () => toast("Wow so easy!");

        let formdata = {
            title: postTitle,
            description: post,
        }
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/post-update/'+productId, formdata, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            },

        }).then(function (response) {
            if (response.status == '200'){
                toast("registration complete")
                history.push("/dashboard");
                console.log(response.status);
            }

        }).catch(function (error) {
                console.log(error);
            });
    }

    return(
        <div>
            <h2> Post Edit</h2>
            <Link className="btn btn-sm btn-success"  to="/dashboard" >Go to post</Link>
            {/*<div className="card mt-5">*/}
            {/*    <div className="card-body">*/}
            {/*        <h5 className="card-title">{post.title}</h5>*/}
            {/*        <p className="card-text">{post.description}</p>*/}
            {/*        /!*<a href="#" className="card-link">Card link</a>*!/*/}
            {/*        /!*<a href="#" className="card-link">Another link</a>*!/*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div>
                <div className="mt-5">

                    <Form onSubmit={postFormSubmit}>
                        <Form.Group className="mb-3" controlId="RegFormName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={postTitle} onChange={ChangeTitle}  />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="RegFormEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control as="textarea"
                                          value={post}
                                          onChange={ChangeDescription}
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
        </div>
    )
}

export default PostDetails
