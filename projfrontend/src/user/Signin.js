import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Base from "../core/Base"

import { signin, authenticate, isAuthenticated } from "../auth/helper"


const Signin = () => {

  const [values, setValues] = useState({

    email: " ",
    password: " ",
    error: " ",
    loading: " ",
    didRedirect: false

  })


  const { email, password, error, loading, didRedirect } = values


  const { user } = isAuthenticated()


  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };



  const signInForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>

            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input onChange={handleChange("email")} value={email} type="email" className='form-control' />
            </div>

            <div className='form-group'>
              <label className='text-light'>Password</label>
              <input onChange={handleChange("password")} value={password} type="password" className='form-control' />
            </div>
            <br>

            </br>

            <button onClick={onSubmit} className='btn btn-success btn-block'>
              Submit
            </button>
          </form>
        </div>

      </div>
    )
  }

  const onSubmit = event => {

    event.preventDefault()

    setValues({ ...values, error: false, loading: true })

    signin({ email, password })
      .then(data => {

        if (data.error) {

          setValues({ ...values, error: data.error, loading: false })

        } else {
          
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            })
          })

        }

      })
      .catch(console.log("sign in req failed"))
  }

  const performRedirect = () => {
    if(didRedirect){
      if(user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }

    if(isAuthenticated()){
      return <Redirect to="/" />
    }
  }

  const loadingMessage = () => {
    return (
      loading && (
        <div className='alert alert-info'>
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title='Sign In Page' description='a Page for user to sign In!!'>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className='text-white text-center'>{JSON.stringify(values)}</p>
    </Base>
  )
}

export default Signin