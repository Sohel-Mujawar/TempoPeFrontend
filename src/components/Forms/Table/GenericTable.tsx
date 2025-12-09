/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useMemo, useEffect, useRef} from 'react';
import {FiEdit} from 'react-icons/fi';
import {GrFormNext, GrFormPrevious} from 'react-icons/gr';
import {MdDelete, MdLogin} from 'react-icons/md';
import {AiOutlineEye} from 'react-icons/ai';
import {BiCopy} from 'react-icons/bi';
import {RiFilter3Line, RiArrowDownSLine, RiCloseLine} from 'react-icons/ri';
import {FormProvider, useForm} from 'react-hook-form';

export type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  render?: (item: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
  cell?: (item: T) => React.ReactNode;
};

export type Filter<T> = {
  name: string;
  label: string;
  filterType: 'month' | 'year' | 'day';
  multiSelect?: boolean;
};

type GenericTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  filters?: Filter<T>[];
  itemsPerPage?: number;
  searchAble?: boolean;
  title?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  onCopy?: (item: T) => void;
  onLogin?: (item: T) => void;
};

interface Option {
  value: string;
  label: string;
}

const GenericTable = <T,>({
  data,
  columns,
  filters = [],
  itemsPerPage = 5,
  searchAble,
  title,
  onEdit,
  onDelete,
  onView,
  onCopy,
  onLogin,
}: GenericTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    column: Column<T>;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [searchTerms, setSearchTerms] = useState<{[key: string]: string}>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const filterRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  const methods = useForm();
  const {watch} = methods;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleView = (item: T) => {
    setSelectedItem(item);
    setShowModal(true);
    onView?.(item);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const safeData = Array.isArray(data) ? data : [];

  // Generate filter options
  const getFilterOptions = (filter: Filter<T>): Option[] => {
    if (filter.filterType === 'month') {
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
    } else if (filter.filterType === 'year') {
      const years = Array.from(
        new Set(
          safeData.map((item: any) => new Date(item.createdAt).getFullYear()),
        ),
      ).sort((a, b) => b - a);
      return years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      }));
    } else if (filter.filterType === 'day') {
      const days = Array.from(
        new Set(
          safeData.map((item: any) =>
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
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !Object.values(filterRefs.current).some(
          (ref) => ref && ref.contains(event.target as Node),
        )
      ) {
        setOpenFilter(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle filter search
  const handleFilterSearch = (filterName: string, value: string) => {
    setSearchTerms((prev) => ({...prev, [filterName]: value}));
  };

  // Handle filter selection
  const handleSelect = (filter: Filter<T>, option: Option) => {
    const currentValue = watch(filter.name) as string | string[];
    let newValue: string | string[];
    if (filter.multiSelect) {
      const values = Array.isArray(currentValue) ? currentValue : [];
      newValue = values.includes(option.value)
        ? values.filter((v) => v !== option.value)
        : [...values, option.value];
    } else {
      newValue = option.value;
      setOpenFilter(null);
    }
    methods.setValue(filter.name, newValue);
    setSearchTerms((prev) => ({...prev, [filter.name]: ''}));
  };

  // Handle remove selected option (multi-select)
  const handleRemoveOption = (filter: Filter<T>, value: string) => {
    const currentValue = watch(filter.name) as string | string[];
    if (Array.isArray(currentValue)) {
      const newValue = currentValue.filter((v) => v !== value);
      methods.setValue(filter.name, newValue);
    }
  };

  // Apply filters
  const filteredData = useMemo(() => {
    let result = safeData;
    filters.forEach((filter) => {
      const selectedValue = watch(filter.name) as string | string[];
      if (selectedValue && selectedValue !== 'all') {
        result = result.filter((item: any) => {
          const itemDate = new Date(item.createdAt);
          if (filter.filterType === 'month') {
            const itemMonth = itemDate.getMonth().toString();
            return Array.isArray(selectedValue)
              ? selectedValue.includes(itemMonth)
              : itemMonth === selectedValue;
          } else if (filter.filterType === 'year') {
            const itemYear = itemDate.getFullYear().toString();
            return Array.isArray(selectedValue)
              ? selectedValue.includes(itemYear)
              : itemYear === selectedValue;
          } else if (filter.filterType === 'day') {
            const itemDay = itemDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
            return Array.isArray(selectedValue)
              ? selectedValue.includes(itemDay)
              : itemDay === selectedValue;
          }
          return true;
        });
      }
    });
    return result;
  }, [safeData, filters, watch]);

  // Sorting
  const sortedData = useMemo(() => {
    const sortableData = [...filteredData];
    if (sortConfig !== null) {
      const {column, direction} = sortConfig;
      sortableData.sort((a, b) => {
        const accessor = column.accessor;
        const aValue =
          typeof accessor === 'function' ? accessor(a) : (a as any)[accessor];
        const bValue =
          typeof accessor === 'function' ? accessor(b) : (b as any)[accessor];

        if (aValue == null) return 1;
        if (bValue == null) return -1;
        if (aValue === bValue) return 0;

        return (aValue > bValue ? 1 : -1) * (direction === 'asc' ? 1 : -1);
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  // Search filtering
  const searchFilteredData = sortedData.filter((item) =>
    columns.some((column) => {
      const value =
        typeof column.accessor === 'function'
          ? column.accessor(item)
          : (item as any)[column.accessor];
      return value
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }),
  );

  const totalItems = searchFilteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = searchFilteredData.slice(
    startIdx,
    startIdx + itemsPerPage,
  );

  const handleSort = (column: Column<T>) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.column === column &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({column, direction});
  };

  return (
    <FormProvider {...methods}>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {title && (
          <h2 className="text-gray-800 mb-4 text-xl font-bold dark:text-white">
            {title}
          </h2>
        )}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {searchAble && (
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary sm:w-64"
            />
          )}
          {filters.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {filters.map((filter) => {
                const options = getFilterOptions(filter);
                const selectedValue = watch(filter.name) as string | string[];
                const filteredOptions = options.filter((option) =>
                  option.label
                    .toLowerCase()
                    .includes((searchTerms[filter.name] || '').toLowerCase()),
                );
                const displayValue =
                  !filter.multiSelect &&
                  selectedValue &&
                  selectedValue !== 'all'
                    ? options.find((opt) => opt.value === selectedValue)
                        ?.label || ''
                    : searchTerms[filter.name] || '';

                return (
                  <div
                    key={filter.name}
                    className="relative w-64"
                    ref={(el) => (filterRefs.current[filter.name] = el)}
                  >
                    <label className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-medium">
                      {filter.label}
                    </label>
                    <div className="relative">
                      <span className="text-gray-500 absolute left-3 top-1/2 -translate-y-1/2">
                        <RiFilter3Line />
                      </span>
                      <input
                        type="text"
                        placeholder={
                          filter.multiSelect
                            ? `Search ${filter.label.toLowerCase()}...`
                            : 'Select...'
                        }
                        value={
                          openFilter === filter.name
                            ? searchTerms[filter.name] || ''
                            : displayValue
                        }
                        onChange={(e) =>
                          handleFilterSearch(filter.name, e.target.value)
                        }
                        onFocus={() => setOpenFilter(filter.name)}
                        className="border-gray-300 dark:border-gray-600 w-full rounded-lg border bg-white px-10 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-meta-4 dark:text-white dark:focus:border-blue-500"
                        aria-expanded={openFilter === filter.name}
                        aria-haspopup="listbox"
                        aria-controls={`${filter.name}-dropdown`}
                      />
                      <span className="text-gray-500 absolute right-3 top-1/2 -translate-y-1/2">
                        <RiArrowDownSLine />
                      </span>
                      {openFilter === filter.name && (
                        <div
                          id={`${filter.name}-dropdown`}
                          className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border bg-white shadow-lg dark:bg-meta-4"
                          role="listbox"
                        >
                          {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                              <div
                                key={option.value}
                                onClick={() => handleSelect(filter, option)}
                                className={`cursor-pointer px-4 py-2 text-sm ${
                                  (Array.isArray(selectedValue) &&
                                    selectedValue.includes(option.value)) ||
                                  selectedValue === option.value
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                                role="option"
                                aria-selected={
                                  (Array.isArray(selectedValue) &&
                                    selectedValue.includes(option.value)) ||
                                  selectedValue === option.value
                                }
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
                    {filter.multiSelect &&
                      Array.isArray(selectedValue) &&
                      selectedValue.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedValue.map((value) => {
                            const option = options.find(
                              (opt) => opt.value === value,
                            );
                            return option ? (
                              <span
                                key={value}
                                className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-700 dark:text-blue-100"
                              >
                                {option.label}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveOption(filter, value)
                                  }
                                  className="ml-2 text-blue-800 hover:text-blue-900 dark:text-blue-100 dark:hover:text-white"
                                  aria-label={`Remove ${option.label}`}
                                >
                                  <RiCloseLine />
                                </button>
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`min-w-[120px] px-4 py-4 font-medium text-black dark:text-white ${column.className || ''}`}
                    onClick={
                      column.sortable ? () => handleSort(column) : undefined
                    }
                    style={{cursor: column.sortable ? 'pointer' : 'default'}}
                  >
                    {column.header}{' '}
                    {sortConfig?.column === column
                      ? sortConfig.direction === 'asc'
                        ? '↑'
                        : '↓'
                      : null}
                  </th>
                ))}
                {(onEdit || onDelete || onView || onCopy || onLogin) && (
                  <th className="px-4 py-4">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={
                      columns.length +
                      (onEdit || onDelete || onView || onCopy || onLogin
                        ? 1
                        : 0)
                    }
                    className="text-gray-500 py-5 text-center"
                  >
                    No records found
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, rowIndex) => (
                  <tr
                    key={(item as any).id ?? rowIndex}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {columns.map((column, colIndex) => {
                      const value =
                        typeof column.accessor === 'function'
                          ? column.accessor(item)
                          : (item as any)[column.accessor];

                      return (
                        <td
                          key={colIndex}
                          className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
                        >
                          {column.cell
                            ? column.cell(item)
                            : column.render
                              ? column.render(item)
                              : value}
                        </td>
                      );
                    })}
                    {(onEdit || onDelete || onView || onCopy || onLogin) && (
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          {onView && (
                            <button
                              aria-label="View"
                              className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-3 py-4"
                              onClick={() => handleView(item)}
                            >
                              <AiOutlineEye className="h-5 w-5" />
                            </button>
                          )}
                          {onEdit && (
                            <button
                              aria-label="Edit"
                              className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-3 py-4"
                              onClick={() => onEdit(item)}
                            >
                              <FiEdit className="h-5 w-5" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              aria-label="Delete"
                              className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-3 py-4"
                              onClick={() => onDelete(item)}
                            >
                              <MdDelete className="h-5 w-5" />
                            </button>
                          )}
                          {onCopy && (
                            <button
                              aria-label="Copy"
                              className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-3 py-4"
                              onClick={() => onCopy(item)}
                            >
                              <BiCopy className="h-5 w-5" />
                            </button>
                          )}
                          {onLogin && (
                            <button
                              aria-label="Login"
                              className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-3 py-4"
                              onClick={() => onLogin(item)}
                            >
                              <MdLogin className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span>
            Page {currentPage} of {totalPages || 1}
          </span>
          <div className="space-x-2">
            <button
              className="rounded px-3 py-4 disabled:opacity-50"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <GrFormPrevious style={{fontSize: '1.25rem'}} />
            </button>
            <button
              className="rounded px-3 py-4 disabled:opacity-50"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <GrFormNext style={{fontSize: '1.25rem'}} />
            </button>
          </div>
        </div>

        {/* View Modal */}
        {showModal && selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={closeModal}
          >
            <div
              className="mx-4 max-h-[80vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 dark:bg-meta-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-gray-800 text-xl font-bold dark:text-white">
                  View Item Details
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                >
                  <RiCloseLine className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                {columns.map((column, index) => {
                  const value =
                    typeof column.accessor === 'function'
                      ? column.accessor(selectedItem)
                      : (selectedItem as any)[column.accessor];
                  return (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {column.header}:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {value ?? 'N/A'}
                      </span>
                    </div>
                  );
                  
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default GenericTable;
