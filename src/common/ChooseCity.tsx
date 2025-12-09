import React from 'react';
import {MdClose} from 'react-icons/md';

export const cities = [
  {name: 'Sangli', img: 'https://source.unsplash.com/80x80/?surat'},
  {name: 'Kolhapur', img: 'https://source.unsplash.com/80x80/?ahmedabad'},
  {name: 'Solapur', img: 'https://source.unsplash.com/80x80/?mumbai'},
  {name: 'Pune', img: 'https://source.unsplash.com/80x80/?pune'},
  {name: 'Satara', img: 'https://source.unsplash.com/80x80/?delhi'},
  {name: 'Karnataka', img: 'https://source.unsplash.com/80x80/?jaipur'},
  {name: 'Indore', img: 'https://source.unsplash.com/80x80/?indore'},
  {name: 'Vadodara', img: 'https://source.unsplash.com/80x80/?vadodara'},
];

const ChooseCity = ({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (city: string) => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[90%] max-w-3xl rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-gray-900 text-3xl font-bold">Choose your city</h2>
          <MdClose className="h-7 w-7 cursor-pointer" onClick={onClose} />
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5">
          {cities.map((city, index) => (
            <div
              key={index}
              onClick={() => {
                onSelect(city.name);
                onClose();
              }}
              className="flex cursor-pointer flex-col items-center"
            >
              <img
                src={city.img}
                className="h-20 w-20 rounded-xl object-cover shadow-md"
              />
              <p className="text-gray-800 mt-2 text-center text-sm font-semibold">
                {city.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseCity;
