import React, {useState, useCallback} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

import {auth, generateUserDocument} from 'firebase-utils';

const Signup = ({setVal}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [dispName, setName] = useState('');
    const [error, setError] = useState(false);

    const handleChange = useCallback((event) => {
        const {name, value = ''} = event.target;
        if (name === 'email') {
            setEmail(value.trim());
        }
        if (name === 'pass') {
            setPass(value.trim());
        }
        if (name === 'dispName') {
            setName(value.trim());
        }
    }, []);
    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const {user} = await auth.createUserWithEmailAndPassword(
                email,
                pass
            );
            generateUserDocument(user, {displayName: dispName});
        } catch (error) {
            setError('Error Signing up with email and password');
        }

        setEmail('');
        setPass('');
        setName('');
        setVal(false);
    };
    return (
        <div className='h-100 d-flex flex-column justify-content-center align-items-center'>
            <Form className='w-75' onSubmit={handleRegister}>
                <div className='text-center' style={{fontSize: 24}}>
                    Register
                </div>
                <Form.Group controlId='formBasicName'>
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control
                        type='text'
                        name='dispName'
                        placeholder='Enter your name'
                        value={dispName}
                        onChange={handleChange}
                    />
                </Form.Group>

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
                    Register
                </Button>
                <hr />
            </Form>
            <div className='d-flex align-items-center'>
                Have an account?
                <Button variant='link' onClick={() => setVal(false)}>
                    Login
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

export default Signup;
