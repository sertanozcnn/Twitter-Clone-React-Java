import {Alert, Button, TextField, Radio, RadioGroup, FormControlLabel, CircularProgress } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../Redux/Auth/auth.action';




function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C8865B" />
            <stop offset="100%" stopColor="#F58943" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress thickness={6} sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
  );
}



const initialValues = { firstName: "", lastName: "", email: "", password: "", gender: "" }




const Register = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 4000);
      return () => clearTimeout(timer);

    }

  }, [success]);


  const [gender, setGender] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');
    const updatedValues = { ...values };
    updatedValues.gender = gender;


    console.log("handle submit", updatedValues);

    try {
      await dispatch(registerUserAction({ data: updatedValues }));

      setTimeout(() =>{
        setLoading(false);
        window.location.href = '/';
        setSuccess('Registered successfully');

      },4000);

    }catch (err) {
      setLoading(false);
      setError('Something went wrong');
      setTimeout(() =>{
        setError('');
      },3000);

    }


  };

  const handleChange = (event) => {
    console.log(event.target.value); // Değeri kontrol etmek için konsola yazdırın
    setGender(event.target.value);

  };

  return (
    <>

      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.firstName.trim()) {
            errors.firstName = 'Invalid First Name';
          }
          if (!values.lastName.trim()) {
            errors.lastName = 'Invalid Last Name';
          }
          if (!values.email.includes('@')) {
            errors.email = 'Invalid Email Address';
          }
          if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
          }
          return errors;
        }}

        onSubmit={handleSubmit}

      >
        <Form className="space-y-5">

          <div className="space-y-5">
            <div>
              <label htmlFor="firstName" className="block mb-1 text-sm font-kanit ml-1" style={{ color: 'white' }}>First Name</label>

              <Field
                as={TextField}
                name="firstName"
                className=" shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                type="text" variant="outlined" fullWidth />
              <ErrorMessage name="firstName" component={"div"} className='font-kanit text-gray-100 ml-1 mt-2' />

            </div>





            <div>
              <label htmlFor="lastName" className="block mb-1 text-sm font-kanit ml-1" style={{ color: 'white' }}>Last Name</label>
              <Field
                as={TextField}
                name="lastName"
                className=" shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                type="text" variant="outlined" fullWidth />
              <ErrorMessage name="lastName" component="div" className='font-kanit text-gray-100 ml-1 mt-2' />

            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-kanit ml-1" style={{ color: 'white' }}>Email</label>
              <Field
                as={TextField}
                name="email"
                className=" shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="socialmix@gmail.com" type="email" variant="outlined" fullWidth />
              <ErrorMessage name="email" component={"div"} className='font-kanit text-gray-100 ml-1 mt-2' />

            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-kanit ml-1" style={{ color: 'white' }}>Password</label>
              <Field
                as={TextField}
                name="password"
                className=" shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                type="password" variant="outlined" fullWidth />
              <ErrorMessage name="password" component="div" className='font-kanit text-gray-100 ml-1 mt-2' />

            </div>

            <RadioGroup
              row
              aria-labelledby="gender"
              name="gender"
              value={gender}
              onChange={handleChange}
            >
              <FormControlLabel
                style={{ color: 'white' }}
                name='female'
                value="female"
                control={<Radio style={{ color: 'white' }} />} label="Female" />

              <FormControlLabel style={{ color: 'white' }} name='male' value="male" control={<Radio style={{ color: 'white' }} />} label="Male" />
              <ErrorMessage name="gender" component="div" className='font-kanit text-gray-100 ml-1 mt-2' />

            </RadioGroup>







          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
            </div>
            <label htmlFor="terms" className="ms-2 text-sm font-kanit dark:text-gray-300" style={{ color: 'white' }}>I agree with the <a href="#" className="text-gray-100 hover:underline " style={{ textDecoration: 'underline' }}> terms and conditions</a></label>
          </div>
          <button type="submit"
            className="w-full text-white bg-blue-800 
          hover:bg-blue-700  font-kanit 
           rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700" style={{ color: 'white' }}>Register</button>

          <p class="text-sm font-light text-gray-100 font-kanit justify-center">
            If you have already account? <a href="/login" class="font-medium text-blue-200 hover:underline">Sign in</a>
          </p>

        </Form>



      </Formik>


      {loading && (
        <div
          className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <GradientCircularProgress thickness={6} />
        </div>
      )}

      {error && (
        <div
          className="fixed bottom-4 left-0 right-0 flex justify-center"
        >
          <Alert
            variant="filled" 
            severity="error"
            style={{ color: 'white' }}
          >
            {error}
          </Alert>
        </div>
      )}

{success && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
          <Alert variant="filled" severity="success" style={{ color: 'white' }}>
            {success}
          </Alert>
        </div>
      )}


    </>
  )
}

export default Register;
