import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import GenericSelectButton from '../../Forms/GenericSelectButton/GenericSelectButton';
import {useNavigate} from '@tanstack/react-router';

const SelectService = () => {
  const methods = useForm();
  const [selectedService, setSelectedService] = useState<
    'business' | 'personal' | null
  >(null);

  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mx-auto flex max-w-md flex-col gap-6 p-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-black">
            Choose service type
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Select business for Full truck or partload or personal for household
            goods
          </p>

          <div className="space-y-4">
            <GenericSelectButton
              label="Business"
              description="Industrial, Commercial or Enterprise goods"
              isSelected={selectedService === 'business'}
              onClick={() => {
                setSelectedService('business');
                methods.setValue('serviceType', 'business');
              }}
            />

            <GenericSelectButton
              label="Personal"
              description="Household or personal Goods"
              isSelected={selectedService === 'personal'}
              onClick={() => {
                setSelectedService('personal');
                methods.setValue('serviceType', 'personal');
                navigate({to: `/booking/loadservice`});
              }}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default SelectService;
