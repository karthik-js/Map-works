import React, {useEffect, useRef} from 'react';
import {getLocations} from 'firebase-utils';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {LocationWrapper} from './styles';

const Locations = () => {
    const locations = useRef();

    useEffect(() => {
        loadLocations();
    }, []);

    const loadLocations = async () => {
        const loc = await getLocations();
        locations.current = loc.map((location) => ({
            ...location,
            active: false,
        }));
    };

    console.log(locations);
    return (
        <LocationWrapper>
            <CardColumns>
                {locations.current &&
                    locations.current.map(
                        ({name, description, lat, lng, active}, index) => {
                            return (
                                <Card key={index} border={active && 'primary'}>
                                    <Card.Body>
                                        <Card.Title>{name}</Card.Title>
                                        <Card.Text>{description}</Card.Text>
                                        <Card.Text>lat: {parseFloat(lat).toFixed(3)}</Card.Text>
                                        <Card.Text>lng: {parseFloat(lng).toFixed(3)}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className='p-0'>
                                        <Button
                                            variant='primary'
                                            className='float-right m-2'
                                        >
                                            View
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            );
                        }
                    )}
            </CardColumns>
        </LocationWrapper>
    );
};

export default Locations;
