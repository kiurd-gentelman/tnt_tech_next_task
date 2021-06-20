import React , { useState } from 'react'
import ReactPaginate from 'react-paginate'
import JsonData from './../data/user_list.json'

// import { ListGroup } from 'react-bootstrap'

export const AllPost = () => {
    // const [users,setUsers] = useState(JsonData.slice(0, 50));
    const [users] = useState(JsonData.slice(0, 300));
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(users.length / usersPerPage);

    const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage).map((user) => {
      return (
            <div >
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <span className="fw-bold">Title section</span><span><sub>{"  "}{"  "}Author {user.firstName} .  posted in {user.lastName} . {user.email} </sub></span>
                        <div>This is some description for post , just two or 3 line post in to this post</div>
                        
                    </div>
                    <span className="btn btn-sm  btn-primary rounded-pill">View Post</span>
                </li>
            </div>
      );
    });


    const changePage = ({ selected }) => {
        setPageNumber(selected);
      };
    return (
        <div >
            <ol className="list-group list-group-numbered">
                {displayUsers} 
            </ol>
            
            
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div>
    )
}

export default AllPost;
