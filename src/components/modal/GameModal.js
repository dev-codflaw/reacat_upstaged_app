import React, {useState, useEffect} from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ReactPlayer from 'react-player/youtube'
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function GameModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ isLogin, setIsLogin]  = useState(false);
    const [ email, setEmail]  = useState();

    const [open, setOpen] = React.useState(false);
    const time = 6000;
    const close = () => setOpen(false)
    const [message, setMessage] = React.useState("")

    const data = [{p1:'Team A', p1_url:'https://www.youtube.com/watch?v=ysz5S6PUM-U', p1_id:1}];

    console.log(data.map((dt) => dt.p1_url));


    function handleVoteSubmitForP2(){
      // alert('Vote P2');
      axios({
        method: 'post',
        url : 'https://upstage.codflaw.com/api-v1/vote-register/',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
        data: JSON.stringify({
          game: '1',
          voted_for: '#2 Team B',
          email : email,
        }) 
      }).then(res=> {
        console.log(res);
        console.log(res.data);
        // console.log(res.data['msg']);
        setMessage(res.data['msg'])
        setOpen(true)
        handleClose();
        // window.location.reload();

      }).catch(error => {
        console.log(error);
      });
      
    }

    function handleVoteSubmitForP1(){
      // alert('Vote P1');
      axios({
        method: 'post',
        url : 'https://upstage.codflaw.com/api-v1/vote-register/',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
        data: JSON.stringify({
          game: '1',
          voted_for: '#1 Team A',
          email : email,
        }) 
      }).then(res=> {
        console.log(res);
        console.log(res.data);
        // console.log(res.data['msg']);
        setMessage(res.data['msg'])
        setOpen(true)
        handleClose();
        // window.location.reload();

      }).catch(error => {
        console.log(error);
      });

    }

    useEffect(() => {
      const user_data = JSON.parse(localStorage.getItem('isUserLogged'));
      if(user_data && user_data.login){
        setIsLogin(user_data.login);
        setEmail(user_data.email);
      }

    });

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
            <Modal.Title>Game #1</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Container>
              
          <Row>
            <Col xs={5} md={5}>
              <ReactPlayer 
                className ="react-player" 
                url={data.map((dt) => dt.p1_url)}
                width='100%'
                height='70%'
              />
              Team A <br />
              <button onClick={handleVoteSubmitForP1}>
                Vote
              </button>
            </Col>
            <Col md={2}>
              <div className="text-center">
                <h1>VS</h1>
              </div>
            </Col>
            <Col xs={5} md={5}>
              <ReactPlayer 
                className ="react-player" 
                url='https://www.youtube.com/watch?v=ysz5S6PUM-U' 
                width='100%'
                height='70%'
              />
              Team B  <br />
              <button onClick={handleVoteSubmitForP2}>
                Vote
              </button>
            </Col>
          </Row>
        </Container>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
            {/* <Button variant="primary">Understood</Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
}