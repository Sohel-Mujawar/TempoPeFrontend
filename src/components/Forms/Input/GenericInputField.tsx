import React from 'react';
import {useFormContext, RegisterOptions} from 'react-hook-form';

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  validation?: RegisterOptions;
  disabled?: boolean;
  icon?: React.ReactNode; // Customizable icon prop (e.g., <PinIcon /> or SVG)
  iconPosition?: 'left' | 'right'; // Optional: position for icon (default: left)
}

const GenericInputField: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  validation,
  disabled = false,
  icon,
  iconPosition = 'left',
}) => {
  const {
    register,
    formState: {errors},
    setValue,
  } = useFormContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    if (type === 'number') {
      setValue(name, Number(value));
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2.5 block text-black dark:text-white">
          {label}
        </label>
      )}
      <div
        className={`border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 flex w-full items-center rounded-lg border px-3 py-2 focus-within:border-blue-300 focus-within:bg-white dark:focus-within:border-blue-400 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        {icon && iconPosition === 'left' && (
          <div className="mr-2 flex-shrink-0">{icon}</div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className="placeholder-gray-500 dark:placeholder-gray-400 flex-1 bg-transparent px-1 py-1 text-sm text-black outline-none transition dark:text-white"
          disabled={disabled}
          {...register(name, validation)}
          onChange={handleInputChange}
        />
        {icon && iconPosition === 'right' && (
          <div className="ml-2 flex-shrink-0">{icon}</div>
        )}
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default GenericInputField;
