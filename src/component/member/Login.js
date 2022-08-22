import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function Login(props) {
    const [inputs, setInputs] = useState({});
    const [errs, setErrs] = useState({});
    const [checkBox, setCheckBox] = useState("checked");
    const navigate = useNavigate()

    const handleCheckBox = (e) => {
        setCheckBox(e.target.checked)
        console.log(checkBox)
    }
    const handleInputs = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value
        setInputs(state => ({...state, [nameInput]:valueInput}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const errObj = {}
        let flag = true
        if (inputs.name === undefined) {
            flag = false;
            errObj.name = "Ban chua nhap ten"
        }
        if (inputs.password === undefined) {
            flag = false;
            errObj.password = "Ban chua nhap password"
        }
        if (inputs.email === undefined) {
            flag = false;
            errObj.email = "Ban chua nhap email"
        } else {
            let validRegex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
            if (validRegex.test(inputs.email) === false) {
                flag = false
                errObj.email = "sai dinh dang email"
            } else {
                setErrs({})
            }
        }
        if (!flag) {
            setErrs(errObj)
        } else {
            inputs.level = 0
            axios.post("http://localhost:8080/laravel/laravel/public/api/login", inputs)
            .then(res => {
                if (res.data.errors) {
                    alert(res.data.errors.errors)
                } else {
                    navigate("/home");
                    let isLogin = true;
                    localStorage.setItem("isLogin", JSON.stringify(isLogin));
                    localStorage.setItem("Auth", JSON.stringify(res.data.Auth));
                    localStorage.setItem("token", JSON.stringify(res.data.success.token));

                    window.location.reload();
                }
            })
            .catch(err => alert(err))
        }
        
    }

    const renderErrs = () => {
        if (Object.keys(errs).length > 0) {
            return Object.keys(errs).map((key) => {
                return (
                    <li key={key}>{errs[key]}</li>
                )
            })
        }
    }
    

    return (
        <div className="login-form">
            <h2>Login to your account</h2>
            <ul>{renderErrs()}</ul>
            <form action="#" onSubmit={handleSubmit}>
                <input name='name' type="text" placeholder="Name" onChange={handleInputs} />
                <input name='email' type="text" placeholder="Email Address" onChange={handleInputs} />
                <input name='password' type="password" placeholder="Password" onChange={handleInputs} />
                <span>
                    <input type="checkbox" className="checkbox" value={checkBox} onChange={handleCheckBox} /> 
                    Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">Login</button>
            </form>
        </div>
    );
}

export default Login;