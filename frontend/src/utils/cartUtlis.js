export const addDecimal=(num)=>{
    return (Math.round(num*100/100)).toFixed(2);
}

export const updateCart=(state)=>{
    state.itemsPrice=addDecimal(state.cartItem.reduce((acc,item)=>acc+item.price*item.qty,0));

    state.shippingPrice=addDecimal(state.itemsPrice >= 1000 ? 0 : 50);


    state.tax=addDecimal(Number(0.15*state.itemsPrice).toFixed(2));
    
    state.totalPrice=(
       Number(state.itemsPrice)+Number(state.shippingPrice)+Number(state.tax)).toFixed(2);
       localStorage.setItem('cart',JSON.stringify(state))
    
}