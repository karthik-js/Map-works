import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Signin from './Signin';
import Signup from './Signup';
import {AuthBackground} from './styles';

const Authentication = () => {
    const [isSignUp, setVal] = useState(false);
    return (
        <Container fluid className='h-100'>
            <Row className='h-100'>
                <AuthBackground className='d-none d-sm-block' sm={7} />
                <Col sm={5}>{isSignUp ? <Signup setVal={setVal} /> : <Signin setVal={setVal} />}</Col>
            </Row>
        </Container>
    );
};

export default Authentication;
