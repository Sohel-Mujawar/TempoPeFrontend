import React from 'react';
import {
  FaShieldAlt,
  FaUserShield,
  FaMapMarkedAlt,
  FaLock,
  FaCamera,
  FaMedkit,
  FaCarCrash,
  FaHeadset,
} from 'react-icons/fa';
import {
  MdSecurity,
  MdGpsFixed,
  MdVerifiedUser,
  MdLocalPolice,
} from 'react-icons/md';

const Safety = () => {
  const safetyFeatures = [
    {
      icon: <MdGpsFixed className="h-10 w-10" />,
      title: 'Live GPS Tracking',
      description:
        'Real-time tracking of your goods from pickup to delivery. Track your shipment 24/7 through our app.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <FaUserShield className="h-10 w-10" />,
      title: 'Verified Drivers',
      description:
        'All drivers are background verified, trained, and have clean driving records for your peace of mind.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: <FaLock className="h-10 w-10" />,
      title: 'Secure Payments',
      description:
        '100% secure digital payments with insurance coverage for all transactions. No cash handling risks.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: <FaCamera className="h-10 w-10" />,
      title: 'Journey Documentation',
      description:
        'Photo documentation at pickup and delivery points for complete transparency and proof of delivery.',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      icon: <FaMedkit className="h-10 w-10" />,
      title: 'Goods Insurance',
      description:
        'All shipments are insured against damage or loss. Your goods are protected up to ₹5 lakhs.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: <MdLocalPolice className="h-10 w-10" />,
      title: 'Emergency Support',
      description:
        '24/7 customer support and emergency response team available for any assistance during transit.',
      color: 'text-lime-700',
      bgColor: 'bg-lime-50',
    },
  ];

  const safetyStats = [
    {value: '99.7%', label: 'Safe Delivery Rate', icon: '✓'},
    {value: '10,000+', label: 'Verified Drivers', icon: '👨‍✈️'},
    {value: '₹5L', label: 'Insurance Coverage', icon: '🛡️'},
    {value: '24/7', label: 'Support Available', icon: '📞'},
  ];

  return (
    <section className="to-gray-50 bg-gradient-to-b from-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center justify-center gap-3">
            <div className="rounded-full bg-lime-100 p-3">
              <FaShieldAlt className="h-8 w-8 text-lime-700" />
            </div>
            <h2 className="text-gray-900 text-3xl font-bold md:text-4xl lg:text-5xl">
              Your Safety is Our <span className="text-lime-700">Priority</span>
            </h2>
          </div>
          <p className="text-gray-600 mx-auto max-w-3xl text-lg md:text-xl">
            We implement multiple layers of security to ensure your goods reach
            safely, every time. Trust, transparency, and technology - our three
            pillars of safety.
          </p>
        </div>

        {/* Main Safety Features */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {safetyFeatures.map((feature, index) => (
            <div
              key={index}
              className="border-gray-200 group relative rounded-2xl border bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Icon */}
              <div
                className={`${feature.bgColor} mb-6 inline-flex rounded-2xl p-4`}
              >
                <div className={feature.color}>{feature.icon}</div>
              </div>

              {/* Content */}
              <h3 className="text-gray-900 mb-3 text-xl font-bold">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>

              {/* Learn More Link */}
              <a
                href="#"
                className="inline-flex items-center font-medium text-lime-700 transition-all hover:text-lime-800 group-hover:gap-2"
              >
                Learn more
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Safety Stats Banner */}
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-lime-50 to-emerald-50 p-8 md:p-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {safetyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 flex items-center justify-center gap-2 text-3xl font-bold text-lime-800 md:text-4xl">
                  <span>{stat.icon}</span>
                  {stat.value}
                </div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Process Timeline */}
        <div className="mb-16">
          <h3 className="text-gray-900 mb-10 text-center text-2xl font-bold">
            Our 4-Step Safety Process
          </h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 transform bg-lime-200 md:block" />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                {
                  step: '01',
                  title: 'Driver Verification',
                  description:
                    'Background check, license verification, and training',
                  icon: '✅',
                },
                {
                  step: '02',
                  title: 'Vehicle Inspection',
                  description:
                    'Regular vehicle checks and maintenance certification',
                  icon: '🚛',
                },
                {
                  step: '03',
                  title: 'Real-time Monitoring',
                  description: 'GPS tracking and route optimization for safety',
                  icon: '📍',
                },
                {
                  step: '04',
                  title: 'Delivery Confirmation',
                  description: 'Photo proof and digital signature at delivery',
                  icon: '📝',
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="border-gray-200 rounded-xl border bg-white p-6 text-center shadow-sm">
                    <div className="mb-3 text-3xl">{step.icon}</div>
                    <div className="mb-2 text-sm font-semibold text-lime-700">
                      STEP {step.step}
                    </div>
                    <h4 className="text-gray-900 mb-2 text-lg font-bold">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="border-gray-200 mx-auto max-w-3xl rounded-2xl border bg-white p-8 shadow-lg">
            <MdVerifiedUser className="mx-auto mb-6 h-16 w-16 text-lime-600" />
            <h3 className="text-gray-900 mb-4 text-2xl font-bold">
              Experience Safe & Secure Transport
            </h3>
            <p className="text-gray-600 mx-auto mb-8 max-w-2xl">
              Join thousands of satisfied customers who trust us with their
              valuable shipments. Your goods deserve the best protection.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-xl bg-gradient-to-r from-lime-700 to-lime-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:from-lime-800 hover:to-lime-700 hover:shadow-xl">
                Book a Safe Delivery
              </button>
              <button className="rounded-xl border-2 border-lime-600 px-8 py-4 font-semibold text-lime-700 transition-all duration-300 hover:bg-lime-50">
                Download Safety Guide
              </button>
            </div>

            <p className="text-gray-500 mt-6 text-sm">
              <FaShieldAlt className="mr-2 inline" />
              All safety protocols comply with government transport regulations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;
