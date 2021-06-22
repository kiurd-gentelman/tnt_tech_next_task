import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
// import JsonData from './../data/user_list.json'
import axios from 'axios';


export const AllPost = () => {
    let allUser = '';
    useEffect(() => {
        getAllNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [post, setPost] = useState([]);
    const getAllNotes = () => {
            axios.get(`http://127.0.0.1:8000/api/all-post`)
                .then(res => {
                    const persons = res.data;
                    allUser = persons.result;
                    setPost(allUser )
                })

        }

    const [pageNumber, setPageNumber] = useState(0);
    const postPerPage = 10;
    const pagesVisited = pageNumber * postPerPage;
    const pageCount = Math.ceil(post.length / postPerPage);
    const post_view = id =>{

        console.log(id)
    }

    const displayUsers = post.slice(pagesVisited, pagesVisited + postPerPage).map((post) => {
        return (
            <div key={post.id}>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <span className="fw-bold">{post.title}</span><span><sub>Author {post.author_id} .  posted in {post.created_at} </sub></span>
                        <div>{post.description}</div>
                    </div>
                    <span className="btn btn-sm  btn-primary rounded-pill" onClick={() => post_view(post.id)}>View Post</span>
                </li>
            </div>
        );
    });


    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };




    return (
        <div >
        <ol className = "list-group list-group-numbered" > { displayUsers } </ol>


        <ReactPaginate previousLabel = { "Previous" }
        nextLabel = { "Next" }
        pageCount = { pageCount }
        onPageChange = { changePage }
        containerClassName = { "paginationBttns" }
        previousLinkClassName = { "previousBttn" }
        nextLinkClassName = { "nextBttn" }
        disabledClassName = { "paginationDisabled" }
        activeClassName = { "paginationActive" }/>
                </div >
    )
}

export default AllPost;
