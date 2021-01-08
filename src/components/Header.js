import React, { useState, useEffect } from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Header(props){
    const [ isLogin, setIsLogin]  = useState(false);
    const [ name, setName]  = useState();
    
    useEffect(() => {
      const user_data = JSON.parse(localStorage.getItem('isUserLogged'));

      if(user_data && user_data.login){
        setIsLogin(user_data.login);
        setName(user_data.name);
      }

    });

    const handleLogoutClick = () => {
        localStorage.clear('isUserLogged');
        window.location.reload();
    }
    
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="#">Home</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"> </Nav>
                <Nav>
                  <Nav.Link href="#">{name}</Nav.Link>
                  <Nav.Link href="#">
                    { isLogin ? <button onClick={handleLogoutClick} >Logout</button>: < ></> }
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        </>
    );
  }



