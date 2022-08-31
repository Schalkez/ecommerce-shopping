import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import HomeProductCategory from './HomeProductCategory';
import HomeProductRecomment from './HomeProductRecomment';
import { qtyIncrement } from '../../actions/cartQty';
import { useDispatch } from 'react-redux'

function Home(props) {

    const dispatch = useDispatch()

    let Auth = localStorage.getItem("Auth")
    let token = localStorage.getItem("token")
    if (Auth && token) {
        Auth = JSON.parse(Auth)
        token = JSON.parse(token)
    }

    const [products, setProducts] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/laravel/laravel/public/api/product")
        .then((res) => {
            setProducts(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const RenderImg = ({productImg, idUser}) => {
        
        let linkHandle = productImg.split(",")

        linkHandle.map((linkHandling) => {
            
            linkHandle = linkHandling.substr(linkHandling.indexOf('"') + 1, linkHandling.lastIndexOf('"') - 1)

            if (linkHandle[linkHandle.length -1] === '"' ) {
                linkHandle = linkHandling.substr(linkHandling.indexOf('"') + 1, linkHandling.lastIndexOf('"') - 2)
            }

            return linkHandle
            
        })

        return (
            <img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + idUser + "/" + linkHandle} style={{objectFit: "scale-down"}} alt="" />
        )
    }

    const handleAddToCart = (product, e) => {
        e.preventDefault();

        let idProduct = product.id 

        let prdCart = {}

        let productCart = JSON.parse(localStorage.getItem("Cart"))
        if (productCart) {
            prdCart = productCart
        }

        let arrSaveIdCartLocal = []
        const isHasThisPrdInLocal = () => {
            Object.keys(prdCart).map(key => {
                arrSaveIdCartLocal.push(parseInt(key))
            })
            if (arrSaveIdCartLocal.includes(idProduct)) {
                return true
            } else {
                return false
            }
        }

        if (!isHasThisPrdInLocal()) {
            prdCart[idProduct] = 1
        } else {
            prdCart[idProduct] ++
        }


        // let cartQtyContext = 0
        // let cartQty = {...prdCart}
        // Object.keys(cartQty).map(key => {
        //     cartQtyContext += cartQty[key]
        // })

        const action = qtyIncrement()

        dispatch(action)

        // console.log(cartQtyContext)

        localStorage.setItem("Cart", JSON.stringify(prdCart))
    }

    const FetchDataProducts = () => {
        if (products.length > 0) {
            return products.map((product) => {
                return (
                    <div className="col-sm-4">
                        <div className="product-image-wrapper">
                        <div className="single-products">
                            <div className="productinfo text-center">
                                <RenderImg productImg={product.image} idUser={product.id_user} />
                            <div>
                                <span>$</span><h2>{product.price}</h2>
                            </div>
                            <p>{product.name}</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                            </div>
                            <div className="product-overlay">
                            <div className="overlay-content">
                                <div>
                                <span>$</span><h2>{product.price}</h2>
                                </div>
                                <p>{product.name}</p>
                                <a 
                                    href={"http://localhost:3000/products/product-detail/" + product.id} 
                                    className="btn btn-default add-to-cart"
                                >
                                    Product detail
                                </a>
                                <br></br>
                                <a  
                                    href="#" 
                                    className="btn btn-default add-to-cart"
                                    onClick={(e) => handleAddToCart(product, e)}
                                >
                                    <i className="fa fa-shopping-cart" />
                                    Add to cart
                                </a>
                            </div>
                            </div>
                        </div>
                        <div className="choose">
                            <ul className="nav nav-pills nav-justified">
                            <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                            <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                )
            })
        }
        
    }

    

    return (
        <div className="col-sm-9 padding-right">
            <div className="features_items">{/*features_items*/}
                <h2 className="title text-center">Features Items</h2>

                <>
                    <FetchDataProducts/>
                </>
                
            </div>{/*features_items*/}
            
            <HomeProductCategory AllProducts={products} />

            <HomeProductRecomment/>

            
        </div>
    );
}

export default Home;