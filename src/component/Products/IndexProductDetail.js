import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail';


function IndexProductDetail(props) {

    const [productInfor, setProductInfor] = useState("");
    let { id } = useParams();


    useEffect(() => {
        axios.get("http://localhost:8080/laravel/laravel/public/api/product/detail/" + id)
        .then( res => {
            setProductInfor(res.data.data);
        })
        .catch(error => console.log(error))
    },[id])

    

    return (
        <div className="col-sm-9 padding-right">
            <ProductDetail productInfor={productInfor} />
        </div>
    );
}

export default IndexProductDetail;