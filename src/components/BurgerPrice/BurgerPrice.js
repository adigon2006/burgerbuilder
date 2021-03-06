import React from 'react';
import classes from './BurgerPrice.css';

const burgerPrice  = (props) => (
<div className={classes.Price}>
{props.label}: {props.price.toFixed(2)}
</div>
);


export default burgerPrice;
