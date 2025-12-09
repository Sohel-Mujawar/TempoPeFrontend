import React from 'react';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {FormProvider, useForm} from 'react-hook-form';
import {
  MdLocationPin,
  MdLocationOn,
  MdPerson,
  MdMobileFriendly,
  MdPinDrop,
  MdOpacity,
  MdLocalBar,
  MdCarRental,
} from 'react-icons/md';
import sideimage from '@/assets/images/register/formregister.png';
import GenericDropdown from '../Forms/DropDown/GenericDropDown';

const DriverRegister = () => {
  const methods = useForm({
    defaultValues: {
      city: '',
      pickup: '',
      drop: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    alert(JSON.stringify(data, null, 2));
  };
  return (
    <FormProvider {...methods}>
      <div className="flex h-[80vh] w-full flex-col items-center justify-center md:flex-row md:justify-between">
        {/* LEFT IMAGE */}
        <div className="hidden h-full w-full items-center justify-center md:flex md:w-1/2">
          <img src={sideimage} className="w-[50%] object-contain" />
        </div>

        {/* RIGHT FORM */}
        <div className="flex w-full flex-col items-center md:w-1/2">
          <h1 className="mb-2 text-5xl font-extrabold text-teal-900">
            Your Vehicle, Your Business
          </h1>
          <p className="text-gray-600 mb-6 text-xl text-black-2">
            Transform your truck/bike into a revenue generator.
          </p>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
          >
            <GenericInputField
              name="Name"
              placeholder="Enter Name"
              icon={<MdPerson className="text-gray-600 h-5 w-5" />}
              validation={{required: 'Name is required'}}
            />

            <GenericInputField
              name="Phone"
              placeholder="Enter Phone"
              icon={<MdMobileFriendly className="text-gray-600 h-5 w-5" />}
              validation={{required: 'Phone is required'}}
            />
            <GenericDropdown
              name="Vehicle"
              options={[
                {value: 'Tata', label: 'Tata'},
                {value: 'Birla', label: 'Birla'},
                {value: 'Bajaj', label: 'Bajaj'},
                {value: 'Hero', label: 'Hero'},
              ]}
              icon={<MdCarRental className="text-gray-600 h-5 w-5" />}
              validation={{required: 'City is required'}}
              placeholder="Select Vehicle" // Custom placeholder text
              disabled={false} // Optional: disable if needed
              onSelect={(value) => console.log('Selected:', value)} // Optional: callback on selection
              hoverColor="hover:bg-teal-200 dark:hover:bg-teal-600" // Hover color for dropdown options (Tailwind classes)
              dropdownBg="bg-white dark:bg-gray-800" // Background for the open dropdown list
              dropdownBorder="border border-teal-200 dark:border-teal-600 shadow-md" // Border/shadow for dropdown list
              selectedBg="bg-gray-50 dark:bg-gray-700" // Background for the selected value/input area
              rounded="rounded-xl" // Corner radius (use 'rounded-md', 'rounded-lg', etc.)
              position="absolute" // Or 'fixed' for fixed positioning relative to viewport
              className="w-full" // Optional: additional Tailwind classes for the whole component
            />
            <GenericDropdown
              name="City"
              options={[
                {value: 'Sangli', label: 'Sangli'},
                {value: 'Kolhapur', label: 'Kolhapur'},
                {value: 'Solapur', label: 'Solapur'},
                {value: 'Satara', label: 'Satara'},
              ]}
              icon={<MdLocationOn className="text-gray-600 h-5 w-5" />}
              validation={{required: 'City is required'}}
              placeholder="Select City" // Custom placeholder text
              disabled={false} // Optional: disable if needed
              onSelect={(value) => console.log('Selected:', value)} // Optional: callback on selection
              hoverColor="hover:bg-teal-200 dark:hover:bg-teal-600" // Hover color for dropdown options (Tailwind classes)
              dropdownBg="bg-white dark:bg-gray-800" // Background for the open dropdown list
              dropdownBorder="border border-teal-200 dark:border-teal-600 shadow-md" // Border/shadow for dropdown list
              selectedBg="bg-gray-50 dark:bg-gray-700" // Background for the selected value/input area
              rounded="rounded-xl" // Corner radius (use 'rounded-md', 'rounded-lg', etc.)
              position="absolute" // Or 'fixed' for fixed positioning relative to viewport
              className="w-full" // Optional: additional Tailwind classes for the whole component
            />

            <button
              type="submit"
              className="focus:ring-gray-300 w-full rounded-lg bg-teal-900 px-4 py-3 font-semibold text-white shadow-md transition-all hover:bg-teal-800 focus:ring-2"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default DriverRegister;
