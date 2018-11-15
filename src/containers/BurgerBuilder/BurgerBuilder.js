import React, {Component} from 'react';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import {Link} from 'react-router-dom';
const INGREDIENT_PRICES =
{
salad: 0.5,
cheese: 0.4,
meat: 1.3,
bacon:0.7
};
class BurgerBuilder extends Component {

// constructor(props)
// {
//   super(props);
//   this.
// }

state = {
  ingredients :null,
  totalPrice:4,
  purchaseable:false,
  purchasing:false,
  loading:false,
  error:false
}

componentDidMount(){
  console.log(this.props);
  axios.get('https://adigs-burger-project.firebaseio.com/ingredients.json')
  .then(response => {
  this.setState({ingredients:response.data}) ;
}).catch(error => {this.setState({error:true})});
}

updatePurchasedState (ingredients) {

  const sum = Object.keys(ingredients)
  .map(igKey => {
    return ingredients[igKey]
  }).reduce((sum, el) => {
    return sum + el;
  },0);
  this.setState({purchaseable: sum > 0});
}
removeIngredientHandler = (type) =>
{
const oldCount = this.state.ingredients[type];
let updateCounted = 0;
if(oldCount !== 0)
{
updateCounted = oldCount - 1;
const updateIngredients = {
...this.state.ingredients
};
updateIngredients[type] = updateCounted;
const priceAddition = INGREDIENT_PRICES[type];
const oldPrice = this.state.totalPrice;
const newPrice = oldPrice - priceAddition;
this.setState({totalPrice: newPrice, ingredients:updateIngredients});
this.updatePurchasedState(updateIngredients);
//this.removeModalHandler(updateIngredients);
}
}


removeModalHandler = (ingredients) => {
const updatedIngredients =  Object.keys(ingredients).map(igKey =>{
return ingredients[igKey]
}).reduce((sum,el) => {
  return sum + el;
},0);
if(updatedIngredients <= 0)
{
  this.setState({purchasing:false})
}

}

removeModalHandler2 = () => {

  this.setState({purchasing:false})

}
addIngredientHandler = (type) =>
{
const oldCount = this.state.ingredients[type];
const updatedCount = oldCount + 1;

const updateIngredients = {
...this.state.ingredients
};

updateIngredients[type] = updatedCount;

const priceAddition = INGREDIENT_PRICES[type];
const oldPrice = this.state.totalPrice;
const newPrice = oldPrice + priceAddition;
this.setState({totalPrice: newPrice, ingredients:updateIngredients});
this.updatePurchasedState(updateIngredients);
}

purchaseCancelHandler = () => {
  this.setState({purchasing:false});
}

purchaseContinuehandler = () =>{
//  alert('You are continuing');


// parse the data to the checkout page
const queryParams = [];
for(let j in this.state.ingredients)
{
queryParams.push(encodeURIComponent(j) + "=" + encodeURIComponent(this.state.ingredients[j]));  
}
queryParams.push('price='+this.state.totalPrice)
const queryString = queryParams.join('&');
this.props.history.push({
  pathname: "/checkout",
  search: '?' + queryString
});


}

purchaseHandler = () => {
this.setState({purchasing:true});
}

render()
{
const disabledInfo = {
  ...this.state.ingredients
};
for (let key in disabledInfo)
{
  disabledInfo[key] = disabledInfo[key] <= 0;
}
let orderSummary = null;
let burger = this.state.error ? <p>Ingredients can be loaded</p> : <Spinner />;
if(this.state.ingredients)
{
  burger = (
  <Auxilliary>
    <Burger ingredients={this.state.ingredients}/>
  <BuildControls ingredientAdded={this.addIngredientHandler}
  ingredientRemoved={this.removeIngredientHandler}
  disabled={disabledInfo}
  label="Current Price"
   purchaseable={this.state.purchaseable}
   price={this.state.totalPrice}
   ordered={this.purchaseHandler}
  />
  </Auxilliary>
  );
  orderSummary = <OrderSummary
  purchaseCancelled =
  {this.purchaseCancelHandler}
  purchaseContinued = {this.purchaseContinuehandler}
  price={this.state.totalPrice}
  label="Order Total"
    ingredients={this.state.ingredients} />

}
if(this.state.loading)
{
orderSummary = <Spinner />;
}
return(
  <Auxilliary>

  <Modal show={this.state.purchasing}
  removeModal = {this.removeModalHandler2} >
  {orderSummary}
  </Modal>
  {burger}
  </Auxilliary>
);
}

}

export default withErrorHandler(BurgerBuilder, axios);
