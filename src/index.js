import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import './index.css';
import App from './App';
import Home from './component/Home/Home';
import Blog from './component/Blog/Blog';
import BlogDetail from './component/Blog/BlogDetail/BlogDetail';
import Index  from './component/member/Index';
import UserUpdate from './component/member/UserUpdate';
import UserAddProduct from './component/member/UserAddProduct';
import UserEditProduct from './component/member/UserEditProduct';
import MyProduct from './component/member/MyProduct';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/blog/detail/:id' element={<BlogDetail/>}/>
          <Route path='/login-register' element={<Index/>}/>
          <Route path='/account' element={<UserUpdate/>}/>
          <Route path='/add-new-product' element={<UserAddProduct/>}/>
          <Route path='/user-edit-product' element={<UserEditProduct/>}/>
          <Route path='/my-product' element={<MyProduct/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/' element={<Home/>}/>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// link api:
// http://localhost:8080/laravel/laravel/public/api/login
// http://localhost:8080/laravel/laravel/public/api/blog

// - lam 1 web mua ban
//  + backend: cung cap api (cai nay a dang cai)
//  + frontend: lay api ve xu ly va hien thi len web 
//    + tao giao dien va chuyen giao dien vao reactjs (frontend.zip)
//     ++ tao 2 trang router blog va blog detail vao, chu y nhung phan chung nhu Headers, menu screenLeft, footer co dinh 
//     ++ goi api ve xu ly va thay doi trang blog 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
