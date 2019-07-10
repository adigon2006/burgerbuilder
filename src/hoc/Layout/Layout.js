import React, {Component} from 'react';
import Auxilliary from '../Auxilliary/Auxilliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component {

 state = {
   showSideDrawer:false
 }
  sideDrawerCloseHandler = () =>
  {
  this.setState({showSideDrawer:false});
  }

  menuToggleHandler = () =>
  {
  this.setState((prevState)=>{
    return {showSideDrawer:!this.state.showSideDrawer}
  } );
  }
  render(){
    return (<Auxilliary>
    <Toolbar isAuth={this.props.isAuthenticated} 
    menuToggleClicked={this.menuToggleHandler}/>
    <SideDrawer 
    isAuth={this.props.isAuthenticated} 
    open={this.state.showSideDrawer}
      closed={this.sideDrawerCloseHandler}/>
    <main className = {classes.Content}>
    {this.props.children}
    </main>

    </Auxilliary>)
  }
}

const mapStateToProps = state => {
  return {
   isAuthenticated: state.auth.token !== null 
  }
}

export default connect(mapStateToProps)(Layout);
