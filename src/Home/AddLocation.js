import React, {useState, useCallback} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Maps from './map-utils/MapContainer';
import FormControl from 'react-bootstrap/FormControl';
import {addLocation} from 'firebase-utils';

const AddLocation = ({onHide, ...props}) => {
    const [marker, setMarker] = useState(null);
    const [name, setname] = useState('');
    const [desc, setDesc] = useState('');
    const [error, setError] = useState(false);

    const handleChange = useCallback((event) => {
        const {name, value} = event.target;
        if (name === 'name') {
            setname(value);
        }
        if (name === 'desc') {
            setDesc(value);
        }
    }, []);

    const handleMapClick = useCallback((event) => {
        setMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    }, []);

    const handleClose = () => {
        onHide();
        setname('');
        setDesc('');
    };

    const handleAddLocation = () => {
        if (name && desc && marker) {
            console.log('add');
            addLocation({...marker, name, description: desc});
            onHide();
        } else {
            setError(true);
        }
    };

    return (
        <Modal
            {...props}
            size='lg'
            aria-labelledby='addLocation-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id='addLocation-modal-title-vcenter'>
                    Add Location
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='show-grid'>
                <Container>
                    <Row>
                        <Col xs={12} md={4}>
                            <Form.Group controlId='formBasicName'>
                                <Form.Label>Name*</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='name'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId='formBasicDesc'>
                                <Form.Label>Description*</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows='3'
                                    name='desc'
                                    placeholder='Description'
                                    value={desc}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {error && (
                                <FormControl.Feedback
                                    type='invalid'
                                    className='d-block'
                                >
                                    Required fields are not added
                                </FormControl.Feedback>
                            )}
                        </Col>
                        <Col xs={12} md={8}>
                            <Maps
                                height='300px'
                                onMapClick={handleMapClick}
                                markers={[marker].filter(Boolean)}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddLocation}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddLocation;
