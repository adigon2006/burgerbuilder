import React, {Component} from 'react';
import Auxilliary from '../Auxilliary/Auxilliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
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
    <Toolbar menuToggleClicked={this.menuToggleHandler}/>
    <SideDrawer open={this.state.showSideDrawer}
      closed={this.sideDrawerCloseHandler}/>
    <main className = {classes.Content}>
    {this.props.children}
    </main>

    </Auxilliary>)
  }
}

export default Layout;
