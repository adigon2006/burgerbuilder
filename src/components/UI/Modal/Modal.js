import React from 'react';
import classes from './Modal.css';
import Auxilliary from '../../../hoc/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';
const modal = (props) =>
(
<Auxilliary>
<Backdrop show={props.show} clicked={props.removeModal}/>
<div
style={{
transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
opacity: props.show ? '1' : '0'
}}
className={classes.Modal}>
{props.children}

</div>
</Auxilliary>
);

export default modal;
