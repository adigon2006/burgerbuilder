import React from 'react';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Auxilliary from '../../../hoc/Auxilliary';
const sideDrawer = (props) => {
let attachedClasses = [classes.SideDrawer, classes.Close];
if(props.open)
{
attachedClasses = [classes.SideDrawer, classes.Open];
}
return(
 <Auxilliary>
  <BackDrop show={props.open} clicked={props.closed}/>
  <div className={attachedClasses.join(" ")}>
  <div className={classes.Logo}>
  <Logo />
  </div>
  <nav>
 <NavigationItems />
  </nav>
  </div>
  </Auxilliary>
);

}

export default sideDrawer;
