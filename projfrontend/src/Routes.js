import React from 'react'
import {Switch, Route,  BrowserRouter } from 'react-router-dom'
import AdminRoute from './auth/helper/AdminRoutes'
import Home from './core/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import { updateProduct } from './admin/helper/adminapicall'
import UpdateProduct from './admin/UpdateProduct'
import Cart from './core/Cart'









const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute  path="/user/dashboard" exact component={UserDashBoard}/>
        <AdminRoute  path="/admin/dashboard" exact component={AdminDashBoard}/>
        <AdminRoute  path='/admin/create/category' exact component={AddCategory}/>
        <AdminRoute  path='/admin/categories' exact component={ManageCategories}/>
        <AdminRoute  path='/admin/create/product' exact component={AddProduct}/>
        <AdminRoute  path='/admin/products' exact component={ManageProducts}/>
        <AdminRoute  path="/admin/product/update/:productId" exact component={UpdateProduct}/>
        <Route path="/cart" exact component={Cart} />

      </Switch>
    </BrowserRouter>
  )
}

export default Routes