import React from 'react';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import Slider from './component/layout/Slider';
import MenuLeft from './component/layout/MenuLeft';
import MenuLeftMyProduct from './component/layout/MenuLeftMyProduct';
import { useLocation } from "react-router-dom";


function App(props) {

  let params1 = useLocation();
  
  return (
    <div>
        <Header/>
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
    </div>
  );
}

export default App;
