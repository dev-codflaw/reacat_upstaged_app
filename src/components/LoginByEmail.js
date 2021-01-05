import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function LoginByEmail(props){    
    // const isLogin = React.useRef(null);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState(null);



    const handleSubmit = e => {
        e.preventDefault();
        if(name.length > 0 && email.length > 0){
            // alert(`Submitting Name ${name}`)
            // alert(`Submitting Email ${email}`)
            const data = {
                name: name,
                email: email,
                isLogin: 'true',
                loginType: 'email'
            }
            localStorage.setItem('loggedIn', JSON.stringify(data));
        }
        else{
            setError('Please enter your name and email');
            alert(error);
            alert(JSON.stringify(props));
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
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
            </Form>
        </>
    );
  }



