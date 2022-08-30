import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';


function ProductDetail({ productInfor }) {

    const [link, setLink] = useState("");
    const [showModal, setShowModal] = useState(false);
    
    const renderDefImg = () => {
        let imgLinks = productInfor.image
        if (!!imgLinks) {
            imgLinks = imgLinks.split(",")
            imgLinks = imgLinks[0].slice(imgLinks[0].indexOf('"') + 1, imgLinks[0].lastIndexOf('"'))
            return ("http://localhost:8080/laravel/laravel/public/upload/user/product/" + productInfor.id_user + "/" + imgLinks)
        }
    }
    
    
    

    

    const renderImgZoom = (e) => {
        e.preventDefault()
        
        setShowModal(true)
    }

    const renderMainImg = (e) => {
        setLink(e.target.src)
    } 

    const RenderModal = () => {
        return (
            <Modal.Dialog style={{width: "auto"}}>

                <Modal.Body style={{textAlign: "center"}}>
                    <img width={"300px"} src={link}/>
                </Modal.Body>

                <Modal.Footer style={{textAlign: "center"}}>
                    <Button onClick={() => setShowModal(false)} variant="secondary">Close</Button>
                </Modal.Footer>

            </Modal.Dialog>
        )
    }

    const RenderImgCarousel = () => {
        let imgLinks = productInfor.image
        if (typeof imgLinks === "string") {
            imgLinks = imgLinks.split(",")
            return imgLinks.map((link) => {
                imgLinks = link.slice(link.indexOf('"') + 1, link.lastIndexOf('"'))
                return (
                            <img 
                                onClick={(e) => renderMainImg(e)} 
                                style={{"width":"100px"}} 
                                src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + productInfor.id_user + "/" + imgLinks} 
                                alt="First slide" 
                            />
                )
            })
        }
    }

    const RenderImgDf = ({src}) => {
        return <img src={src} alt="" />
    }

    return (
        <div className="product-details">{/*product-details*/}
            {
               showModal ? <RenderModal/> : ""
            } 
                <div className="col-sm-5">
                <div className="view-product">
                    <RenderImgDf src={ link ? link : renderDefImg()} />
                    <a onClick={(e) => renderImgZoom(e)} href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>
                </div>
                <div id="similar-product" className="carousel slide" data-ride="carousel">
                    {/* Wrapper for slides */}

                        

                    {/* Controls */}
                    <a className="left item-control" href="#similar-product" data-slide="prev">
                    <i className="fa fa-angle-left" />
                    </a>
                    <>
                        <RenderImgCarousel/>
                    </>
                    <a className="right item-control" href="#similar-product" data-slide="next">
                    <i className="fa fa-angle-right" />
                    </a>
                </div>
                </div>
                <div className="col-sm-7">
                <div className="product-information">{/*/product-information*/}
                    <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                    <h2>{productInfor.name}</h2>
                    <p>Web ID: {productInfor.id}</p>
                    <img src="images/product-details/rating.png" alt="" />
                    <span>
                    <span>US ${productInfor.price}</span>
                    <label>Quantity:</label>
                    <input type="text" defaultValue={3} />
                    <button type="button" className="btn btn-fefault cart">
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                    </button>
                    </span>
                    <p><b>Availability:</b> In Stock</p>
                    <p><b>Condition:</b> {productInfor.condition}</p>
                    <p><b>Brand:</b> {productInfor.id_brand}</p>
                    <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                </div>{/*/product-information*/}
                </div>
            </div>
    );
}

export default ProductDetail;