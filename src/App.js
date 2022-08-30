import React, { useState } from 'react';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import Slider from './component/layout/Slider';
import MenuLeft from './component/layout/MenuLeft';
import MenuLeftMyProduct from './component/layout/MenuLeftMyProduct';
import { useLocation } from "react-router-dom";
import { UserContext } from './UserContext';


function App(props) {

  let productCartApi = localStorage.getItem("Cart")
  if (productCartApi) {
    productCartApi = JSON.parse(productCartApi)
  }
  let qtyLocalStorage = 0
  Object.keys(productCartApi).map(key => {
    qtyLocalStorage += productCartApi[key]
  })

  let params1 = useLocation();
  const [saveQtyCart, setsaveQtyCart] = useState(qtyLocalStorage);
  const handleSaveQtyCart = (qty) => {
    setsaveQtyCart(qty)
  }
  
  return (
    <div>
      <UserContext.Provider value={handleSaveQtyCart} >
        <Header cartQty={saveQtyCart}/>
        {
          params1["pathname"].includes("/home") ? 
          <Slider /> : 
          ""
        }
        <section>
          <div className="container">
              <div className="row">

                {
                  params1["pathname"].includes("/account") || 
                  params1["pathname"].includes("/add-new-product") || 
                  params1["pathname"].includes("/my-product") || 
                  params1["pathname"].includes("/user-edit-product") ? 
                  <MenuLeftMyProduct/> : 
                  params1["pathname"].includes("/login-register") || params1["pathname"].includes("/products/cart") ? "" : <MenuLeft/>
                }
                  {props.children}
              </div>

          </div>
        </section>
        <Footer/>
      </UserContext.Provider>        
    </div>
  );
}

export default App;
