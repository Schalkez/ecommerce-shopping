let qty = localStorage.getItem("Cart")
if (qty) {
    qty = JSON.parse(qty)
}
let qtyTotal = 0
Object.keys(qty).map(key => {
    qtyTotal += qty[key]
})


// Reducer nhan 2 gia tri: state, action 
const cartQty = (state = qtyTotal, action) => {
    // khi lv tren reducer thi chu y van de tham chieu,
    // console.log(action)

    switch (action.type) {
        case "INCREMENT": {
            state++
            return state
        }
        case "DECREMENT": {
            state--
            return state
        }

        default:
            return state;
    }
}

export default cartQty;