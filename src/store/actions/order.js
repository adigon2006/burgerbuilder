import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id,orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
   return {
       type: actionTypes.PURCHASE_BURGER_FAIL,
       error: error
   } 
}

export const purchaseBurgerStart = () => {
 return{
     type: actionTypes.PURCHASE_BURGER_START
 }
}

export const purchaseInit = () => {
  return {
     type:actionTypes.PURCHASE_INIT
  }  
}

export const purchaseBurger = (orderData) => {
return dispatch => {
dispatch(purchaseBurgerStart());
    axios.post('/orders.json',orderData)
.then(response => {
console.log(response.data);    
dispatch(purchaseBurgerSuccess(response.data.name, orderData));
//   this.setState({loading:false,purchasing:false});
//   this.props.history.push('/');
  
})
.catch(error =>{
//   this.setState({loading:false,purchasing:false});
dispatch(purchaseBurgerFail(error))
})
}    

};

export const fetchOrdersSuccess = (orderInfo) => {
   return{
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orderData: orderInfo
   } 
}


export const fetchOrdersStart = () => {
    return{
     type:actionTypes.FETCH_ORDERS_START   
    }
}

export const fetchOrdersFail = (error) => {
    return{
       type:actionTypes.FETCH_ORDER_FAIL,
       error:error 
    }
}


export const fetchOrders = () => {
return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
    .then(resp => {
        const fetchOrders = [];
        for(let key in resp.data)
        {
         fetchOrders.push({
         ...resp.data[key],
         id: key
        });   
        }
     //this.setState({loading:false,orders:fetchOrders});
    dispatch(fetchOrdersSuccess(fetchOrders));
    }).catch(err => {
       dispatch(fetchOrdersFail(err))
        // this.setState({loading:false});
    }); 
};
};