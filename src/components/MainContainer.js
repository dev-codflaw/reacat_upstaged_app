import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from './card/TournamentCard'
import GameModal from './modal/GameModal'
import LoginModal from './modal/LoginModal'
// import { useState } from 'react'


export default function MainContainer(props){   

    function CheckLoggedIn(props) {
        const user_data = JSON.parse(localStorage.getItem('isUserLogged'));
        if(user_data && user_data.login){
            return <GameModal btn={'Vote'}/>;
        }
        return <LoginModal btn={'Vote'}/>;
      }

    return (
        <>
            <Container>
                <Row>
                        <Card 
                        name="Tournament Name"
                        description="UpStagedAID One World Every Student Voice COLLEGE A CAPPELLA CHAMPIONSHIPS"
                        linkText="View"
                        />
                </Row>
                < CheckLoggedIn />
            </Container>

        </>
    );
  }


