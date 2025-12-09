import React from 'react';

const Advantages = () => {
  return (
    <section className="px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto mb-12 max-w-7xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-black-2 md:text-3xl">
          TEMPOPE ADVANTAGE
        </h2>
        <p className="text-gray-600 mx-auto max-w-2xl text-lg">
          With our growing presence across multiple cities, we always have our
          hands full! This means you will never run out of trips.
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {/* Regular Trips */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-200">
              <svg
                className="h-8 w-8 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-gray-800 mb-4 text-xl font-semibold">
            Regular Trips
          </h3>
          <p className="text-gray-600">
            With our growing presence across multiple cities, we always have our
            hands full! This means you will never run out of trips.
          </p>
        </div>

        {/* Better Earning */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-teal-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-200">
              <svg
                className="h-8 w-8 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-gray-800 mb-4 text-xl font-semibold">
            Better Earning
          </h3>
          <p className="text-gray-600">
            Earn more by partnering with the best! Regular trips & efficient
            service can grow your earnings!
          </p>
        </div>

        {/* On-Time Payment */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-teal-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-200">
              <svg
                className="h-8 w-8 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-gray-800 mb-4 text-xl font-semibold">
            On-Time Payment
          </h3>
          <p className="text-gray-600">
            Be assured to receive payments on time & get the best in class
            support when you attach mini truck with Porter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
