import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function MyProduct(props) {
    const navigate = useNavigate()
    let Auth = localStorage.getItem("Auth")
    let token = localStorage.getItem("token")
    if (Auth && token) {
        Auth = JSON.parse(Auth)
        token = JSON.parse(token)
    }
    const url = "http://localhost:8080/laravel/laravel/public/api/user/my-product"
    let accessToken = token;
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    };

    const [getProduct, setGetProduct] = useState({});

    useEffect(() => {
        axios.get(url, config)
        .then( res => {
            setGetProduct(res.data.data);
        })
        .catch(error => console.log(error))
    },[])

    const RenderImg = ({product}) => {

        let imgs = product.image
        let imgLink = ""
        imgs.split("")
        for (let i = 0; i < imgs.length; i++) {
            if (imgs[i] !== "[" && imgs[i] !== "]") {
                imgLink += imgs[i]
            }
        }


        imgLink = imgLink.split(",")

        let imgLinkHandled = []
        imgLink.map((element) => {
            imgLinkHandled.push(element)
        })

        return imgLinkHandled.map((imgLink, index) => {

                let startValue = imgLink.indexOf('"') + 1
                let endValue = imgLink.lastIndexOf('"') - 1 
                imgLink = imgLink.substr(startValue, endValue)

                return (
                    <img style={{width: "100px"}} key={index} src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + Auth.id + "/" + imgLink} alt=""/>
                )
            })
    }

    const handleDeleteProduct = (IdProduct) => {
        const deleteUrl = "http://localhost:8080/laravel/laravel/public/api/user/delete-product/" + IdProduct
        axios.get(deleteUrl, config)
        .then( res => {
            console.log(res.data.data);
            window.location.reload();
        })
        .catch(error => console.log(error))
    }

    const handleEdit = (productInfor) => {
        localStorage.setItem("product-infor", JSON.stringify(productInfor))
        navigate("/user-edit-product")
    }

    const fetchData = () => {
        return Object.keys(getProduct).map((key) => {
            return ( 
                <tr key={getProduct[key].id}>

                    <td className="">
                        <h4><a href>{getProduct[key].id}</a></h4>
                    </td>

                    <td className="">
                        <h4><a href>{getProduct[key].name}</a></h4>
                    </td>

                    <td className="">
                		<a href>
                            <RenderImg product={getProduct[key]}/>
                        </a>
                    </td>

                	<td className="">
                		<span>$</span><p>{getProduct[key].price}</p>
                	</td>

                	<td className="">
                        <a
                            style={{"marginRight":"30px", "cursor":"pointer"}}
                            onClick={() => handleEdit(getProduct[key])}
                            href
                        >
                            Edit
                        </a>
                		<a 
                            onClick={() => handleDeleteProduct(getProduct[key].id)} 
                            className="" 
                            href
                        >
                            <i className="fa fa-times"></i>
                        </a>
                	</td>

                </tr>
            )
        })
    }

    return (
        <div className='col-sm-9'>
            <table className="table table-condensed">
                <thead>
                    <tr className="cart_menu">
                        <td className="image">ID</td>
                        <td className="description">Name</td>
                        <td className="price">Image</td>
                        <td className="quantity">Price</td>
                        <td className="total">Action</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {fetchData()}
                </tbody>
            </table>
            <Link className='btn btn-warning' style={{"margin": "0 0 50px 600px"}} to="/add-new-product">Add New</Link>
        </div>
    );
}

export default MyProduct;