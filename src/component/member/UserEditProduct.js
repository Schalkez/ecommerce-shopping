import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function UserEditProduct(props) {
    const navigate = useNavigate()
    let Auth = localStorage.getItem("Auth")
    let token = localStorage.getItem("token")
    let productInfor = localStorage.getItem("product-infor")
    if (Auth && token) {
        Auth = JSON.parse(Auth)
        token = JSON.parse(token)
    }
    if (productInfor) {
        productInfor = JSON.parse(productInfor)
    }

    const [saveCategories, setSaveCategories] = useState([]);
    const [saveBrands, setSaveBrands] = useState([]);
    const [inputs, setInputs] = useState(productInfor);
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState({});
    const [companyProfile, setCompanyProfile] = useState(productInfor.company_profile);
    const [detail, setDetail] = useState(productInfor.detail);
    const [showStatus, setShowStatus] = useState(productInfor.status);
    const [getCategoryID, setGetCategoryID] = useState(productInfor.id_category);
    const [getBrandID, setGetBrandID] = useState(productInfor.id_brand);



    const url = "http://localhost:8080/laravel/laravel/public/api/user/edit-product/" + productInfor.id
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

    let wasChecked = ""
    let imgLinkLength = ""
    const handleSubmit = (e) => {
        e.preventDefault()

        const checkSize = []
        const checkSizeImgs = () => {
            for (let i = 0; i < files.length; i++) {
                if (files[i].size < 1024*1024) {
                    checkSize.push("true")
                } else {
                    checkSize.push("false")
                }
            }
            return checkSize.includes("false") === false
        }

        const checkFilesFormat = []
        const checkFileFormat = () => {
            const imgFormat = ["jpg","JPG","jpeg","png","PNG"];

            for (let i = 0; i < files.length; i++) {
                let nameFile = files[i].name;
                let fileFormat = nameFile.slice(nameFile.lastIndexOf(".") + 1);
                const checkFormat = imgFormat.includes(fileFormat)

                if (checkFormat) {
                    checkFilesFormat.push("true")
                } else {
                    checkFilesFormat.push("false")
                }
            }
            return checkFilesFormat.includes("false")
        }

        const checkFilesLength = () => {
            return Object.keys(files).length + imgLinkLength.length < 5
        }
        // kiem tra xem toan bo size cua img da < 1mb chua 

        const errObj = {}
        let flag = true
        if (inputs.name === undefined) {
            flag = false;
            errObj.name = "Vui long nhap ten san pham"
        } else {
            if (inputs.name.length < 5) {
                flag = false;
                errObj.name = "Ten san pham phai lon hon 5 ky tu"
            }
        }
        if (inputs.price === undefined) {
            flag = false;
            errObj.price = "Vui long nhap price"
        }
        if (getCategoryID == false) {
            flag = false;
            errObj.category = "Vui long nhap category"
        }
        if (getBrandID == false) {
            flag = false;
            errObj.brand = "Vui long nhap brand"
        }

        if (showStatus === 0) {
            if (inputs.sale === undefined) {
                flag = false;
                errObj.sale = "Vui long nhap phan tram muon sale"
            }
        }
        
        if (inputs.company_profile === undefined) {
            flag = false;
            errObj.company = "Vui long nhap company profile"
        }
        if (!!files[0]) {

            if (!checkSizeImgs()){
                flag = false;
                errObj.avatar = "anh lon hon 1mb";
            } else {

                if (checkFileFormat()) {
                    flag = false;
                    errObj.avatar = "file sai dinh dang";
                } else {

                    if (!checkFilesLength()) {
                        flag = false;
                        errObj.avatar = "tong so anh tai len khong duoc lon hon 5, vui long xoa anh de tai them";
    
                        if (wasChecked) {
                            flag = true;
                            setErrors({});
                        }

                    } else {

                        if (files.length > 3) {
                            flag = false;
                            errObj.avatar = "Khong duoc tai qua 3 anh";

                            if (wasChecked) {
                                flag = true
                                setErrors({})
                            }

                        } 

                    }

                }
            }
            
        } else {
            flag = false;
            errObj.avatar = "Ban chua tai file"
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
             formData.append("avatarCheckBox[]", saveAvtCheckbox)
            
            Object.keys(files).map((key) => {
                formData.append("file[]", files[key])
            })
            saveAvtCheckbox.map((avatarLink) => {
                formData.append("avatarCheckBox[]", avatarLink)
            })

            axios.post(url, formData, config)
            .then(res => { 
                if (res.data.errors) {
                    console.log(res.data.errors)
                } else {
                    alert("Chinh sua san pham thanh cong");
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

    const handleIdBrand = (e) => {
        let value = parseInt(e.target.value)
        
        saveBrands.map((brand) => {
            if (value === brand.id) {
                setGetBrandID(brand.id)
            }
        })
    }

    const handleIdCategory = (e) => {
        let value = parseInt(e.target.value)
        saveCategories.map((category) => {
            if (value === category.id) {
                setGetCategoryID(category.id)
            }
        })
    }

    
    const RenderImg = () => {

        let imgs = inputs.image
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
            imgLinkLength = imgLinkHandled
            let startValue = imgLink.indexOf('"') + 1
            let endValue = imgLink.lastIndexOf('"') - 1 
            imgLink = imgLink.substr(startValue, endValue)
            console.log(imgLink)

            return (
                <li 
                    key={index} 
                    style={{"display":"flex","width":"15px","alighItems":"center","justifyContent":"left","flexDirection":"column", "marginRight":"80px"}}
                >
                    <input type="checkbox" id={imgLink} name="avatar" onChange={(e) => handleCheckbox(e, imgLink)} />
                    <label 
                        style={{"display": "flex","alighItems":"center","justifyContent":"left"}}
                        htmlFor={imgLink}
                    >
                        <img 
                            style={{"width": "80px", "textAlign":"center"}}   
                            src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + Auth.id + "/" + imgLink} 
                        />
                    </label>
                </li>
            )
        })
    }

    const saveAvtCheckbox = []
    const handleCheckbox = (e, imgLink) => {
        let isChecked = e.target.checked
        wasChecked = isChecked
        if (!!isChecked) {
            saveAvtCheckbox.push(imgLink)
        } else {
            saveAvtCheckbox.map((avtlink) => {
                if (imgLink === avtlink) {
                    const imgLinkIndex = saveAvtCheckbox.indexOf(imgLink)
                    saveAvtCheckbox.splice(imgLinkIndex, 1)
                }
            })
        }
    }

    const handleCompanyProfile = (e) => {
        setCompanyProfile(e.target.value)
    }
    const handleDetail = (e) => {
        setDetail(e.target.value)
    }

    const renderErr = () => {
        return Object.keys(errors).map((key) => {
            return  <li key={key}>{errors[key]}</li>
        })
    }
    
    return (
        <div style={{"margin-bottom": "100px"}} className="col-sm-4 col-sm-offset-2 m-b-xs">
            <div className="signup-form">
                <h2>Edit Product!</h2>
                <ul>
                    {Object.keys(errors).length > 0 && renderErr()}
                </ul>
                <form action="#" onSubmit={handleSubmit} encType="multipart/form-data" >
                    <input name='name' type="text" placeholder="Product name"  onChange={handleInputs} value={inputs.name} />
                    <input name='price' type="text" placeholder="Price" onChange={handleInputs} value={inputs.price} />
                    <select name='category' onChange={handleIdCategory} value={getCategoryID}>
                        <option>Please choose category</option>
                        {
                            saveCategories.map((category) => {
                                return (
                                    <>
                                        <option value={category.id} key={category.id}>{category.category}</option>
                                    </>
                                )
                            })
                        }
                    </select>
                    <select name='brand' onChange={handleIdBrand} value={getBrandID} >
                        <option>Please choose brand</option>
                        {
                            saveBrands.map((brand) => {
                                return (
                                    <>
                                        <option value={brand.id} key={brand.id}>{brand.brand}</option>
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
                    
                    <input name='company' type="text" placeholder="Company profile"  onChange={handleCompanyProfile} value={companyProfile} />
                    <input name='avatar' type="file" placeholder="Avatar" multiple onChange={handleUserInputFile}/>
                    
                    <div style={{"backgroundColor": "#F0F0E9", "padding": "15px", "margin": "0 0 10px 0"}}>
                        <p>Chọn ảnh cần xóa</p>
                        <ul style={{"display": "flex", "padding":"0"}}>
                            <RenderImg/>
                        </ul>
                    </div>
                    
                    <textarea name='detail' onChange={handleDetail}  value={detail}></textarea>
                    <button type="submit" className="btn btn-default">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UserEditProduct;