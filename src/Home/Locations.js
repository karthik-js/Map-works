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
                        ({name, description, lat, lng, active}) => {
                            return (
                                <Card >
                                    <Card.Body>
                                        <Card.Title>{name}</Card.Title>
                                        <Card.Text>{description}</Card.Text>
                                        <Card.Text>lat: {lat}</Card.Text>
                                        <Card.Text>long: {lng}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant='primary' className="float-right">View</Button>
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
