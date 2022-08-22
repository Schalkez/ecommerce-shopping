import React, {useState} from 'react';
import axios from 'axios';

function UserUpdate(props) {
    let Auth = localStorage.getItem("Auth")
    let token = localStorage.getItem("token")
    if (Auth && token) {
        Auth = JSON.parse(Auth)
        token = JSON.parse(token)
    }
    const userData = {
        name: Auth.name,
        email: Auth.email,
        phone: Auth.phone,
        address: Auth.address,
        country: Auth.country,
        avatar: Auth.avatar
    }
    const url = "http://localhost:8080/laravel/laravel/public/api/user/update/" + Auth.id
    let accessToken = token;
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };

    const [inputs, setInputs] = useState(userData);
    const [errors, setErrors] = useState({});
    const [avatar, setAvatar] = useState({});
    const [file, setFile] = useState({});

    

    function handleUserInputFile(e){
        const file = e.target.files;

        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            setFile(file);
        };

        reader.readAsDataURL(file[0]);
    }

    const handleInputs = (e) => {
        let value = e.target.value
        let nameInput = e.target.name
        setInputs(state => ({...state, [nameInput]: value}))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const checkSizeImg = () => {
            const fileSize = file[0].size
            return fileSize < 1024*1024
        }
        const checkFileFormat = () => {
                const nameFile = file[0].name;

                const imgFormat = ["jpg","JPG","jpeg","png","PNG"];
                let fileUploadedFormat = nameFile.split(".")[1];
                return imgFormat.includes(fileUploadedFormat);
        }    
        // kiem tra xem toan bo size cua img da < 1mb chua 

        const errObj = {}
        let flag = true
        if (inputs.name === undefined) {
            flag = false;
            errObj.name = "Vui long nhap ten"
        }
        if (inputs.email === undefined) {
            flag = false;
            errObj.email = "Vui long nhap email"
        } else {
            let validRegex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
            if (validRegex.test(inputs.email) === false) {
                flag = false
                errObj.email = "sai dinh dang email"
            } else {
                delete errObj.email
            }
        }
        if (inputs.address === undefined) {
            flag = false;
            errObj.address = "Vui long nhap address"
        }
        if (inputs.country === undefined) {
            flag = false;
            errObj.country = "Vui long nhap dat nuoc"
        }
        if (!!file[0]) {
            if (checkSizeImg()){
                if (checkFileFormat() === false) {
                    flag = false;
                    errObj.avatar = "file sai dinh dang"
                } else {
                    setErrors({})
                }
            } else {
                flag = false;
                errObj.avatar = "anh lon hon 1mb"
            }
        } else {
            flag = false;
            errObj.avatar = "Ban chua tai file"
        }

        
        if (!flag) {
            setErrors(errObj)
        } else {
            inputs.password = "123456"
            const formData = new FormData ();
             formData.append("email", inputs.email)
             formData.append("address", inputs.address)
             formData.append("country", inputs.country)
             formData.append("name", inputs.name)
             formData.append("phone", inputs.phone)
             formData.append("password", inputs.password)
            axios.post(url, formData, config)
            .then(res => { 
                if (res.data.errors) {
                    console.log(res.data.errors)
                } else {
                    alert("cap nhat thanh cong")
                    localStorage.setItem("Auth", JSON.stringify(res.data.Auth))
                }
            })
            .catch(err => console.log(err))
        }
    }

    const renderErr = () => {
        return Object.keys(errors).map((key) => {
            return  <li key={key}>{errors[key]}</li>
        })
    }

    return (
            <div style={{"margin-bottom": "100px"}} className="col-sm-4 col-sm-offset-2 m-b-xs">
                <div className="signup-form">
                    <h2>User Update!</h2>
                    <ul>
                        {Object.keys(errors).length > 0 && renderErr()}
                    </ul>
                    <form action="#" onSubmit={handleSubmit} encType="multipart/form-data" >
                        <input name='name' type="text" placeholder="Name" onChange={handleInputs} value={inputs.name} />
                        <input name='email' type="text" placeholder="Email Address" readOnly disabled value={inputs.email} />
                        <input name='phone' type="text" placeholder="Phone" onChange={handleInputs} value={inputs.phone} />
                        <input name='address' type="text" placeholder="Address" onChange={handleInputs} value={inputs.address} />
                        <input name='country' type="text" placeholder="Country" onChange={handleInputs} value={inputs.country} />
                        <input name='imgavatar' type="file" placeholder="Avatar" onChange={handleUserInputFile} />
                        <button type="submit" className="btn btn-default">Update</button>
                    </form>
                </div>
            </div>
    );
}

export default UserUpdate;
