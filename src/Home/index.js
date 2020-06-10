import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import {auth} from 'firebase-utils';

const Home = () => {
    const handleSignout = () => {
        auth.signOut();
        localStorage.setItem('isLoggedIn', false)
    }
    return (
        <div>
            <Navbar bg='primary' variant='dark'>
                <Navbar.Brand href='#home'>Favourite Locations</Navbar.Brand>
                <Nav className='mr-auto' />
                <Button variant='outline-light' onClick={handleSignout}>
                    Sign out
                </Button>
            </Navbar>
        </div>
    );
};

export default Home;
