import React from 'react';
import { AppContextProvider } from './context/AppContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Events from './pages/Events';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Messaging from './pages/Messaging';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';
import Welcome from './pages/Welcome';
import UserEditPage from './pages/EditUser';
import PortfolioEditPage from './pages/EditPortfolio';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Images from './pages/Images';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/events" component={Events} />
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/jobs" component={Jobs} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/gallery/images/:id" component={Images} />
          <PrivateRoute exact path="/messages/:id" component={Messaging} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/update-password" component={UpdatePassword} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/user-edit-page" component={UserEditPage} />
          <Route exact path="/portfolio-edit" component={PortfolioEditPage} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
