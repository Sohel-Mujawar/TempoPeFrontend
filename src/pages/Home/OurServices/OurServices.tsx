import React from 'react';
import {
  MdLocalShipping,
  MdPriceCheck,
  MdSecurity,
  MdMap,
  MdSupportAgent,
} from 'react-icons/md';

const services = [
  {
    title: 'Fast Delivery',
    desc: 'Get your goods delivered quickly within your district.',
    icon: <MdLocalShipping className="h-10 w-10 text-teal-700" />,
  },
  {
    title: 'Affordable Pricing',
    desc: 'Save up to 30% compared to local market rates.',
    icon: <MdPriceCheck className="h-10 w-10 text-teal-700" />,
  },
  {
    title: 'Secure Transport',
    desc: 'Your items are transported safely with care.',
    icon: <MdSecurity className="h-10 w-10 text-teal-700" />,
  },
  {
    title: 'Local Expertise',
    desc: 'We know your district routes better than anyone.',
    icon: <MdMap className="h-10 w-10 text-teal-700" />,
  },
  {
    title: '24/7 Support',
    desc: 'Always available to assist with your bookings.',
    icon: <MdSupportAgent className="h-10 w-10 text-teal-700" />,
  },
];

const OurServices = () => {
  return (
    <div className="mt-4 w-full overflow-hidden rounded-lg px-4 py-12">
      <h2 className="mb-6 text-center text-3xl font-bold text-black">
        Our Services
      </h2>

      {/* Slider Container */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-slide flex gap-6 whitespace-normal">
          {services.concat(services).map((service, index) => (
            <div
              key={index}
              className="flex min-w-[260px] flex-col items-start rounded-2xl border border-teal-200 bg-white p-5 shadow-md sm:min-w-[300px] md:min-w-[320px]"
            >
              {/* Avatar / Icon */}
              <div className="mb-3 rounded-full bg-teal-100 p-3">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-teal-800">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mt-2">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }

        /* Mobile optimization */
        @media (max-width: 640px) {
          .animate-slide {
            animation-duration: 25s;
          }
        }
      `}</style>
    </div>
  );
};

export default OurServices;
