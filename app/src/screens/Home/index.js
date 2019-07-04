import React from 'react';
import NavBar from '../../components/NavBar';
import CategoryGrid from './components/CategoryGrid';
import CategoriesMenu from './components/CategoriesMenu';
import './../../style/Home.css';

const Home = () => (
  <div>
    <NavBar>
      <CategoriesMenu/>
    </NavBar>
    <div className="App">
      <CategoryGrid />
    </div>
  </div>
);

export default Home;
