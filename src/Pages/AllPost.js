import React , { useState } from 'react'
import ReactPaginate from 'react-paginate'
import JsonData from './../data/user_list.json'

import { ListGroup } from 'react-bootstrap'

export const AllPost = () => {
    // const [users,setUsers] = useState(JsonData.slice(0, 50));
    const [users] = useState(JsonData.slice(0, 50));
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(users.length / usersPerPage);

    const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <div >
        <ListGroup.Item as="li">{user.firstName} . {user.lastName} . {user.email}</ListGroup.Item>  
        </div>
      );
    });


    const changePage = ({ selected }) => {
        setPageNumber(selected);
      };
    return (
        <div >
            
            <ListGroup as="ul" >
                {displayUsers}
            </ListGroup>
            
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
