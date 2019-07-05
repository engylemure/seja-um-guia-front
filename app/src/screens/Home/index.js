import React from 'react';
import NavBar from '../../components/NavBar';
import CategoryGrid from './components/CategoryGrid';
import './../../style/Home.css';

const Home = () => (
  <div>
    <NavBar>
    </NavBar>
    <div className="App">
      <CategoryGrid />
    </div>
  </div>
);

export default Home;
