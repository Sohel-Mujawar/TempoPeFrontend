import Header from '@/components/Header';
import { Footer } from '@/components/LandingComponents';
import {useAuthContext} from '@/context/AuthContext';
import {Navigate, Outlet} from '@tanstack/react-router';
import React from 'react';

const AppLayout = () => {
  const {isAuthenticated} = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <main>
            <div className="mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
