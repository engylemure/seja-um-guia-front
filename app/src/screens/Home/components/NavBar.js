import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ChuckInfo from './../../../components/ChuckInfo';
import chuckLogo from './../../../assets/chuck-logo.png';
import gitLogo from './../../../assets/git-logo.png';
import './../style/NavBar.css';
import PropTypes from 'prop-types';

const NavBar = ({ categories, jokes }) => {
  return (
    <div className={'Root-div'}>
      <AppBar position="static" color="secondary">
        <Toolbar className={'Toolbar'}>
          <div>
            <img src={chuckLogo} className="Logo" alt="logo" />
          </div>
          <div className={'Toolbar-left-container'}>
            {/* <CategoriesMenu categories={categories} jokes={jokes}/> */}
            <a href={'https://github.com/engylemure/seja-um-guia-front'}>
              <img src={gitLogo} alt="git-logo" className={'Git-Logo'} />
            </a>
            <ChuckInfo />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  categories: PropTypes.array.isRequired,
  jokes: PropTypes.object.isRequired
};

export default NavBar;
