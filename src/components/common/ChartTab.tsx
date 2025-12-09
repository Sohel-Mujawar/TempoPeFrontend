import React, {useState} from 'react';

const ChartTab: React.FC = () => {
  const [selected, setSelected] = useState<
    'optionOne' | 'optionTwo' | 'optionThree'
  >('optionOne');

  const getButtonClass = (option: 'optionOne' | 'optionTwo' | 'optionThree') =>
    selected === option
      ? 'shadow-theme-xs text-gray-900 bg-white dark:text-white dark:bg-gray-800'
      : 'text-gray-500 dark:text-gray-400';

  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex items-center gap-0.5 rounded-lg p-0.5">
      <button
        onClick={() => setSelected('optionOne')}
        className={`text-theme-sm hover:text-gray-900 w-full rounded-md px-3 py-2 font-medium dark:bg-white/[0.03] dark:hover:text-white ${getButtonClass(
          'optionOne',
        )}`}
      >
        Monthly
      </button>

      <button
        onClick={() => setSelected('optionTwo')}
        className={`text-theme-sm hover:text-gray-900 w-full rounded-md px-3 py-2 font-medium dark:bg-white/[0.03] dark:hover:text-white ${getButtonClass(
          'optionTwo',
        )}`}
      >
        Quarterly
      </button>

      <button
        onClick={() => setSelected('optionThree')}
        className={`text-theme-sm hover:text-gray-900 w-full rounded-md px-3 py-2 font-medium dark:bg-white/[0.03] dark:hover:text-white ${getButtonClass(
          'optionThree',
        )}`}
      >
        Annually
      </button>
    </div>
  );
};

export default ChartTab;
