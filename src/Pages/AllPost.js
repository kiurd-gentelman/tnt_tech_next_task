import React, { useState, useEffect } from 'react'
// import ReactPaginate from 'react-paginate'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";



export const AllPost = (props) => {

    const [post, setPost] = useState([]);
    const [visible, setVisible] = useState(10);

    let allUser = '';
    useEffect(() => {
        getAllNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadDate = ({ selected }) => {
        setVisible((prevValue)=>prevValue + 10);
    };


    const getAllNotes = () => {
            axios.get(`http://127.0.0.1:8000/api/all-post`)
                .then(res => {
                    const persons = res.data;
                    allUser = persons.result;
                    // console.log(allUser)
                    setPost(allUser )
                })

        }

    // const [pageNumber, setPageNumber] = useState(0);
    // const postPerPage = 10;
    // const pagesVisited = pageNumber * postPerPage;
    // const pageCount = Math.ceil(post.length / postPerPage);
    // const post_view = id =>{
    //
    //     console.log(id)
    // }
    // const history = useHistory();
    const displayUsers = post.slice(0,visible).map((post) => {

        return (
            <div key={post.id}>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="ms-2 me-auto">
                                        <span className="fw-bold">{post.title} . </span><span><sub>Author: {post.user.name} .  posted in {post.created_at} </sub></span>
                                        <div>{(post.description.length >200) ? post.description.substring(0,200):post.description}</div>
                                    </div>
                                </td>
                                <td>
                                    <Link to={`/post-details/${post.id}`} >View</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                        {/*<span className="btn btn-sm  btn-primary rounded-pill" onClick={() => { console.log(3);history.push('/details') }}>View Post</span>*/}
                </li>
            </div>
        );
    });


    return (
        <div >
            <ol className = "list-group list-group-numbered" > { displayUsers } </ol>
            <div className="mt-3 w-100 d-flex justify-content-center">
                {(post.length >visible)?
                    <Button className="btn btn-sm btn-info" onClick={loadDate}>Load More</Button> :''
                }
                {/*<Button className="btn btn-sm btn-info" onClick={loadDate}>Load More</Button>*/}
            </div>

        </div >
    )
}

export default AllPost;
