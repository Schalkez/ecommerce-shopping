let qty = localStorage.getItem("Cart")
if (!!qty) {
    qty = JSON.parse(qty)
}
let qtyTotal = 0
if (!!qty && qty !== null) {
    Object.keys(qty).map(key => {
        qtyTotal += qty[key]
    })
}

const cartQty = (state = qtyTotal, action) => {
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