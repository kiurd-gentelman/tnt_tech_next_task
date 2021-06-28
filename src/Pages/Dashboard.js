import React, { useState, useEffect } from 'react'
// import ReactPaginate from 'react-paginate'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';
import {Link, useHistory} from "react-router-dom";
import {toast} from "react-toastify";



export const AllPost = () => {
    const history = useHistory();
    let allUser = '';
    useEffect(() => {
        getAllNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [post, setPost] = useState([]);
    const [visible, setVisible] = useState(10);
    const getAllNotes = () => {
        axios.get(`http://127.0.0.1:8000/api/user-post`,
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
            .then(res => {
                const persons = res.data;
                allUser = persons.result;
                setPost(allUser )
            }).catch(function (error) {
            console.log(error);
            history.push("/login");
        });

    }
    const deletePost = ( id) =>{
        const newList = post.filter((item) => item.id !== id);
        setPost(newList);
        axios.get('http://127.0.0.1:8000/api/post-delete/'+id, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            },
        }).then(function (response) {
            if (response.status === 200){
                toast("registration complete")
                history.push("/dashboard");
                // console.log(response);
            }

        }).catch(function (error) {
            console.log(error);
            history.push("/login");
        });
    }

    const displayUsers = post.slice(0,visible).map((post) => {

        return (
            <div key={post.id}>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td>
                                <div className="ms-2 me-auto">
                                    <span className="fw-bold">{post.title} . </span><span><sub> posted in {post.created_at} </sub></span>
                                    <div>{(post.description.length >200) ? post.description.substring(0,200):post.description}</div>
                                </div>
                            </td>
                            <td>
                                <ButtonGroup aria-label="Basic example">
                                <Link className="btn btn-sm btn-info" to={`/post-details/${post.id}`} >View</Link>
                                <Link className="btn btn-sm btn-warning" to={`/post-edit/${post.id}`} >Edit</Link>
                                <a className="btn btn-sm btn-danger" onClick={()=>{ if(window.confirm('Delete the item?')) {deletePost(post.id)}}} >Delete</a>
                                </ButtonGroup>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {/*<span className="btn btn-sm  btn-primary rounded-pill" onClick={() => { console.log(3);history.push('/details') }}>View Post</span>*/}
                </li>
            </div>
        );
    });

    // function Details() {
    //     return <h2>Home</h2>;
    // }


    const loadDate = ({ selected }) => {
        setVisible((prevValue)=>prevValue + 1);
    };




    return (
        <div >
            <h3> My all post</h3>
            <Link className="btn btn-sm btn-success"  to="/post-create" >Create</Link>
            <ol className = "list-group list-group-numbered mt-5" > { displayUsers } </ol>
            <div className="mt-3 w-100 d-flex justify-content-center">
                {(post.length >visible)?
                    <Button className="btn btn-sm btn-info" onClick={loadDate}>Load More</Button> :''
                }

            </div>



            {/*<ReactPaginate previousLabel = { "Previous" }
        nextLabel = { "Next" }
        pageCount = { pageCount }
        onPageChange = { changePage }
        containerClassName = { "paginationBttns" }
        previousLinkClassName = { "previousBttn" }
        nextLinkClassName = { "nextBttn" }
        disabledClassName = { "paginationDisabled" }
        activeClassName = { "paginationActive" }/>*/}
        </div >
    )
}

export default AllPost;
