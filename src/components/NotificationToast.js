import { useState } from 'react'

import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'

export default function NotificationToast(props) {
    const [showA, setShowA] = useState(true);
  
    const toggleShowA = () => setShowA(!showA);
  
    return (
        <>
      <Row>
          <Toast show={showA} onClose={toggleShowA}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast> 
      </Row>
      <Row>
          <Button onClick={toggleShowA}>
            Toggle Toast <strong>with</strong> Animation
          </Button>
      </Row>
      </>
    );
  }
  