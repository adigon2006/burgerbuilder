import React from 'react';
import classes from './MenuToggle.css';
const menuToggle = (props) =>
(
<div onClick={props.clicked} className={classes.Menu}>
<div></div>
<div></div>
<div></div>
</div>
);

export default menuToggle;
