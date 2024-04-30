import { Button, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../Redux/Auth/auth.action';


const initialValues = { firstName: "", lastName: "", email: "", password: "", gender: "" }
const validationSchema = {
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
};
const Register = () => {

  const [gender, setGender] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    // Değerleri kopyala
    const updatedValues = { ...values };
    // Gender değerini atayıp kopyayı kullan
    updatedValues.gender = gender;
    console.log("handle submit", updatedValues);
    // Güncellenmiş değerleri kullan
    dispatch(registerUserAction({ data: updatedValues }))
  };

  const handleChange = (event) => {
    console.log(event.target.value); // Değeri kontrol etmek için konsola yazdırın
    setGender(event.target.value);
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
              <label htmlFor="firstName" className="block mb-1 text-sm font-kanit ml-1" style={{ color: 'white' }}>First Name</label>

              <Field
                as={TextField}
                name="firstName"
                className=" shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                type="text" variant="outlined" fullWidth />
              <ErrorMessage name="firstName" component={"div"} className='text-red-500' />

            </div>

            <div>
              <label htmlFor="lastName" className="block mb-1 text-sm font-kanit ml-1" style={{ color: 'white' }}>Last Name</label>
              <Field
                as={TextField}
                name="lastName"
                className=" shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                type="text" variant="outlined" fullWidth />
              <ErrorMessage name="lastName" component="div" className='text-red-500' />

            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-kanit ml-1" style={{ color: 'white' }}>Email</label>
              <Field
                as={TextField}
                name="email"
                className=" shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="socialmix@gmail.com" type="email" variant="outlined" fullWidth />
              <ErrorMessage name="email" component={"div"} className='text-red-500' />

            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-kanit ml-1" style={{ color: 'white' }}>Password</label>
              <Field
                as={TextField}
                name="password"
                className=" shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                type="password" variant="outlined" fullWidth />
              <ErrorMessage name="password" component="div" className='text-red-500' />

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
              <ErrorMessage name="gender" component="div" className="text-red-500" />

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

    </>
  )
}

export default Register;
