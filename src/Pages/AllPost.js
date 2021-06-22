import React  , { useState ,useEffect  } from 'react'
import ReactPaginate from 'react-paginate'
import JsonData from './../data/user_list.json'
import axios from 'axios';


export const AllPost = () => {
    // const [users,setUsers] = useState(JsonData.slice(0, 50));


    let allUser ='';
    useEffect(() => {
        getAllNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const [users,setUsers] = useState('');
    const  getAllNotes =() => {
         axios.get(`http://127.0.0.1:8000/api/all-post`)
            .then(res => {
                const persons = res.data;
                // console.log(persons)
                // eslint-disable-next-line react-hooks/rules-of-hooks
                allUser = persons.result;
                console.log(allUser.slice(0, 1))
                console.log(allUser.length)
                // this.setState({ persons });
                this.setState({ users: allUser })
            })
        // return allUser;
    }
    // console.log(getAllNotes)

// console.log(JsonData.slice(0, 50));

    // const [users] = data;

    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(users.length / usersPerPage);



    console.log(users);
    exit()



    const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage).map((user) => {
      return (
            <div >
                <li className="list-group-item d-flex justify-content-between align-items-start" key={Math.random()}>
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
