
import React , { useState } from 'react';
import {
  BrowserRouter as Router,
  Route ,
  Link,
  Routes
} from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import { UserContext } from './Context/UserContext';

// pages
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

// Header and Footer
import Header from './layout/Header';
import Footer from './layout/Footer';

//firebase
import { initializeApp } from 'firebase/app';

//config
import Config from './Config/firebaseconfig';


const app = initializeApp(Config);


function App() {

  const [user , setUser ] = useState(null) 

  return (
    <div className="App">
      
      <UserContext.Provider value={{user , setUser}} >
            <Router>
                <Header/>

                <Routes>
                  <Route  exact path="/"       element={<Home/>}/>     
                  <Route  exact path="/signin" element={<Signin/>}/> 
                  <Route  exact path="/signup" element={<Signup/>}/>  
                  <Route  path="*" element={<NotFound/>}/>  

                </Routes>
              <Footer/>
            </Router>
      </UserContext.Provider>


    </div>
  );
}

export default App;
