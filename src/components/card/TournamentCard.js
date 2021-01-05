import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import PlaceholderImg from '../../assets/images/placeholder-100x180.svg'

export default function TournamentCard(props){    
    return (
        <>
            <Card style={{ width: '70rem' }}>
            {/* <Card.Img variant="top" src={PlaceholderImg}/> */}
            <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
            {props.description}
            </Card.Text>
            {/* <Button variant="primary">{props.linkText}</Button> */}
            </Card.Body>
            </Card>
        </>
    );
  }
   


