import React, {Component} from 'react';
import classes from './Modal.css';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';
class Modal extends Component{


  shouldComponentUpdate(nextProps,nextState)
  {
   return nextProps.show !== this.props.show
  }
  componentWillUpdate()
  {
    console.log("[componentWillUpdate] Modal")
  }
  render()
  {
    return(
      <Auxilliary>
      <Backdrop show={this.props.show} clicked={this.props.removeModal}/>
      <div
      style={{
      transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
      opacity: this.props.show ? '1' : '0'
      }}
      className={classes.Modal}>
      {this.props.children}

      </div>
      </Auxilliary>
    );
  }

}
export default Modal;
