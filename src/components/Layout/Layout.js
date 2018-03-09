import React from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
const layout = (props) => (
  <Auxilliary>
  <Toolbar />
  <main className = {classes.Content}>
  {props.children}
  </main>

  </Auxilliary>
);


export default layout;
