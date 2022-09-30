import { Switch, Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import firebase from './service/firebase';
import Sidebar from 'components/Sidebar';
import Login from 'components/Login';
import Dashboard from 'pages/Dashboard';
import Footer from 'components/Footer';

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setUser(user);
            console.log(user);
            // stor JWT in local storage
            if (user) {
                user.getIdToken().then(token => {
                    localStorage.setItem('token', token);
                }
                )
            }
        })
    }, [])
    return (
        <>
            <Sidebar />
            <div className="md:ml-64">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </div>
        </>
    );
}

export default App;
