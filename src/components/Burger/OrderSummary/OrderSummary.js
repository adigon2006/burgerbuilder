import React, {Component} from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';
import BurgerPrice from '../../BurgerPrice/BurgerPrice';
class OrderSummary extends Component
{

// this could be a functional component does no have to be a class

// not required
  // componentWillUpdate()
  // {
  //   console.log('[OrderSummary] WillUpdate');
  // }

  render()

  {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey =>{
      return <li key={igKey}>
      <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
      </li>
    });

    return(
  <Auxilliary>

  <h3>Your Order</h3>
  <p>A delicious Burger with the following ingredients:</p>
  <ul>
  {ingredientSummary}
  </ul>
  <BurgerPrice label={this.props.label} price={this.props.price}/>
  <p>Continue to Checkout?</p>
  <Button
  clicked={this.props.purchaseCancelled}
    btnType="Danger">Cancel</Button>
  <Button btnType="Success"
    clicked={this.props.purchaseContinued}>
  Continue
  </Button>
    </Auxilliary>
  );
  }
}

export default OrderSummary
