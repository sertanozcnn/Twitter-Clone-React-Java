import { TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as Yup from "yup";
import { loginUserAction } from '../../Redux/Auth/auth.action';

const initialValues = { email: "", password: "" }
const validationSchema = {
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
};
const Login = () => {

  const [formValue, setFromValue] = useState();

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("handle submit", values);
    dispatch(loginUserAction({ data: values }))
  };



  return (
    <>

      <Formik
        initialValues={initialValues}
        //validationSchema={validationSchema}

        onSubmit={handleSubmit}

      >
        <Form className="space-y-5">

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-kanit ml-1" style={{ color: 'white' }}>Email</label>
              <Field
                as={TextField}
                name="email"
                className=" shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="socialmix@gmail.com" type="email" variant="outlined" fullWidth />
              <ErrorMessage name="email" component={"div"} className='text-red-500' />

            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-kanit ml-1" style={{ color: 'white' }}>Password</label>
              <Field
                as={TextField}
                name="password"
                className="shadow-sm bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                type="password" variant="outlined" fullWidth />
              <ErrorMessage name="password" component="div" className='text-red-500' />

            </div>
          </div>


          <button type="submit"
            className="w-full text-white bg-blue-800 
          hover:bg-blue-700  font-kanit 
           rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700" style={{ color: 'white' }}>Login</button>
          <button type="submit"
            className="w-full text-white 
          bg-white border border-gray-300  font-kanit  
          rounded-lg text-sm px-5 py-3 text-center 
          dark: hover:bg-blue-700 dark:hover:border-gray-600" style={{ color: 'white' }}>Forgot Password ?</button>

          <p class="text-sm font-light text-gray-100 font-kanit justify-center">
            Don’t have an account yet? <a href="/register" class="font-medium text-blue-200 hover:underline">Sign up</a>
          </p>

        </Form>





      </Formik>

    </>
  )
}

export default Login;
