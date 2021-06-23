
import React from "react";
import "./App.css";
import {Route, Switch } from "react-router-dom";


// Components
import NavBar from './Components/NavBarComponent'
import Footer from './Components/FooterComponents'

//Pages
import AllPost from './Pages/AllPost'
import PostDetails from './Pages/PostDetails'
import Login from './Pages/Login'



function App() {
  return (

        <div className="App">
          <NavBar/>
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
              </Switch>
          </div>
          <Footer/>
        </div>

  );
}

export default App;
