import React, {useState} from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {LocationWrapper} from './styles';

const Locations = ({
    locations,
    loadLocations: reloadLocations,
    setSelected,
}) => {
    return (
        <LocationWrapper className="d-block">
            <Button className="mb-2" variant="primary" onClick={reloadLocations}>Refresh</Button>
            <CardColumns>
                {locations &&
                    locations.map((location, index) => {
                        const {name, description, lat, lng, active} = location;
                        return (
                            <Card key={index} border={active && 'primary'}>
                                <Card.Body>
                                    <Card.Title>{name}</Card.Title>
                                    <Card.Text>{description}</Card.Text>
                                    <Card.Text>
                                        lat: {parseFloat(lat).toFixed(3)}
                                    </Card.Text>
                                    <Card.Text>
                                        lng: {parseFloat(lng).toFixed(3)}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className='p-0'>
                                    <Button
                                        variant='primary'
                                        className='float-right m-2'
                                        onClick={() => setSelected(location)}
                                    >
                                        View
                                    </Button>
                                </Card.Footer>
                            </Card>
                        );
                    })}
            </CardColumns>
        </LocationWrapper>
    );
};

export default Locations;
