// components/Forms/GenericSelectButton.tsx
import React from 'react';

interface GenericSelectButtonProps {
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

const GenericSelectButton: React.FC<GenericSelectButtonProps> = ({
  label,
  description,
  isSelected,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg border-2 p-6 text-left transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-sm'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white'
      } ${className} `}
    >
      <div className="text-gray-800 mb-2 text-lg font-semibold">{label}</div>
      <div className="text-gray-600 text-sm">{description}</div>
    </button>
  );
};

export default GenericSelectButton;
