/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useEffect, useRef, useMemo} from 'react';
import {DownIcon, XIcon} from '../../../icons'; // Adjust path to your icons
import {useFormContext, Controller} from 'react-hook-form';
import {FiFilter} from 'react-icons/fi';

interface Option {
  value: string;
  label: string;
}

interface GenericFilterDropdownProps {
  name: string;
  label?: string;
  filterType: 'month' | 'year' | 'day';
  data?: any[]; // Data to extract unique years or days
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  multiSelect?: boolean;
  className?: string;
}

const GenericFilterDropdown: React.FC<GenericFilterDropdownProps> = ({
  name,
  label = 'Filter',
  filterType,
  data = [],
  value: externalValue,
  onChange,
  placeholder = 'Search...',
  multiSelect = false,
  className = '',
}) => {
  const {control} = useFormContext();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array.isArray(externalValue)
      ? externalValue
      : externalValue
        ? [externalValue]
        : [],
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Generate options based on filterType
  const options: Option[] = useMemo(() => {
    if (filterType === 'month') {
      return [
        {value: 'all', label: 'All Months'},
        {value: '0', label: 'January'},
        {value: '1', label: 'February'},
        {value: '2', label: 'March'},
        {value: '3', label: 'April'},
        {value: '4', label: 'May'},
        {value: '5', label: 'June'},
        {value: '6', label: 'July'},
        {value: '7', label: 'August'},
        {value: '8', label: 'September'},
        {value: '9', label: 'October'},
        {value: '10', label: 'November'},
        {value: '11', label: 'December'},
      ];
    } else if (filterType === 'year') {
      const years = Array.from(
        new Set(data.map((item) => new Date(item.createdAt).getFullYear())),
      ).sort((a, b) => b - a);
      return years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      }));
    } else if (filterType === 'day') {
      const days = Array.from(
        new Set(
          data.map((item) =>
            new Date(item.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }),
          ),
        ),
      ).sort((a, b) => (new Date(b) < new Date(a) ? 1 : -1));
      return days.map((day) => ({value: day, label: day}));
    }
    return [];
  }, [filterType, data]);

  // Debounce search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Handle clicks outside to close dropdown
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  // Handle option selection
  const handleSelect = (option: Option) => {
    let newSelectedOptions: string[];
    if (multiSelect) {
      const isSelected = selectedOptions.includes(option.value);
      newSelectedOptions = isSelected
        ? selectedOptions.filter((value) => value !== option.value)
        : [...selectedOptions, option.value];
    } else {
      newSelectedOptions = [option.value];
      setIsOpen(false);
    }
    setSelectedOptions(newSelectedOptions);
    setSearchTerm('');
    onChange?.(multiSelect ? newSelectedOptions : newSelectedOptions[0]);
  };

  // Handle removing a selected option (for multi-select)
  const handleRemoveOption = (value: string) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option !== value,
    );
    setSelectedOptions(newSelectedOptions);
    onChange?.(multiSelect ? newSelectedOptions : newSelectedOptions[0] || '');
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiSelect ? [] : ''}
      render={({}) => (
        <div className={`relative ${className}`} ref={dropdownRef}>
          {label && (
            <label className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-medium">
              {label}
            </label>
          )}
          <div className="relative">
            <span className="text-gray-500 absolute left-3 top-1/2 -translate-y-1/2">
              <FiFilter />
            </span>
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsOpen(true)}
              className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 w-full rounded-lg border bg-white px-10 py-2 text-sm focus:border-blue-500 focus:outline-none dark:text-white dark:focus:border-blue-500"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-controls={`${name}-dropdown`}
            />
            <span className="text-gray-500 absolute right-3 top-1/2 -translate-y-1/2">
              <DownIcon />
            </span>
            {isOpen && (
              <div
                id={`${name}-dropdown`}
                className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border bg-white shadow-lg"
                role="listbox"
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(option)}
                      className={`cursor-pointer px-4 py-2 text-sm ${
                        selectedOptions.includes(option.value)
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      role="option"
                      aria-selected={selectedOptions.includes(option.value)}
                    >
                      {option.label}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 px-4 py-2 text-sm">
                    No options found
                  </div>
                )}
              </div>
            )}
          </div>
          {multiSelect && selectedOptions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedOptions.map((value) => {
                const option = options.find((opt) => opt.value === value);
                return option ? (
                  <span
                    key={value}
                    className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-700 dark:text-blue-100"
                  >
                    {option.label}
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(value)}
                      className="ml-2 text-blue-800 hover:text-blue-900 dark:text-blue-100 dark:hover:text-white"
                      aria-label={`Remove ${option.label}`}
                    >
                      <XIcon />
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default GenericFilterDropdown;
