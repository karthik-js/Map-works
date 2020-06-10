import React, {createContext} from 'react';
import {auth, generateUserDocument} from 'firebase-utils';
export const UserContext = createContext({user: null});

class UserProvider extends React.Component {
    state = {
        user: null,
    };
    componentDidMount = async () => {
        auth.onAuthStateChanged(async (userAuth) => {
            const user = await generateUserDocument(userAuth);
            this.setState({user});
            if (user) {
                localStorage.setItem('isLoggedIn', true);
            } else {
                localStorage.setItem('isLoggedIn', false);
            }
        });
    };
    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;
