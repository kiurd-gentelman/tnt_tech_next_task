
import Table from 'react-bootstrap/Table'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import ReactPaginate from "react-paginate";

export  const UserList = ()=>{
    const history = useHistory();
    useEffect(() => {
        getAllUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [users, setUsers] = useState([]);
    const getAllUser =()=>{
        axios.get(`http://127.0.0.1:8000/api/user-list`,
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }
            ).then(res => {
                const persons = res.data;
                setUsers(persons.result )
            }).catch(function (error) {
            console.log(error);
            history.push("/login");
        });
    }

    // const displayUser = users.map((user)=>{
    //     return(
    //         <tr key={user.id}>
    //             <td>1</td>
    //             <td>{user.name}</td>
    //             <td>{user.email}</td>
    //             <td>{user.website}</td>
    //         </tr>
    //     )
    // })

    /*--------------------------Order system-------------------*/
    const changeOrder=(event,data)=>{
        // console.log(event.target.value)
        // console.log(data)
        let formdata = {
            order:event.target.value,
            data :data
        }
        localStorage.setItem('orderBy', event.target.value);
        localStorage.setItem('ColumnName', data);
        axios.post('http://127.0.0.1:8000/api/user/order-list', formdata, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            },
        }).then(function (response) {
            if (response.status === 200){
                console.log(response);
                setUsers(response.data.result )
            }
        })
            .catch(function (error) {
                console.log(error);
                history.push("/login");
            });
    }

    const [orderType, setOrderType] = useState(["asc", "desc"])

    const displayOrderType= orderType.map((item)=>{
        return(
            <option value={item} key={item}>{item}</option>
        )
    })

    /*--------------------Search----------------*/

    const [search, setSearch] = useState([]);
    const searchUser=(event)=>{
        setSearch(event.target.value)
    }
    const findSearchValue=()=>{
        localStorage.setItem('search', search);
        let formdata ={
            search: search
        }

        axios.post('http://127.0.0.1:8000/api/user/search', formdata, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            },
        }).then(function (response) {
            if (response.status === 200){
                console.log(response);
                setUsers(response.data.result )
            }
        }).catch(function (error) {
                console.log(error);
                history.push("/login");
            });
    }

    /*-----------------------------Paginate---------------------------*/
    const [pageNumber, setPageNumber] = useState(1);
    const usersPerPage = 1;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = users
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((user) => {
            return (
                <tr key={user.id}>
                    <td>1</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.website}</td>
                </tr>
            );
        });

    const pageCount = Math.ceil(users.length / usersPerPage);

    const changePage = ({ selected }) => {
        // console.log(selected)
        setPageNumber(selected);
    };

    /*---------------------------------Page Jump-------------------------------*/

    return (
        <div>
            <div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={searchUser}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={findSearchValue}>
                        Search
                    </Button>
                </InputGroup>
            </div>
            <select>
                <option>3</option>
                <option>5</option>
                <option>all</option>
            </select>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name
                        <select className="float-right" onChange={e => changeOrder(e,'name')}>
                            {displayOrderType}
                        </select>
                    </th>
                    <th> Email
                        <select className="float-right" onChange={e => changeOrder(e,'email')}>
                            {displayOrderType}
                        </select>
                    </th>
                    <th>Website</th>
                </tr>
                </thead>
                <tbody>
                {displayUsers}
                </tbody>
            </Table>
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
export default UserList
