import React , {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

class Auth extends Component{
state = {
    controls:{
        email:{
            elementType:"input",
            elementConfig:{
              type:'email',
              placeholder: 'Your Email' 
            },
            value: "",
            validation:{
              required: true,
              isEmail:true
            },
            valid:false,
            touched: false
          },
          password:{
            elementType:"input",
            elementConfig:{
              type:'password',
              placeholder: 'Your Password' 
            },
            value: "",
            validation:{
              required: true,
              minLength:8
            },
            valid:false,
            touched: false
          }
     
    },
    isSignUp:true

}

    componentDidMount(){
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/')
    {
    this.props.onSetAuthRedirectPath();    
    }
    }


    inputChangedHandler = (event,controlName) => {
        //console.log(this.checkValidity(event.target.value, this.state.controls[controlName].validation));
    //  const updatedControls = {
    //     ...this.state.controls,
    //     [controlName]:{
    //       ...this.state.controls[controlName],
    //       value: event.target.value,
    //       valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
    //       touched: true  
    //     } 
    //  };

      const updatedControls = updateObject(this.state.controls,{
        [controlName]: updateObject(this.state.controls[controlName],{
          value: event.target.value,
          valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
          touched: true 
        }) 
      });   

    this.setState({controls: updatedControls});

    }

    submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
    this.setState(prevState => {
    //console.log(prevState.isSignUp); 
    return{
     isSignUp: !prevState.isSignUp
     };   
    }) 
    }

    render(){
        let formELementsArray = [];
        for(let key in this.state.controls)
        {
        formELementsArray.push({
        id:key,
        config: this.state.controls[key]    
        })    
        }
        let form = 
        formELementsArray.map(formElement => (
        <Input 
        key={formElement.id}
        elementType = {formElement.config.elementType}
        elementConfig = {formElement.config.elementConfig}
        value = {formElement.config.value}
        invalid = {!formElement.config.valid}
        shouldValidate = {formElement.config.validation}
        touched = {formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event,formElement.id)}
        />    
        ));

        if(this.props.loading)
        {
         form = <Spinner />;
        }

        let errorMessage = null;
        if(this.props.error)
        {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        
        let authRedirect = null;
        if(this.props.isAuthenticated )
        {  
         authRedirect = <Redirect to={this.props.authRedirectPath} />    
        }

        return (
            
            <div className={classes.Auth}>
             {authRedirect}   
             {errorMessage}   
             <form onSubmit={this.submitHandler}>
             {form}   
             <Button  btnType="Success" //disabled={!this.state.formIsValid}
             >SUBMIT</Button>
             </form>
             <Button clicked={this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
return{
 loading:state.auth.loading,
 error: state.auth.error,
 isAuthenticated: state.auth.token !== null,
 buildingBurger: state.burgerBuilder.building,
 authRedirectPath: state.auth.authRedirectPath   
}
}

const mapDispatchToProps = dispatch  =>{
return{
onAuth:(email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
onSetAuthRedirectPath:() => dispatch(actions.setAuthRedirectPath('/'))    
}
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);