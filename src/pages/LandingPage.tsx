import React from 'react';
import PickupandDrop from './Home/P&D/PickupandDrop';
import OurServices from './Home/OurServices/OurServices';
import Reviews from './Home/Review/Reviews';
import SelectService from '../components/TempoBooking/SelectService';

const LandingPage = () => {
  return (
    <div>
      <PickupandDrop />
      {/* <SelectService /> */}
      <OurServices />
      <Reviews />
    </div>
  );
};

export default LandingPage;
