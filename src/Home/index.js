import React, {useState, memo} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Locations from './Locations';
import Map from './map-utils/MapContainer';
import {auth} from 'firebase-utils';
import {MapsWrapper} from './styles';
import AddLocation from './AddLocation';
import usePosition from 'providers/UsePosition';

const Home = () => {
    const currPos = usePosition();
    const [show, setShow] = useState(false);

    const handleSignout = () => {
        auth.signOut();
        localStorage.setItem('isLoggedIn', false);
    };

    const handleShowModal = () => setShow(true);

    return (
        <>
            <Navbar bg='primary' variant='dark'>
                <Navbar.Brand>Favourite Locations</Navbar.Brand>
                <Nav className='mr-auto' />
                <Button variant='outline-light' onClick={handleSignout}>
                    Sign out
                </Button>
            </Navbar>
            <div className='p-3'>
                <ul className='nav justify-content-end'>
                    <li className='nav-item'>
                        <Button variant='primary' onClick={handleShowModal}>
                            Add Location
                        </Button>
                    </li>
                </ul>
                <hr />
                <div className='d-flex'>
                    <Locations />
                    <MapsWrapper>
                        <Map currPos={currPos} height='450px' />
                    </MapsWrapper>
                </div>
            </div>

            <AddLocation show={show} onHide={() => setShow(false)} />
        </>
    );
};

export default memo(Home);
