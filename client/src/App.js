import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Login from './screens/Login';
import About from './screens/About';
import Home from './screens/Home';
import Sidebar from "./components/Sidebar";
import Approved from "./screens/Approved";
import Credits from "./screens/Credits";
import Credit from "./screens/Credit";
import Companies from "./screens/Companies";
import { LOGOUT } from './actions/types';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

function App() {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/home" element={<PrivateRoute component={Home} />}/>
      <Route path="/companies" element={<Companies/>}/>
      <Route path="/credits" element={<Credits/>}/>
      <Route path="/credits/:id" element={<Credit/>}/>
      <Route path="/approved" element={<Approved/>}/>
    </Routes>
  </BrowserRouter>
  </Provider>
  );
}

export default App;
