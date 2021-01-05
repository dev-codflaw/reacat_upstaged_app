import React, { useState, useEffect } from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Toast from '../components/toast/Toast';

import checkIcon from '../assets/check.svg';
import errorIcon from '../assets/error.svg';
import infoIcon from '../assets/info.svg';
import warningIcon from '../assets/warning.svg';
import Button from '../components/button/Button';
import LoginModal from '../components/modal/LoginModal'

const BUTTON_PROPS = [
    {
      id: 1,
      type: 'success',
      className: 'success',
      label: 'Success'
    },
    {
      id: 2,
      type: 'danger',
      className: 'danger',
      label: 'Danger'
    },
    {
      id: 3,
      type: 'info',
      className: 'info',
      label: 'Info'
    },
    {
      id: 4,
      type: 'warning',
      className: 'warning',
      label: 'Warning'
    },
  ];

  
export default function Header(props){
    const [list, setList] = useState([]);
    const [ isLogin, setIsLogin]  = useState(false);
    const [ name, setName]  = useState();
    const [position, setPosition] = useState('top-right');
    let [checkValue, setCheckValue] = useState(true);
    const [autoDeleteTime, setAutoDeleteTime] = useState(3000);
    let toastProperties = null;

    const showToast = type => {
    const id = Math.floor((Math.random() * 101) + 1);

    switch(type) {
      case 'success':
        toastProperties = {
          id,
          title: 'Success',
          description: 'This is a success toast component',
          backgroundColor: '#5cb85c',
          icon: checkIcon
        }
        break;
      case 'danger':
        toastProperties = {
          id,
          title: 'Danger',
          description: 'This is a error toast component',
          backgroundColor: '#d9534f',
          icon: errorIcon
        }
        break;
      case 'info':
        toastProperties = {
          id,
          title: 'Info',
          description: 'This is an info toast component',
          backgroundColor: '#5bc0de',
          icon: infoIcon
        }
        break;
      case 'warning':
        toastProperties = {
          id,
          title: 'Warning',
          description: 'This is a warning toast component',
          backgroundColor: '#f0ad4e',
          icon: warningIcon
        }
        break;

        default:
          setList([]);
    }

    setList([...list, toastProperties]);
    }
    
    useEffect(() => {
      const user_data = JSON.parse(localStorage.getItem('isUserLogged'));
      if(user_data && user_data.login){
        setIsLogin(user_data.login);
        setName(user_data.name);
      }

    });


    function LogoutButton(props) {
      return (
        <button onClick={props.onClick}>
          Logout
        </button>
      );
    }
    
    function handleLogoutClick(){
      localStorage.clear('isUserLogged');
      window.location.reload(false)
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">


            </Nav>
            <Nav>
            <Nav.Link href="#">{name}</Nav.Link>
            <Nav.Link href="#">
              {isLogin
              ? <LogoutButton onClick={handleLogoutClick} />
              : < ></>
            }
            </Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Navbar>
            {/* < LoginModal /> */}

            {/* <div className="toast-buttons">
            {
                BUTTON_PROPS.map(e => 
                    <Button 
                        key={e.id}
                        className={`${position === 'Select Position' ? `${e.className} btn-disable` : `${e.className}`}`}
                        label={e.label}
                        handleClick={() => showToast(e.type)}
                    />
                )
            }
            </div> */}
            
            <Toast 
                toastList={list}
                position={position}
                autoDelete={checkValue}
                dismissTime={autoDeleteTime}
            />
        </>
    );
  }



