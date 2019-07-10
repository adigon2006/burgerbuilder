import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import  MenuToggle from '../SideDrawer/MenuToggle/MenuToggle';
const toolbar = (props) => (
  <header className={classes.Toolbar}>
  <MenuToggle clicked={props.menuToggleClicked} />
  <div className={classes.Logo}>
<Logo />
</div>

  <nav className={classes.DesktopOnly}>
  <NavigationItems 
  isAuthenticated={props.isAuth}
  />
  </nav>
  </header>

);


export default toolbar;
