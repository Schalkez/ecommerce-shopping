import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home(props) {

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
            <img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + idUser + "/" + linkHandle} alt="" />
        )
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
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
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
            <div className="category-tab">{/*category-tab*/}
            <div className="col-sm-12">
                <ul className="nav nav-tabs">
                <li className="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
                <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                <li><a href="#kids" data-toggle="tab">Kids</a></li>
                <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
                </ul>
            </div>
            <div className="tab-content">
                <div className="tab-pane fade active in" id="tshirt">
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="tab-pane fade" id="blazers">
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="tab-pane fade" id="sunglass">
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="tab-pane fade" id="kids">
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="tab-pane fade" id="poloshirt">
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>{/*/category-tab*/}
            <div className="recommended_items">{/*recommended_items*/}
            <h2 className="title text-center">recommended items</h2>
            <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                <div className="item active">	
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src="images/home/recommend1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src="images/home/recommend2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src="images/home/recommend3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="item">	
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src="images/home/recommend1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src="images/home/recommend2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src="images/home/recommend3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                <i className="fa fa-angle-left" />
                </a>
                <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                <i className="fa fa-angle-right" />
                </a>			
            </div>
            </div>{/*/recommended_items*/}
        </div>
    );
}

export default Home;