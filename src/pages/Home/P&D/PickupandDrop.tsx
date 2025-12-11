import GenericInputField from '@/components/Forms/Input/GenericInputField';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {MdLocationPin, MdLocationOn} from 'react-icons/md';
import sideimage from '@/assets/images/truck/sideimage.png';
import ChooseCity from '@/common/ChooseCity';
import {useNavigate} from '@tanstack/react-router';

const PickupAndDrop = () => {
  const [cityModal, setCityModal] = useState(false);

  const methods = useForm({
    defaultValues: {
      city: '',
      pickup: '',
      drop: '',
    },
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <FormProvider {...methods}>
      {cityModal && (
        <ChooseCity
          onClose={() => setCityModal(false)}
          onSelect={(cityName) => methods.setValue('city', cityName)}
        />
      )}

      <div className="flex h-[80vh] w-full flex-col items-center justify-center md:flex-row md:justify-between">
        {/* LEFT IMAGE */}
        <div className="hidden h-full w-full items-center justify-center md:flex md:w-1/2">
          <img src={sideimage} className="w-[70%] object-contain" />
        </div>

        {/* RIGHT FORM */}
        <div className="flex w-full flex-col items-center md:w-1/2">
          <h1 className="mb-2 text-3xl font-bold text-teal-900">
            Delivering Your Goods On Time, Every Time{' '}
          </h1>

          <p className="text-gray-600 mb-6 text-xl text-black-2">
            Choose your destination and book a tempo instantly.
          </p>

          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
          >
            {/* SELECT CITY */}
            <button
              type="button"
              onClick={() => setCityModal(true)}
              className="flex items-center gap-2 rounded-lg px-3 py-2"
            >
              {/* LEFT ICON */}
              <MdLocationOn className="h-5 w-5 text-black" />

              {/* TEXT */}
              <span className="text-[17px] text-black">
                City:{' '}
                <strong className="font-semibold">
                  {methods.watch('city') || 'Select City'}
                </strong>
              </span>

              {/* RIGHT ARROW */}
              <span className="ml-1 text-[14px] text-black">▼</span>
            </button>

            <GenericInputField
              name="pickup"
              placeholder="Enter pickup location"
              icon={<MdLocationPin className="text-gray-600 h-5 w-5" />}
              validation={{required: 'Pickup location is required'}}
            />

            <GenericInputField
              name="drop"
              placeholder="Enter drop location"
              icon={<MdLocationOn className="text-gray-600 h-5 w-5" />}
              validation={{required: 'Drop location is required'}}
            />

            <button
              type="button"
              onClick={() => navigate({to: `/booking/service`})}
              className="focus:ring-gray-300 w-full rounded-lg bg-teal-900 px-4 py-3 font-semibold text-white shadow-md transition-all hover:bg-teal-800 focus:ring-2"
            >
              Get An Estimate
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default PickupAndDrop;
