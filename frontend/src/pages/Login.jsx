import React, { Fragment } from 'react'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik'

const Login = () => {
  const [language, setLanguage] = useState('en')
  const navigate = useNavigate()
  
  const handleSubmit = ({ email, password }) => {
    BACKEND_CLIENT.post('/token', {email,password})
      .then(res => {if (res.data.access){
          localStorage.setItem("access_token", res.data.access);
        }
        navigate('/')
      }).catch(error =>{
        alert(error.response.data.detail)
      });
  }  

  return (
    <div className="min-h-screen flex items-center justify-center">
        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
          {({ isSubmitting }) => {
            return (<form onSubmit={handleSubmit} noValidate autoComplete="off" >
              <h1 className="mb-4 text-2xl">CareFlow Login</h1>
              <div className="mb-2">
                  <Field type='email' name="email" placeholder="Email"/>
              </div>
              <div className="relative mb-5">
                <Field type='password' name="password" placeholder="Password"/>
              </div>                
              <input 
                type='submit'
                disabled={isSubmitting}
                value={'Log In'} 
                className={`w-full rounded bg-blue-600 text-white px-2 py-1 ${isSubmitting && 'opacity-50'}`}       
              />
            </form>)          
          }}
        </Formik>
    </div>    
  )
}

export default Login;