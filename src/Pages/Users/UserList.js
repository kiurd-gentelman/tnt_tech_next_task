
import Table from 'react-bootstrap/Table'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import ReactPaginate from "react-paginate";

export  const UserList = ()=>{
    let tempPage = 0;
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [orderType, setOrderType] = useState(["asc", "desc"])
    const [search, setSearch] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(parseInt(localStorage.getItem('perUserInJumpPage')))
    const [jump, setJump] = useState(["1","3", "5" , "all"])

    useEffect(() => {
        console.log(localStorage.getItem('changeActivity'))
        localStorage.setItem('perUserInJumpPage' , "1")
        getAllUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const [ChangeActivity, setChangeActivity] = useState([]);
    const getAllUser =()=>{

        if (localStorage.getItem('changeActivity') != null){
            // console.log(localStorage.getItem('changeActivity'))
            setUsers(JSON.parse(localStorage.getItem('changeActivity')) )
        }else{
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

    }


    /*--------------------------Order system-------------------*/
    const [sorting , setSorting] = useState([]);
    const changeOrder=(event,data)=>{
        // console.log(event.target.value)

        // const [sorting , setSorting] = useState()
        setSorting(data)
        console.log(sorting)

        // let formdata = {
        //     order:event.target.value,
        //     data :data
        // }
        // localStorage.setItem('orderBy', event.target.value);
        // localStorage.setItem('ColumnName', data);
        let computedComments = users;
        // let order = computedComments.sort((a, b)=> {
        //     console.log(a[sorting])
        //     console.log(sorting)
        //     // console.log(a.sorting)
        //     if (a[sorting] < b[sorting]) {
        //         return -1;
        //     }
        //     if (a[sorting] > b[sorting]) {
        //         return 1;
        //     }
        //     return 0;
        // });
        // console.log(order)



        if (data) {
            if (sorting) {
                const reversed = event.target.value === "asc" ? 1 : -1;
                computedComments = computedComments.sort(
                    (a, b) =>
                        reversed * a[sorting].localeCompare(b[sorting])
                );
            }
        }
        console.log(computedComments)

        //


        // localStorage.setItem('changeActivity', JSON.stringify(computedComments))

        // axios.post('http://127.0.0.1:8000/api/user/order-list', formdata, {
        //     headers: {
        //         "Authorization" : `Bearer ${localStorage.getItem('token')}`
        //     },
        // }).then(function (response) {
        //     if (response.status === 200){
        //         console.log(response);
        //         setUsers(response.data.result )
        //         localStorage.setItem('changeActivity', JSON.stringify(response.data.result))
        //     }
        // }).catch(function (error) {
        //     console.log(error);
        //     history.push("/login");
        // });
    }



    const displayOrderType= orderType.map((item)=>{
        return(
            <option value={item} key={item}>{item}</option>
        )
    })

    /*--------------------Search----------------*/


    const searchUser=(event)=>{
        setSearch(event.target.value)
    }
    const findSearchValue=()=>{
        localStorage.setItem('search', search);
        let formdata ={
            search: search
        }
        let computedComments = users;
        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.email.toLowerCase().includes(search.toLowerCase()) ||
                    comment.website.toLowerCase().includes(search.toLowerCase())
            );
        }
        console.log( computedComments);
        setUsers(computedComments )
        localStorage.setItem('changeActivity', JSON.stringify(computedComments))

        // axios.post('http://127.0.0.1:8000/api/user/search', formdata, {
        //     headers: {
        //         "Authorization" : `Bearer ${localStorage.getItem('token')}`
        //     },
        // }).then(function (response) {
        //     if (response.status === 200){
        //         console.log(response);
        //         setUsers(response.data.result )
        //         // tempPage = 0
        //         // console.log(typeof tempPage)
        //         tempPage = parseInt(localStorage.setItem('initialPage',0))
        //         // tempPage = parseInt(tempPage)
        //         localStorage.setItem('changeActivity', JSON.stringify(response.data.result))
        //     }
        // }).catch(function (error) {
        //     console.log(error);
        //     history.push("/login");
        // });
    }

    /*-----------------------------Paginate---------------------------*/


    // console.log(pageNumber)
    // console.log(localStorage.getItem('initialPage'))

    if (localStorage.getItem('initialPage') !== null) {
        tempPage = localStorage.getItem('initialPage')
        console.log(tempPage)
    }
    tempPage = parseInt(tempPage)
    // console.log(typeof tempPage)
    // const usersPerPage = 1;
    // if(localStorage.getItem('perUserInJumpPage') != null) {
    //     let temp_variable = localStorage.getItem('perUserInJumpPage');
    //     setUsersPerPage(parseInt(temp_variable));
    //     console.log(typeof usersPerPage)
    // } else{
    //     setUsersPerPage(1);
    // }

    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage).map((user) => {
        return (
            <tr key={user.id}>
                <td>1</td>
                <td><h5><Link className="text-danger" to={`/profile/${user.id}`}>{user.name}</Link></h5></td>
                <td>{user.email}</td>
                <td>{user.website}</td>
            </tr>
        );
    });

    const pageCount = Math.ceil(users.length / usersPerPage);

    const changePage = ({ selected }) => {
        console.log(selected)
        localStorage.setItem('initialPage', selected);
        setPageNumber(selected);
        // console.log(pageNumber)
        // console.log(localStorage.getItem('initialPage'))
    };

    /*---------------------------------Page Jump-------------------------------*/



    const displayJump= jump.map((item)=>{
        return(
            <option value={item} key={item}>{item}</option>
        )
    })
    const jumpChange=(event)=>{
        console.log(event.target.value)
        localStorage.setItem('perUserInJumpPage',event.target.value)
        setUsersPerPage(event.target.value)
    }


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
            <select onChange={e =>jumpChange(e)}>
                {displayJump}
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
                initialPage={tempPage}
            />

        </div>
    )
}
export default UserList
