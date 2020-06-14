import React, {useState, useEffect, useRef, memo} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Locations from './Locations';
import Map from './map-utils/MapContainer';
import {auth} from 'firebase-utils';
import {MapsWrapper} from './styles';
import AddLocation from './AddLocation';
import usePosition from 'providers/UsePosition';
import {getLocations} from 'firebase-utils';

const Home = () => {
    const currPos = usePosition();
    const [locations, setLocations] = useState([]);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        loadLocations();
    }, []);

    const loadLocations = async () => {
        const loc = await getLocations();
        setLocations(
            loc.map((location) => ({
                ...location,
                active: false,
            }))
        );
    };

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
                    <Locations
                        locations={locations}
                        loadLocations={loadLocations}
                        setSelected={setSelected}
                    />
                    <MapsWrapper>
                        <Map
                            currPos={currPos}
                            markers={locations}
                            height='450px'
                            favLocation={selected}
                        />
                    </MapsWrapper>
                </div>
            </div>

            <AddLocation show={show} onHide={() => setShow(false)} />
        </>
    );
};

export default memo(Home);
