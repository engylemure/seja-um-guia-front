import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import ChuckInfo from './ChuckInfo';
import chuckLogo from './../assets/chuck-logo.png';
import gitLogo from './../assets/git-logo.png';
import './../style/NavBar.css';

const NavBar = ({ children }) => {
  return (
    <div className={'Root-div'}>
      <AppBar position="static" color="secondary">
        <Toolbar className={'Toolbar'}>
          <div>
            <img src={chuckLogo} className="Logo" alt="logo" />
          </div>
          <div className={'Toolbar-left-container'}>
            { children }
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

export default NavBar;
