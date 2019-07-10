import React from 'react'
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import BurgerPrice from  '../../../components/BurgerPrice/BurgerPrice';
const controls = [
  {label: 'Salad', type:'salad'},
  {label: 'Bacon', type:'bacon'},
  {label: 'Cheese', type:'cheese'},
  {label: 'Meat', type:'meat'},
];
const buildControls = (props) =>
  (
   <div className={classes.BuildControls}>
   <BurgerPrice label={props.label} price={props.price} />
    {controls.map( control => (
      <BuildControl
      removed ={() => props.ingredientRemoved(control.type)}
      key={control.label}
      label={control.label}
      added={() => props.ingredientAdded(control.type)}
      disabled={props.disabled[control.type]}
      />
    ))}
    <button onClick={props.ordered}
    disabled={!props.purchaseable}
    className={classes.OrderButton}>
      {
      props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
      </button>
   </div>
  );


  export default buildControls;
