import React, {useState} from 'react'
// import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Form from 'react-bootstrap/Form'
import './LoginModal.css'
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const time = 6000;
    const close = () => setOpen(false)
    const [message, setMessage] = React.useState("")

    const handleSubmit = e => {
        e.preventDefault();
        if(name.length > 0 && email.length > 0){
            // alert(`Submitting Name ${name}`)
            // alert(`Submitting Email ${email}`)
            const data = {
                name: name,
                email: email,
                login: true,
                loginType: 'email'
            }
            localStorage.setItem('isUserLogged', JSON.stringify(data));
            handleClose();
            window.location.reload()

        }
        else{
            setError('Please enter your name and email');
            alert(error);
            alert(JSON.stringify(props));
        }
    }

    const responseFacebook = async (response) => {
        // let fbResponse  = await fbLogin(response.accessToken)
        // console.log(fbResponse);
        localStorage.setItem('isUserLogged', JSON.stringify({
          login:true,
          loginType: 'facebook',
          token:response.accessToken,
          email: response.email,
          name: response.name,
        }));
        // console.log(googleResponse);
        console.log(response);
        handleClose();
        window.location.reload()

      }
      

      
    const responseGoogle = async(response) => {
        // let googleResponse  = await googleLogin(response.accessToken)

        axios({
          method: 'post',
          url : 'https://upstage.codflaw.com/api-v1/voter-create/',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: JSON.stringify({
            name: response.profileObj.name,
            email: response.profileObj.email,
            is_valid: true,
            source: 'from google'
          }) 
        }).then(res=> {
          console.log(res);
          console.log(res.data);
          // console.log(res.data['msg']);
          setMessage(res.data['msg'])
          setOpen(true)
          handleClose();
          window.location.reload();

        }).catch(error => {
          console.log(error);
        });


        localStorage.setItem('isUserLogged', JSON.stringify({
          login:true,
          loginType: 'google',
          token:response.accessToken,
          email: response.profileObj.email,
          name: response.profileObj.name,
        }));
        // console.log(googleResponse);
 
        // console.log(response);
        // console.log(response.profileObj.email);
        // handleClose();

      }
  
    const fresponseGoogle = async(response) => {
        console.log(response);
      }

    
    return(
        <>
        <Button variant="primary" onClick={handleShow}>
          {props.btn}
        </Button>

        <Snackbar open={open} autoHideDuration={time} onClose={close}>
          <Alert onClose={close} severity="success">
            {message}
          </Alert>
        </Snackbar>
        
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
                {/* <Row> */}
                  {/* <Form onSubmit={handleSubmit}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)}/>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}/>
                  <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                  </Form.Text>
                  <Button variant="primary" type="submit">
                      Submit
                  </Button>
                  </Form> */}
                
                {/* <div className="text-center">
                    <Button>LOGIN WITH EMAIL</Button>
                </div><br /> */}
                <div className="text-center">
                    <GoogleLogin
                    clientId="17134391804-9ofvalms637k71u7s45gl4i21o1sjp6j.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={responseGoogle}
                    onFailure={fresponseGoogle}
                    />
                </div><br />
                <div className="text-center">
                    {/* <FacebookLogin
                    appId="296526531782242"
                    fields="name,email,picture"
                    callback={responseFacebook}
                    /> */}
                </div><br />
                
               
                {/* </Row> */}
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <div className="">
              <a href="#">Terms of Service</a> and 
              <a href="#"> Privacy Policy</a>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
}