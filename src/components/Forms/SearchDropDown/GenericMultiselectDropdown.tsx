import React, {useState, useEffect, useRef} from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import {DownIcon, GlobeIcon, XIcon} from '../../../icons'; // Assuming these are your icons

interface Option {
  value: string;
  label: string;
}

interface GenericMultiselectDropdownProps {
  name: string;
  label?: string;
  options: Option[];
  defaultOption?: string[];
  onChange?: (selectedOptions: string[]) => void;
  placeholder?: string;
  className?: string;
}

const GenericMultiselectDropdown: React.FC<GenericMultiselectDropdownProps> = ({
  name,
  label,
  options,
  defaultOption = [],
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  const {control} = useFormContext();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultOption);
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce search term
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

  // Filter options based on debounced search term
  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  // Handle option selection
  const handleSelect = (option: Option) => {
    const isSelected = selectedOptions.includes(option.value);
    const newSelectedOptions = isSelected
      ? selectedOptions.filter((value) => value !== option.value)
      : [...selectedOptions, option.value];

    setSelectedOptions(newSelectedOptions);
    setSearchTerm('');
    onChange?.(newSelectedOptions); // Trigger onChange callback
  };

  // Handle removing a selected option
  const handleRemoveOption = (value: string) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option !== value,
    );
    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions); // Trigger onChange callback
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultOption}
      render={({field}) => (
        <div className={`relative ${className}`} ref={dropdownRef}>
          {label && (
            <label className="mb-2.5 block text-black dark:text-white">
              {label}
            </label>
          )}

          <div className="relative bg-white dark:bg-form-input">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <GlobeIcon />
            </span>

            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsOpen(true)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-controls={`${name}-dropdown`}
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2">
              <DownIcon />
            </span>

            {isOpen && (
              <div
                id={`${name}-dropdown`}
                className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded border border-stroke bg-white shadow-lg dark:bg-form-input"
                role="listbox"
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(option)}
                      className={`cursor-pointer p-2 ${
                        selectedOptions.includes(option.value)
                          ? 'bg-blue-100 dark:bg-blue-600'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      role="option"
                      aria-selected={selectedOptions.includes(option.value)}
                    >
                      {option.label}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 p-2">
                    No options found
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {selectedOptions.map((value) => {
              const option = options.find((opt) => opt.value === value);
              return option ? (
                <span
                  key={value}
                  className="flex items-center rounded-full bg-blue-200 px-3 py-1 text-sm text-blue-800 dark:bg-blue-600 dark:text-blue-200"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(value)}
                    className="ml-2 text-lg text-blue-800 hover:text-blue-900 dark:text-blue-200 dark:hover:text-blue-300"
                    aria-label={`Remove ${option.label}`}
                  >
                    <XIcon />
                  </button>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    />
  );
};

export default GenericMultiselectDropdown;
