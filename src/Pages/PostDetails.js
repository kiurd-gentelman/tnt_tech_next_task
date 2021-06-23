import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios";


export const PostDetails = () => {
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
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.description}</p>
                    {/*<a href="#" className="card-link">Card link</a>*/}
                    {/*<a href="#" className="card-link">Another link</a>*/}
                </div>
            </div>
        </div>
    )
}

export default PostDetails
