import React from 'react';
import Auxilliary from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';
import BurgerPrice from '../../BurgerPrice/BurgerPrice';
const orderSummary = (props) =>
{
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey =>{
    return <li key={igKey}>
    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
    </li>
  });
  return(<Auxilliary>

<h3>Your Order</h3>
<p>A delicious Burger with the following ingredients:<
/p>
<ul>
{ingredientSummary}
</ul>
<BurgerPrice label={props.label} price={props.price}/>
<p>Continue to Checkout?</p>
<Button
clicked={props.purchaseCancelled}
  btnType="Danger">Cancel</Button>
<Button btnType="Success"
  clicked={props.purchaseContinued}>
Continue
</Button>
  </Auxilliary>);

}

export default orderSummary
