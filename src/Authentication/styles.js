import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Background from 'images/bg-01.jpg';

export const AuthBackground = styled(Col)`
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 1;
`;
