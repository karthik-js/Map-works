import React, {useContext} from 'react';
import Home from 'Home';
import Authentication from 'Authentication';
import './App.css';
import {UserContext} from 'providers/UserProvider';

function App() {
    const user = useContext(UserContext);
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return (
        <div className='App h-100'>
            {isLoggedIn === 'true' || user ? (
                <Home />
            ) : (
                !user && <Authentication />
            )}
        </div>
    );
}

export default App;
