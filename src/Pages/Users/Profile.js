import React, {useEffect, useState} from 'react'
import {useHistory, useParams , Link} from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import axios from "axios";

export const Profile = ()=>{
    const history = useHistory();
    const {user_id} = useParams()
    console.log(user_id)

    useEffect(() => {
        getPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [profile, setProfile] = useState([]);
    const [posts, setPosts] = useState([]);
    const getPost = () => {
        axios.get('http://127.0.0.1:8000/api/user-profile/'+user_id,{
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            const persons = res.data.result;
            setProfile(persons);
            setPosts(persons.post)

            }).catch(function (error) {
            console.log(error);
            history.push("/login");
        });
    }

    const displayPost = posts.map((post)=>{
        return(
            <ListGroup.Item as="li">
                <Card className="text-center">
                    <Card.Header>{post.created_at}</Card.Header>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>
                            {post.description}
                        </Card.Text>
                        <Link to={`/post-details/${post.id}`} class="btn btn-sm btn-info">View full post</Link>
                    </Card.Body>
                </Card>
            </ListGroup.Item>
        )

    })
    return(
        <div>
            <div className="card">
                <div className="card-header">
                    User Profile
                </div>
                <div className="card-body">
                    <h5 className="card-title">{profile.name}</h5>
                    <p className="card-text">{profile.email}</p>
                </div>
            </div>
            <ListGroup as="ul">
                {displayPost}
            </ListGroup>
        </div>
    )
}
export default Profile
