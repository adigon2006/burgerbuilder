import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
// import {NavLink} from 'react-router-dom';
const navigationItems = (props) => (

<ul className={classes.NavigationItems}>
<NavigationItem link="/" exact>Burger Builder</NavigationItem>
{/* <NavigationItem link="/checkout"> Checkout</NavigationItem> */}
{
props.isAuthenticated ?    
<NavigationItem link="/orders"> Orders</NavigationItem> : null}
{
!props.isAuthenticated 
? <NavigationItem link="/auth">Authenticate</NavigationItem> : 
<NavigationItem link="/logout" >Log Out</NavigationItem>
}
</ul>

);

export default navigationItems;
