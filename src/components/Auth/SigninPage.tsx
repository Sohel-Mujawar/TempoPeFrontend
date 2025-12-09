import {SignIn} from '@/pages';
import React from 'react';

const SigninPage = () => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex flex-1 items-center justify-center bg-white px-4 py-8 dark:bg-boxdark-2 sm:px-6 lg:px-8 lg:py-12">
        <div className="w-full max-w-md">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
