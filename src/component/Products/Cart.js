import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { qtyDecrement, qtyIncrement } from '../../actions/cartQty';
import { useDispatch } from 'react-redux'


function Cart(props) {

    const dispatch = useDispatch()


    let productCart = localStorage.getItem("Cart")
    if (productCart) {
        productCart = JSON.parse(productCart)
    }

    const [saveCart, setSaveCart] = useState("");
    
    useEffect(() => {
      axios.post("http://localhost:8080/laravel/laravel/public/api/product/cart", productCart)
      .then((res) => {
        setSaveCart(res.data.data)
      })
      .catch((err) => {
          console.log(err)
      })
    }, [])


    const handleQtyUp = (e, product) => {
      e.preventDefault();

      // copy ra thanh moi 
      let xx = [...saveCart]
      Object.keys(xx).map(key => {
        if (!!xx[key]) {
          if (xx[key].id === product.id) {
            xx[key].qty += 1
          }
        }
        
      })

      Object.keys(productCart).map(key => {
        if (parseInt(key) === product.id) {
          productCart[key] += 1
        }
      })
      localStorage.setItem("Cart" ,JSON.stringify(productCart))
      
      setSaveCart(xx)

      // hien thi len qtycart bang redux
      const action = qtyIncrement()

      dispatch(action)

    }
    

    const handleQtyDown = (e, product, index) => {
      e.preventDefault();

      console.log(index)

      let xx = [...saveCart]
      Object.keys(xx).map(key => {

        if (xx[key]) {
          if ((xx[key].id === product.id) && (xx[key].qty >= 0)) {
            xx[key].qty -= 1
            if (xx[key].qty === 0) {
              xx = xx.map(element => {
                if (!!element) {
                  if (element.qty >= 1) {
                    return element
                  }
                }
              })
              setSaveCart(xx)
            }
          }
        }
      })
      
      
      Object.keys(productCart).map(key => {
        if (parseInt(key) === product.id) {
          productCart[key] -= 1
        }
      })

      // xoa property do khi no bang 0
      Object.keys(productCart).map(key => {
        if (productCart[key] < 1) {
          delete productCart[key]
        }
      })

      localStorage.setItem("Cart" ,JSON.stringify(productCart))
      
      setSaveCart(xx)

      // show to cartqty using redux
      const action = qtyDecrement()

      dispatch(action)

    }

    const handleOnchange = (e, product) => {
      let value = e.target.value

      if (!!value) {
        Object.keys(productCart).map(key => {
          if (parseInt(key) === product.id) {
            productCart[key] = parseInt(value)
          }
        })
        console.log(productCart)
  
        let xx = [...saveCart]
        console.log(xx)
        xx.map(element => {
          if (element.id === product.id) {
            element.qty = value
          }
        })
        console.log(xx)
        setSaveCart(xx)
      }
    }

    const handleCartDelete = (e, product, index) => {
      e.preventDefault();

      let xx = [...saveCart]
      xx.splice(index, 1)
      
      Object.keys(productCart).map(key => {
        if (parseInt(key) === product.id) {
          delete productCart[key]
        }
      })

      localStorage.setItem("Cart" ,JSON.stringify(productCart))
      setSaveCart(xx)
    }

    const ShowImage = ({img, idUser}) => {
      
      const style = {
        "width": "100px",
        "objectFit": "fit",
        "margin": "10px 15px"
      }

      let stringArrImg = img.split(",")
      stringArrImg = stringArrImg[0]
      stringArrImg = stringArrImg.substr(stringArrImg.indexOf('"') + 1 , stringArrImg.lastIndexOf('"') - 2 )
      console.log(stringArrImg)

      return (
        <img 
          style={style}
          src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + idUser + "/" + stringArrImg} 
          alt="" 
        />
      )
    }

    const FetchData = () => {
      if (!!saveCart && !!saveCart[0]) {
        console.log(saveCart)
        return saveCart.map((product, index) => {
          if (!!product) {
            return (
              <tr key={product.id}>
                    <td className="cart_product">
                      <a href="">
                        <ShowImage img={product.image} idUser={product.id_user} />
                      </a>
                    </td>
                    <td className="cart_description">
                      <h4><a href="">{product.name}</a></h4>
                      <p>Web ID: {product.id}</p>
                    </td>
                    <td className="cart_price">
                      <span>$</span><p>{product.price}</p>
                    </td>
                    <td className="cart_quantity">
                      <div className="cart_quantity_button">
                        <a onClick={(e) => handleQtyUp(e, product)} className="cart_quantity_up" href=""> + </a>
                        <input 
                          onChange={(e) => handleOnchange(e, product)}
                          className="cart_quantity_input" 
                          type="text" name="quantity" 
                          value={product.qty}
                          autoComplete="off" 
                          size="2" 
                        />
                        <a onClick={(e) => handleQtyDown(e, product, index)} className="cart_quantity_down" href=""> - </a>
                      </div>
                    </td>
                    <div style={{"display": "flex", "gap": "30px"}}>
                      <td className="cart_total">
                        <span>$</span><p className="cart_total_price">{product.price*product.qty}</p>
                      </td>
                      <td style={{"display": "flex", "alignItems": "center", "justifyContent": "center"}} className="cart_delete">
                        <a onClick={(e) => handleCartDelete(e, product, index)} className="cart_quantity_delete" href=""><i className="fa fa-times"></i></a>
                      </td>
                    </div>
                  </tr>
            )
          }
        })
      } else {
          return <p style={{"textAlign": "center", "paddingTop": "20px"}}>No products available</p>
      }
    }

    let ecoTax = 2
    let cartSubTotal = 0
    const handleSubTotal = () => {
      if (saveCart.length > 0) {
        saveCart.map(product => {
          cartSubTotal += product.price*product.qty
        })
      }
    }
    handleSubTotal()

    return (

      <>

        <section id="cart_items">
          <div className="container">
            <div className="breadcrumbs">
              <ol className="breadcrumb">
                <li><a href="#">Home</a></li>
                <li className="active">Shopping Cart</li>
              </ol>
            </div>
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>

                <FetchData/>

                </tbody>
              </table>
            </div>
          </div>
        </section>

      <div>
      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>Get Quotes</a>
                <a className="btn btn-default check_out" href>Continue</a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>Cart Sub Total <span>${cartSubTotal}<span className="sub-total" /></span></li>
                  <li>Eco Tax <span>${ecoTax}</span></li>
                  <li>Shipping Cost <span>Free</span></li>
                  <li>Total <span>${cartSubTotal + ecoTax}<span className="offical-total" /></span></li>
                </ul>
                <a className="btn btn-default update" href>Update</a>
                <a className="btn btn-default check_out" href>Check Out</a>
              </div>
            </div>
          </div>
        </div>
      </section>/#do_action
      </div>

    </>

    );
}

export default Cart;