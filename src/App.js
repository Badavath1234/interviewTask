import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './Component/Home/Home.component';
import Login from './Component/LogIn/Login.component';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (email) => {
    setUser({ email });
  };

  return (
    <Router>
      <div>
        <Route exact path="/">
          {user ? <Redirect to="/home" /> : <Login onLogin={handleLogin} />}
        </Route>

        <Route path="/home">
          {user ? <Home email={user.email} /> : <Redirect to="/" />}
        </Route>
      </div>
    </Router>
  );
}

export default App;
