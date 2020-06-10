import React, {useState, useCallback} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

import {auth} from 'firebase-utils';

const Signin = ({setVal}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);

    const handleChange = useCallback((event) => {
        const {name, value} = event.target;
        if (name === 'email') {
            setEmail(value);
        }
        if (name === 'pass') {
            setPass(value);
        }
    }, []);
    const handleSignin = (event) => {
        event.preventDefault();
        console.log(email, pass);
        auth.signInWithEmailAndPassword(email, pass)
            .then((val) => console.log(val))
            .catch((error) => {
                setError('Error signing in with password and email!');
                console.error(
                    'Error signing in with password and email',
                    error
                );
            });
    };
    return (
        <div className='h-100 d-flex flex-column justify-content-center align-items-center'>
            <Form className='w-75' onSubmit={handleSignin}>
                <div className='text-center' style={{fontSize: 24}}>
                    Login to Continue
                </div>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type='email'
                        name='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={handleChange}
                    />
                    <Form.Text className='text-muted'>
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        name='pass'
                        placeholder='Password'
                        value={pass}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
                <hr />
            </Form>
            <div className='d-flex align-items-center'>
                Don't Have an account?
                <Button variant='link' onClick={() => setVal(true)}>
                    Signup
                </Button>
            </div>
            <>
                <Toast
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                    show={error}
                >
                    <Toast.Body>
                        Error Signing up with email and password
                    </Toast.Body>
                </Toast>
            </>
        </div>
    );
};

export default Signin;
