import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom"
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ToastContainer} from "react-toastify";


export const PostDetails = (props) => {
    const {auth} = props;
    const {productId} = useParams()
    console.log(productId)
    useEffect(() => {
        getPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [post, setPost] = useState([]);
    const getPost = () => {
        axios.get('http://127.0.0.1:8000/api/post-show/'+productId)
            .then(res => {
                const persons = res.data;
                // allUser = persons.result;
                setPost(persons.result )
            })

    }

    return(
        <div>
            <h2> Post Details</h2>
            <Link className="btn btn-sm btn-success"  to="/dashboard" >Go to post</Link>
            <div className="card mt-5">
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.description}</p>
                </div>
            </div>
            {(auth != null) ?
                <Form onSubmit="" className="mt-5">
                    <Form.Group className="mb-3" controlId="RegFormName">
                        <Form.Control type="hidden" value={post.id}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="RegFormEmail">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea"
                                      value=""
                                      placeholder="Leave a comment here"
                                      style={{height: '100px'}}
                        />
                        {/*<Form.Control type="email" placeholder="Enter email" value={reg_email} onChange={postDescription} />*/}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <ToastContainer/>
                </Form> :
                ''
            }
        </div>
    )
}

export default PostDetails
