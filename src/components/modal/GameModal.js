import React, {useState, useEffect} from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ReactPlayer from 'react-player/youtube'


export default function GameModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ isLogin, setIsLogin]  = useState(false);
    const [ email, setEmail]  = useState();

    const data = [{p1:'Team A', p1_url:'https://www.youtube.com/watch?v=ysz5S6PUM-U', p1_id:1}];

    console.log(data.map((dt) => dt.p1_url));


    function handleVoteSubmitForP2(){
      alert('Vote P2');
      // fetch('http://127.0.0.1:8000/api-v1/vote-register/', {
      fetch('https://upstage.codflaw.com/api-v1/vote-register/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game: '1',
          voted_for: '#2 Team B',
          email: email,
          is_valid: true,
          source: 'from google'
        })
      }) 
      
    }

    function handleVoteSubmitForP1(){
      alert('Vote P1');
      // fetch('http://127.0.0.1:8000/api-v1/vote-register/', {
      fetch('https://upstage.codflaw.com/api-v1/vote-register/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game: '1',
          voted_for: '#1 Team A',
          email: email,
          is_valid: true,
          source: 'from google'
        })
      }) 
      
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