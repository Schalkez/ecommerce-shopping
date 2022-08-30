import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function UserAddProduct(props) {
    const navigate = useNavigate()
    let Auth = localStorage.getItem("Auth")
    let token = localStorage.getItem("token")
    if (Auth && token) {
        Auth = JSON.parse(Auth)
        token = JSON.parse(token)
    }

    const [saveCategories, setSaveCategories] = useState([]);
    const [saveBrands, setSaveBrands] = useState([]);
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState({});
    const [showStatus, setShowStatus] = useState(1);
    const [getCategoryID, setGetCategoryID] = useState("");
    const [getBrandID, setGetBrandID] = useState("");


    const url = "http://localhost:8080/laravel/laravel/public/api/user/add-product"
    let accessToken = token;
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    };

    useEffect(() => {
        axios.get("http://localhost:8080/laravel/laravel/public/api/category-brand")
        .then( res => {
            setSaveCategories(res.data.category);
            setSaveBrands(res.data.brand);
        })
        .catch(error => console.log(error))
    },[])

    function handleUserInputFile(e){
        const files = e.target.files;
        setFiles(files);
    }

    const handleInputs = (e) => {
        let value = e.target.value
        let nameInput = e.target.name
        setInputs(state => ({...state, [nameInput]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const checkSize = []
        let checkSizeImg = () => {
            for (let i = 0; i < files.length; i++) {
                if (files[i].size < 1024*1024) {
                    checkSize.push("true")
                } else {
                    checkSize.push("false")
                }
            }
        }
        checkSizeImg()

        const checkFilesFormat = []
        const checkFileFormat = () => {
            const imgFormat = ["jpg","JPG","jpeg","png","PNG"];

            for (let i = 0; i < files.length; i++) {
                let nameFile = files[i].name;
                let fileFormat = nameFile.substr(nameFile.lastIndexOf(".") + 1);
                const checkFormat = imgFormat.includes(fileFormat)

                if (checkFormat) {
                    checkFilesFormat.push("true")
                } else {
                    checkFilesFormat.push("false")
                }
            }
        }    
        checkFileFormat()
        // kiem tra xem toan bo size cua img da < 1mb chua 

        const errObj = {}
        let flag = true
        if (inputs.name === undefined) {
            flag = false;
            errObj.name = "Please text the product's name"
        } else {
            if (inputs.name.length < 5) {
                flag = false;
                errObj.name = "The product's name must more than 5 character"
            }
            if (inputs.name.length > 50) {
                flag = false;
                errObj.name = "The product's name cannot more than 50 character"
            }

        }
        if (inputs.price === undefined) {
            flag = false;
            errObj.price = "Please text the product's price"
        }
        if (getCategoryID == false) {
            flag = false;
            errObj.category = "Please text the product's category"
        }
        if (getBrandID == false) {
            flag = false;
            errObj.brand = "Please text the product's brand"
        }

        if (showStatus === 0) {
            if (inputs.sale === undefined) {
                flag = false;
                errObj.sale = "Please text the product's sale percent"
            }
        }
        
        if (inputs.company === undefined) {
            flag = false;
            errObj.company = "Please text the product's company profile"
        }
        console.log(files.length)

        if (files.length > 1) {
            if (checkSize.includes("false") === false){
                if (checkFilesFormat.includes("false")) {
                    flag = false;
                    errObj.avatar = "File format must be Jpg, Png, Jpeg";
                } else {
                    if (files.length > 3) {
                        flag = false;
                        errObj.avatar = "Please upload product's image less than 3";
                    } else {
                        setErrors({})
                    }
                }
            } else {
                flag = false;
                errObj.avatar = "Please upload product's image size less than 1MB";
            }
        } else {
            console.log(files)
            flag = false;
            errObj.avatar = "You not upload file yet"
        }

        
        if (!flag) {
            setErrors(errObj)
        } else {
            
            if (showStatus === 1) {
                inputs.sale = 0
            }
            
            const formData = new FormData ();
             formData.append("category", getCategoryID)
             formData.append("brand", getBrandID)
             formData.append("name", inputs.name)
             formData.append("price", inputs.price)
             formData.append("status", showStatus)
             formData.append("sale", inputs.sale)
             formData.append("detail", inputs.detail)
             formData.append("company", inputs.company)
            
            Object.keys(files).map((key) => {
                formData.append("file[]", files[key])
            })

            axios.post(url, formData, config)
            .then(res => { 
                if (res.data.errors) {
                    console.log(res.data.errors)
                } else {
                    alert("Product Uploaded Successfully");
                    navigate("/my-product");
                }
            })
            .catch(err => console.log(err))
        }
    }

    const handleShowStatus = (e) => {
        showStatus === 0 ? setShowStatus(1) : setShowStatus(0)
    }
    
    const renderStatus = () => {
        if (showStatus === 0) {
            return (
                <input name='sale' type="text" placeholder="0%" onChange={handleInputs}/>
            )
        }
    }

    const handleIdBrandCate = (e) => {
        let value = e.target.value
        saveCategories.map((category) => {
            if (value === category.category) {
                setGetCategoryID(category.id)
            }
        })
        saveBrands.map((brand) => {
            if (value === brand.brand) {
                setGetBrandID(brand.id)
            }
        })
    }
    

    const renderErr = () => {
        return Object.keys(errors).map((key) => {
            return  <li key={key}>{errors[key]}</li>
        })
    }
    
    return (
        <div style={{"marginBottom": "100px"}} className="col-sm-4 col-sm-offset-2 m-b-xs">
            <div className="signup-form">
                <h2>Create Product!</h2>
                <ul>
                    {Object.keys(errors).length > 0 && renderErr()}
                </ul>
                <form action="#" onSubmit={handleSubmit} encType="multipart/form-data" >
                    <input name='name' type="text" placeholder="Product name"  onChange={handleInputs}/>
                    <input name='price' type="text" placeholder="Price" onChange={handleInputs}/>
                    <select name='category' onChange={handleIdBrandCate}>
                        <option>Please choose category</option>
                        {
                            saveCategories.map((category) => {
                                return (
                                    <>
                                        <option key={category.id}>{category.category}</option>
                                    </>
                                )
                            })
                        }
                    </select>
                    <select name='brand' onChange={handleIdBrandCate}>
                        <option>Please choose brand</option>
                        {
                            saveBrands.map((brand) => {
                                return (
                                    <>
                                        <option key={brand.id}>{brand.brand}</option>
                                    </>
                                )
                            })
                        }
                    </select>
                    <select name='status' value={showStatus} onChange={handleShowStatus}>
                        <option value="1">New</option>
                        <option value="0">Sale</option>
                    </select>
                    {renderStatus()}
                    
                    <input name='company' type="text" placeholder="Company profile"  onChange={handleInputs}/>
                    <input name='avatar' type="file" placeholder="Avatar" multiple onChange={handleUserInputFile}/>
                    <textarea name='detail' onChange={handleInputs}></textarea>
                    <button type="submit" className="btn btn-default">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UserAddProduct;