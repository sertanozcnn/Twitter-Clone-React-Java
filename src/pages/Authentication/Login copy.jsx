import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { loginUserAction } from '../../Redux/Auth/auth.action';

const initialValues = { email: "", password: "" }

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("handle submit", values);
    dispatch(loginUserAction({ data: values }))
  };

  return (
    <>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-kanit ml-1" style={{color:'white'}}>Email</label>
          <input type="email" id="email"  className="shadow-sm bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-kanit  ml-1" style={{color:'white'}}>Password</label>
          <input type="password" id="password" className="shadow-sm bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light" required />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label htmlFor="terms" className="ms-2 text-sm font-kanit dark:text-gray-300" style={{color:'white'}}>I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500" style={{textDecoration:'underline'}}> terms and conditions</a></label>
        </div>
        <button type="submit" className="text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-kanit  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700" style={{color:'white'}}>Login</button>
      </form>
    </>
  )
}

export default Login;
