
import React from "react";
import NavBar from './Components/NavBarComponent'
import Footer from './Components/FooterComponents'
import AllPost from './Pages/AllPost'
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="container content">
        <AllPost/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
