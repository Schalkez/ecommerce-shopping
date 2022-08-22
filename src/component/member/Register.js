import React, {useState} from 'react';
import axios from 'axios';


function Register(props) {
    const [inputs, setInputs] = useState({});
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
        e.preventDefault();
        
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
        if (inputs.password === undefined) {
            flag = false;
            errObj.password = "Vui long nhap password"
        }
        if (inputs.address === undefined) {
            flag = false;
            errObj.address = "Vui long nhap address"
        }
        if (inputs.country === undefined) {
            flag = false;
            errObj.address = "Vui long nhap dat nuoc"
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
            inputs.level = 0
            inputs.avatar = avatar
            axios.post("http://localhost:8080/laravel/laravel/public/api/register", inputs)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            alert("dang ky thanh cong")
            console.log(inputs)
        }
    }

   
    const renderErr = () => {
        return Object.keys(errors).map((key) => {
            return  <li key={key}>{errors[key]}</li>
        })
    }
    
    

    return (
        <div className="signup-form">
            <h2>New User Signup!</h2>
            <ul>
                {Object.keys(errors).length > 0 && renderErr()}
            </ul>
            <form action="#" onSubmit={handleSubmit} encType="multipart/form-data" >
                <input name='name' type="text" placeholder="Name" onChange={handleInputs} />
                <input name='email' type="text" placeholder="Email Address" onChange={handleInputs} />
                <input name='password' type="password" placeholder="Password" onChange={handleInputs} />
                <input name='phone' type="text" placeholder="Phone" onChange={handleInputs} />
                <input name='address' type="text" placeholder="Address" onChange={handleInputs} />
                <input name='country' type="text" placeholder="Country" onChange={handleInputs} />
                <input name='imgavatar' type="file" placeholder="Avatar" onChange={handleUserInputFile} multiple />
                <button type="submit" className="btn btn-default">Signup</button>
            </form>
        </div>
    );
}

export default Register;