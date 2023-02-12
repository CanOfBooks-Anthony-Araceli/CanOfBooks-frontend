import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import Profile from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <nav>
           <Link to="/">Home</Link>
           <Link to="/about">About</Link>
          </nav>
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks />}
            />
             <Route 
              path="/about"
              element={<Profile />}
            />

          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
