import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
    } from 'react-router-dom';

import { CookiesProvider } from 'react-cookie';

import Loading from './components/template/loading.jsx'
import NavBar from './components/template/navBar.jsx';
import Footer from './components/template/footer.jsx';

// Import miscellaneous routes and other requirements
import NotFound from './components/pages/notFound.jsx';

// Import static pages
import Home from './components/pages/home.jsx';

// Import authentication related pages
import Register from './components/auth/register.jsx';
import Login from './components/auth/login.jsx';
import Logout from './components/auth/logout.jsx';
import ForgotPassword from './components/auth/forgotPassword';
import ResetPassword from './components/auth/resetPassword';

// Import poll pages
import Polls from './components/poll/polls.jsx';
import MyPolls from './components/poll/myPolls.jsx'
import NewPoll from './components/poll/newPoll.jsx';
import ViewPoll from './components/poll/viewPoll.jsx';

// Import higher order components
import RequireAuth from './components/auth/requireAuth.jsx';

import './css/master.css';

class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <Router>
                    <div className="App">
                        <Loading/>
                        <NavBar/>
                        <div className="container main-container hidden-container">
                            <Switch>
                                <Route exact path="/" component={Home} />

                                <Route path="/register" component={Register} />
                                <Route path="/login" component={Login} />
                                <Route path="/logout" component={Logout} />
                                <Route path="/forgot-password" component={ForgotPassword} />
                                <Route path="/reset-password/:resetToken" component={ResetPassword} />

                                <Route path="/polls" component={Polls} />
                                <Route path="/my-polls" component={RequireAuth(MyPolls)} />
                                <Route path="/poll/new" component={RequireAuth(NewPoll)} />
                                <Route path="/poll/:pollId" component={ViewPoll} />

                                <Route component={NotFound} />
                            </Switch>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </CookiesProvider>
        );
    }
}

export default App;
