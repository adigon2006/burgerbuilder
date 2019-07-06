import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

// import {Link} from 'react-router-dom';

class BurgerBuilder extends Component {

// constructor(props)
// {
//   super(props);
//   this.
// }

state = {
  purchasing:false
}

componentDidMount(){
 // console.log(this.props.onInitIngredient());
this.props.onInitIngredient();
 //console.log(this.props.onInitIngredient());
//console.log(this.props.ings);
//  axios.get('https://adigs-burger-project.firebaseio.com/ingredients.json')
//  .then(response => {
//    console.log(response.data); 
//    //dispatch(setIngredients(response.data));
//    }).catch(error => {
//      //dispatch(fetchIngredientsFailed());  
//    });

}

updatePurchasedState (ingredients) {

  const sum = Object.keys(ingredients)
  .map(igKey => {
    return ingredients[igKey]
  }).reduce((sum, el) => {
    return sum + el;
  },0);
  return sum > 0;
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


purchaseCancelHandler = () => {
  this.setState({purchasing:false});
}

purchaseContinuehandler = () =>{
//  alert('You are continuing');


// parse the data to the checkout page
// const queryParams = [];
// for(let j in this.props.ings)
// {
// queryParams.push(encodeURIComponent(j) + "=" + encodeURIComponent(this.props.ings[j]));  
// }
// queryParams.push('price='+this.state.totalPrice)
// const queryString = queryParams.join('&');
// this.props.history.push({
//   pathname: "/checkout",
//   search: '?' + queryString
// });
this.props.onInitPurchase();
this.props.history.push('/checkout');
}

purchaseHandler = () => {
this.setState({purchasing:true});
}

render()
{
const disabledInfo = {
  ...this.props.ings
};
for (let key in disabledInfo)
{
  disabledInfo[key] = disabledInfo[key] <= 0;
}
let orderSummary = null;
let burger = this.props.error ? <p>Ingredients can be loaded</p> : <Spinner />;
if(this.props.ings)
{
  burger = (
  <Auxilliary>
    <Burger ingredients={this.props.ings }/>
  <BuildControls ingredientAdded={this.props.onIngredientAdded}
  ingredientRemoved={this.props.onIngredientRemoved}
  disabled={disabledInfo}
  label="Current Price"
   purchaseable={this.updatePurchasedState(this.props.ings)}
   price={this.props.price}
   ordered={this.purchaseHandler}
  />
  </Auxilliary>
  );
  orderSummary = <OrderSummary
  purchaseCancelled =
  {this.purchaseCancelHandler}
  purchaseContinued = {this.purchaseContinuehandler}
  price={this.props.price}
  label="Order Total"
    ingredients={this.props.ings} />

}
// if(this.state.loading)
// {
// orderSummary = <Spinner />;
// }
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

const mapStateToProps = state => {

  return{
     ings: state.burgerBuilder.ingredients,
     price: state.burgerBuilder.totalPrice,
     error: state.burgerBuilder.error
  };

}

const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved:(ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
