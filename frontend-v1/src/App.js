import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom"
import MainComponent from './components/MainComponent';
import OtherPage from './components/OtherPage';

function App() {
  return (
    <Router>
      <Fragment>
        <header className='header'>
          <div>Multicontainer application</div>
          <Link to="/">Home</Link>
          <Link to="/otherpage">OtherPage</Link>
        </header>
      </Fragment>
      <div>
        <Routes>
          <Route exact path='/' element={<MainComponent />} />
          <Route path='/otherpage' element={<OtherPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
