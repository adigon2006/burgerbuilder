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

export const purchaseBurger = (orderData,token) => {
return dispatch => {
dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth='+token,orderData)
.then(response => {  
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


export const fetchOrders = (token,userId) => {
return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
    //axios.get('/orders.json?auth=' + token )
    axios.get('/orders.json'+queryParams)
    .then(resp => {
        const fetchOrders = [];
        for(let key in resp.data)
        {   
        //  console.log(resp.data[key].userId);   
        // if(resp.data[key].userId === userId)
        //  {
        //     //console.log(resp.data.key.userId);  
        //     fetchOrders.push({
        //         ...resp.data[key],
        //         id: key
        //        }); 
        //  }   
          
        fetchOrders.push({
                    ...resp.data[key],
                    id: key
                   }); 
        }
     //this.setState({loading:false,orders:fetchOrders});
    dispatch(fetchOrdersSuccess(fetchOrders));
    }).catch(err => {
       dispatch(fetchOrdersFail(err.data))
        // this.setState({loading:false});
    }); 
};
};