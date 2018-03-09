import React from 'react';
import classes from './BurgerPrice.css';

const burgerPrice  = (props) => (
<div className={classes.Price}>
Current Price: {props.price.toFixed(2)}
</div>
);


export default burgerPrice;
