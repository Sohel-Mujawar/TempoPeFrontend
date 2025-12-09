import React from 'react';

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = '',
  desc = '',
}) => {
  return (
    <div
      className={`border-gray-200 dark:border-gray-800 rounded-2xl border bg-white dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5">
        <h3 className="text-gray-800 text-base font-medium dark:text-white/90">
          {title}
        </h3>
        {desc && (
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {desc}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className="border-gray-100 dark:border-gray-800 border-t p-4 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
