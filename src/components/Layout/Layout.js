import React from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import classes from './Layout.css';
const layout = (props) => (
  <Auxilliary>
  <div>Toolbar, SideDrawer, BackDrop</div>
  <main className = {classes.Content}>
  {props.children}
  </main>
  <BurgerBuilder />
  </Auxilliary>
);


export default layout;
