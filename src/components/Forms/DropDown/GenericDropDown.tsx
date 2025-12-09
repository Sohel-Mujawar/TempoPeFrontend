/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useRef, useEffect} from 'react';
import {useFormContext, RegisterOptions, useWatch} from 'react-hook-form';
import {DownIcon} from '../../../icons';

interface Option {
  value: string;
  label: string;
}

interface GenericDropdownProps {
  name: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  validation?: RegisterOptions;
  disabled?: boolean;
  icon?: React.ReactNode; // Custom icon for left side
  onSelect?: (value: string) => void;
  hoverColor?: string;
  dropdownBg?: string;
  dropdownBorder?: string;
  selectedBg?: string;
  rounded?: string;
  className?: string;
  position?: 'absolute' | 'fixed';
}

const GenericDropdown: React.FC<GenericDropdownProps> = ({
  name,
  label,
  options,
  placeholder = `Select ${label || 'option'}`,
  validation,
  disabled = false,
  icon: customIcon, // Always placed on left if provided
  onSelect,
  hoverColor = 'hover:bg-lime-800 dark:hover:bg-lime-900/20',
  dropdownBg = 'bg-white dark:bg-gray-800',
  dropdownBorder = 'border border-gray-200 dark:border-gray-600 shadow-lg',
  selectedBg = 'bg-gray-50 dark:bg-gray-700',
  rounded = 'rounded-xl',
  className = '',
  position = 'absolute',
}) => {
  const {
    register,
    setValue,
    formState: {errors},
  } = useFormContext();
  const watchedValue = useWatch({name});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Register the field for validation
  useEffect(() => {
    register(name, validation);
  }, [register, name, validation]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get selected label
  const selectedLabel = watchedValue
    ? options.find((opt) => opt.value === String(watchedValue))?.label ||
      String(watchedValue)
    : '';

  const handleSelect = (value: string) => {
    setValue(name, value, {shouldValidate: true});
    setIsOpen(false);
    if (onSelect) onSelect(value);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* {label && (
        <label className="mb-2.5 block text-black dark:text-white">
          {label}
        </label>
      )} */}
      <div
        className={`relative flex w-full items-center ${rounded} ${selectedBg} border-gray-200 dark:border-gray-600 dark:bg-gray-700 border px-3 py-2 focus-within:border-lime-500 focus-within:bg-white dark:focus-within:border-lime-400 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`}
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleDropdown();
        }}
      >
        {/* Custom icon on left */}
        {customIcon && <div className="mr-2 flex-shrink-0">{customIcon}</div>}
        {/* Selected value */}
        <div
          className={`flex-1 select-none px-1 py-1 text-sm outline-none transition ${
            !selectedLabel
              ? 'text-gray-500 dark:text-gray-400'
              : 'text-black dark:text-white'
          }`}
        >
          {selectedLabel || placeholder}
        </div>
        {/* Dynamic DownIcon on right */}
        <div className="ml-auto flex-shrink-0">
          <DownIcon
            className={`${isOpen ? 'rotate-180' : ''} text-gray-600 h-5 w-5 transition-transform`}
          />
        </div>
      </div>

      {/* Custom Dropdown List */}
      {isOpen && (
        <div
          className={`mt-1 w-full ${position} z-50 ${dropdownBg} ${dropdownBorder} ${rounded} max-h-60 overflow-y-auto ${
            position === 'fixed' ? 'fixed' : 'absolute'
          } left-0 ${position === 'absolute' ? 'top-full' : ''}`}
        >
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer px-3 py-2 text-sm text-black dark:text-white ${hoverColor}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default GenericDropdown;
