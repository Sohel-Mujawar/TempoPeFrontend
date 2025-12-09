import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

interface GenericRadioButtonProps {
  name: string;
  label: string;
  options: {value: boolean; label: string}[];
  error?: string;
}

const GenericRadioButton: React.FC<GenericRadioButtonProps> = ({
  name,
  label,
  options,
  error,
}) => {
  const {control} = useFormContext();

  return (
    <div className="mb-4">
      <label className="text-gray-700 mb-1 block text-sm font-medium">
        {label}
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <Controller
            key={`${name}-${option.value}`}
            name={name}
            control={control}
            render={({field}) => (
              <label
                htmlFor={`${name}-${option.value}`}
                className="flex cursor-pointer select-none items-center"
              >
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    id={`${name}-${option.value}`}
                    name={name}
                    value={option.value.toString()}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    className="sr-only"
                    aria-checked={field.value === option.value}
                  />
                  <div
                    className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                      field.value === option.value
                        ? 'bg-gray-100 dark:bg-gray-800 border-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full bg-blue-500 transition-opacity ${
                        field.value === option.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                  </div>
                  <span className="text-gray-700">{option.label}</span>
                </div>
              </label>
            )}
          />
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default GenericRadioButton;
