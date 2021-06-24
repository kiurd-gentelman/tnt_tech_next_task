
import React, {useEffect, useState} from "react";
import "./App.css";
import {Route, Switch } from "react-router-dom";


// Components
import NavBar from './Components/NavBarComponent'
import Footer from './Components/FooterComponents'

//Pages
import AllPost from './Pages/AllPost'
import PostDetails from './Pages/PostDetails'
import Login from './Pages/Login'
import axios from "axios";



function App() {
    useEffect(() => {
        authUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [auth, setAuth] = useState(1);
    const authUser = () => {
        // token = ;
        axios.get(`http://127.0.0.1:8000/api/user`,
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
            .then(res => {
                const persons = res.data;
                // allUser = persons.result;
                console.log(persons.data);
                setAuth(persons.data )
            })

    }
  return (

        <div className="App">
          <NavBar auth={auth}/>
          <div className="container content">
              <Switch>
                  <Route exact path="/">
                      <AllPost/>
                  </Route>
                  <Route exact path="/login">
                      <Login/>
                  </Route>
                  <Route   path="/details/:productId">
                      <PostDetails />
                  </Route>
                  {/*{(auth 1= null)}*/}
              </Switch>
          </div>
          <Footer/>
        </div>

  );
}

export default App;
