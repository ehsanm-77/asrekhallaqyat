import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';

import Link from 'next/link';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';

const AdminForm = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [animate, setAnimate] = useState(false);

  const switchToLogin = () => {
    setActiveTab('login');
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  };

  const switchToSignup = () => {
    setActiveTab('signup');
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  };

  return (
    <>
      <div>
        <div className="w-full flex">
          <button
            className={`w-1/2 mb-5 mt-3 py-2 px-4 rounded-r-md ${
              activeTab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={switchToLogin}
          >
            ورود
          </button>
          <button
            className={`w-1/2 mb-5 mt-3 py-2 px-4 rounded-l-md ${
              activeTab === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={switchToSignup}
          >
            ثبت نام
          </button>
        </div>
        <div className={`${animate ? 'animate' : ''}`}>
          {activeTab === 'login' && <LoginForm />}
          {activeTab === 'signup' && (
            <SignUpForm switchToLogin={switchToLogin} />
          )}
        </div>

        <div>
          <Link href="/">
            <Button
              sx={{
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              بازگشت به صفحه اصلی
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminForm;
