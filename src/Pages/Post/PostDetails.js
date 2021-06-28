import React, {useEffect, useState} from 'react'
import {Link, useHistory, useParams} from "react-router-dom"
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup'
import {toast, ToastContainer} from "react-toastify";
// import {map} from "react-bootstrap/ElementChildren";


export const PostDetails = (props) => {
    const history = useHistory();
    const {auth} = props;
    const {productId} = useParams()

    let storeData =[];

    useEffect(() => {
        getPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);


    const getPost = () => {
        axios.get('http://127.0.0.1:8000/api/post-show/'+productId)
            .then(res => {
                const persons = res.data;
                // allUser = persons.result;
                // console.log(persons.result.comments)
                setPost(persons.result )
                storeData = persons.result.comments;
                // console.log(storeData);
                setComments(storeData)
            })
    }

    let formComments = '';
    const getComment = (event) =>{

        formComments = (event.target.value)
        // console.log(comments)
    }

    const commentSubmit = (event)=>{
        let formdata = {
            post_id :post.id,
            comments: formComments,
        }
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/comment-create', formdata, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            },
        }).then(function (response) {
            if (response.status === 200){
                toast("Comment Post complete")
                // history.push("/dashboard");
                getPost()
            }
        }).catch(function (error) {
                console.log(error);
            history.push("/login");
            });

    }
    const commentDelete =(id)=>{
        const newList = comments.filter((item) => item.id !== id);
        setComments(newList);
        axios.get('http://127.0.0.1:8000/api/comment-delete/'+id, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            },
        }).then(function (response) {
            if (response.status === 200){
                toast("Comment deleted")

                // console.log(response);
            }

        }).catch(function (error) {
            console.log(error);
            history.push("/login");
        });
    }

    // console.log(auth.id , post.user_id)
    const displayComments = comments.map((comment) =>{
        return(
            <div key={comment.id}>
                <ListGroup>
                    <ListGroup.Item variant="primary">{comment.comments }
                        {/* eslint-disable-next-line eqeqeq */}
                        {(auth.id == comment.user_id)?
                            <Button className="float-right btn-sm btn-danger" onClick={ () => commentDelete(comment.id)}>Delete</Button>:
                            ''
                            }
                    </ListGroup.Item>
                </ListGroup>
            </div>
        )
    } )

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
            <h3 className="text-center mt-5"> All user comments</h3>
            {displayComments}
            {(auth != null) ?
                <Form onSubmit={commentSubmit} className="mt-5">
                    <Form.Group className="mb-3" controlId="RegFormEmail">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea"
                                      onChange={getComment}
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
