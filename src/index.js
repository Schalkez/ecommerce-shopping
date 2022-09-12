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
import IndexLoginRegister from './component/member/IndexLoginRegister';
import UserUpdate from './component/member/UserUpdate';
import UserAddProduct from './component/member/UserAddProduct';
import UserEditProduct from './component/member/UserEditProduct';
import MyProduct from './component/member/MyProduct';
import IndexProductDetail from './component/Products/IndexProductDetail';
import Cart from './component/Products/Cart';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App>
          <Routes>
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/blog/detail/:id' element={<BlogDetail/>}/>
            <Route path='/login-register' element={<IndexLoginRegister/>}/>
            <Route path='/account' element={<UserUpdate/>}/>
            <Route path='/add-new-product' element={<UserAddProduct/>}/>
            <Route path='/user-edit-product' element={<UserEditProduct/>}/>
            <Route path='/my-product' element={<MyProduct/>}/>
            <Route path='/products/cart' element={<Cart/>}/>
            <Route path='/products/product-detail/:id' element={<IndexProductDetail/>}/>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/' element={<Home/>}/>
          </Routes>
        </App>
      </Router>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
