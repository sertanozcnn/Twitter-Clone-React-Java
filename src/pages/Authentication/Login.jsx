import { Alert, CircularProgress, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { loginUserAction } from '../../Redux/Auth/auth.action';

const initialValues = { email: "", password: "" }



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


const Login = () => {

  const [loading, setLoading] = useState(false); // State to manage loading

  const [error, setError] = useState('');

  const [success,setSucess] = useState('');


  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Login';
    if (success) {
      const timer = setTimeout(() => {
        setSucess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);


  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');
    try {
      await dispatch(loginUserAction({ data: values }));
      
      setTimeout(() => {
        setLoading(false);
        window.location.href = '/';
        setSucess('Login successful.')
      }, 3000
    
    
    );
    } catch (err) {
      setLoading(false);
      setError('Account not found.');
      setTimeout(() => {
        setError(''); // Clear error message after 4 seconds
      }, 3000);
    }
  };


  return (
    <>

      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.email.includes('@')) {
            errors.email = 'Invalid email address';
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
              <label htmlFor="email" className="block mb-2 text-sm font-kanit ml-1" style={{ color: 'white' }}>Email</label>
              <Field
                as={TextField}
                name="email"
                className=" shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                type="email" variant="outlined" fullWidth />
              <ErrorMessage name="email" component={"div"} className='font-kanit text-gray-100 ml-1 mt-2' />

            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-kanit ml-1" style={{ color: 'white' }}>Password</label>
              <Field
                as={TextField}
                name="password"
                className="shadow-sm bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                type="password" variant="outlined" fullWidth />
              <ErrorMessage name="password" component="div" className='font-kanit text-gray-100 ml-1 mt-2' />

            </div>
          </div>


          <button type="submit"
                     className="
                     w-full 
                     font-kanit 
                     rounded-lg 
                     text-sm 
                     px-5 
                     py-3 
                     text-center 
                     text-gray-100
                     justify-center 
                     relative
                     overflow-hidden 
                     bg-blue-800 
                     
                     relative
                     dark:hover:bg-blue-700 
                     dark:hover:border-gray-600
         
                           
                     transition-all 
                     duration-300
                     before:absolute 
                     before:inset-0 
                     before:border-0 
                     before:border-white
                    before:duration-100 
                    before:ease-linear 
                    
                    hover:shadow-blue-600 
                     "
          
                    >
                    <span className="relative z-10">Login</span>
          
                    
                    </button>

          <button type="submit"
            className="w-full 
            text-white 
            font-kanit  
            bg-white border 
            border-gray-300  
            rounded-lg 
            text-sm 
            px-5 
            py-3 
            text-center 
            relative
            dark:hover:bg-blue-700 
            dark:hover:border-gray-600

                  
            transition-all 
            duration-300
            before:absolute 
            before:inset-0 
            before:border-0 
            before:border-white
           before:duration-100 
           before:ease-linear 
           hover:text-blue-800 
           hover:shadow-blue-600 
          
          " style={{ color: 'white' }}
          
          >
            
            Forgot Password ?
            
            </button>

          <p className="text-sm font-light text-gray-100 font-kanit justify-center">
            Don’t have an account yet? <a href="/register" className="font-medium text-blue-200 hover:underline">Sign up</a>
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

export default Login;
