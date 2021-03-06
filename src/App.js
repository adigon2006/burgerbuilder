import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckOut = asyncComponent(() => {
return import('./containers/Checkout/Checkout');
});

class App extends Component {

  componentDidMount(){
  this.props.onTryAutoSignIn();
  }
   render() {

    let routes = (
      <Switch>
      <Route path="/auth" component={Auth}/>
     <Route path="/" exact component={BurgerBuilder} />
     <Redirect to="/"/>
      </Switch>
      );

    if(this.props.isAuthenticated)
    {
      routes = (
        <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/checkout" component={asyncCheckOut}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/" exact component={BurgerBuilder} />
        </Switch>
        
      );
    }
    return (
     
      <div>
      <Layout>
       {/* <BurgerBuilder /> */}
       {/* <Checkout /> */}     
      {routes}
      </Layout>
      </div>
     
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
   onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
