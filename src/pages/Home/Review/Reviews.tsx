import React, {useCallback, useRef} from 'react';
import 'swiper/css';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FaStar} from 'react-icons/fa';

const Testimonial = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const testimonials = [
    {
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
      name: 'Amit Kumar',
      city: 'Ahmedabad',
      rating: 5,
      review:
        'Very secure service. Driver was professional and friendly. Highly recommend!',
    },
    {
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      name: 'Neha Verma',
      city: 'Surat',
      rating: 4,
      review:
        'The support team was very helpful in tracking my shipment. Good service overall!',
    },
    {
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      name: 'Rajesh Mehta',
      city: 'Mumbai',
      rating: 5,
      review:
        '30% cheaper than local transporters and still better service. Will definitely use again!',
    },
    {
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      name: 'Rahul Patel',
      city: 'Surat',
      rating: 5,
      review:
        'Great experience! My goods were delivered safely and on time. TempoPe is now my go-to transport service.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      name: 'Priya Shah',
      city: 'Vadodara',
      rating: 4,
      review:
        'Affordable pricing and quick delivery. The booking process was super easy!',
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-dark py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-black-2 dark:text-black-2">
          What Our Customers Say
        </h2>

        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            ref={sliderRef}
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="h-full">
                  <SingleTestimonial {...testimonial} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between px-4 sm:relative sm:top-auto sm:translate-y-0 sm:justify-center sm:gap-8">
            <button
              onClick={handlePrev}
              className="dark:border-dark-3 dark:bg-dark-2 flex h-12 w-12 items-center justify-center rounded-full border border-teal-300 bg-white text-teal-800 transition-all hover:border-teal-600 hover:bg-teal-50 hover:shadow-lg dark:text-teal-400 dark:hover:border-teal-600 sm:h-14 sm:w-14"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path
                  d="M17.5 9.5H4.15625L9.46875 4.09375C9.75 3.8125 9.75 3.375 9.46875 3.09375C9.1875 2.8125 8.75 2.8125 8.46875 3.09375L2 9.65625C1.71875 9.9375 1.71875 10.375 2 10.6562L8.46875 17.2188C8.59375 17.3438 8.78125 17.4375 8.96875 17.4375C9.15625 17.4375 9.3125 17.375 9.46875 17.25C9.75 16.9687 9.75 16.5313 9.46875 16.25L4.1875 10.9062H17.5C17.875 10.9062 18.1875 10.5937 18.1875 10.2187C18.1875 9.8125 17.875 9.5 17.5 9.5Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="dark:border-dark-3 dark:bg-dark-2 flex h-12 w-12 items-center justify-center rounded-full border border-teal-300 bg-white text-teal-800 transition-all hover:border-teal-600 hover:bg-teal-50 hover:shadow-lg dark:text-teal-400 dark:hover:border-teal-600 sm:h-14 sm:w-14"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path
                  d="M18 9.6875L11.5312 3.125C11.25 2.84375 10.8125 2.84375 10.5312 3.125C10.25 3.40625 10.25 3.84375 10.5312 4.125L15.7812 9.46875H2.5C2.125 9.46875 1.8125 9.78125 1.8125 10.1562C1.8125 10.5312 2.125 10.875 2.5 10.875H15.8437L10.5312 16.2813C10.25 16.5625 10.25 17 10.5312 17.2813C10.6562 17.4063 10.8437 17.4688 11.0312 17.4688C11.2187 17.4688 11.4062 17.4062 11.5312 17.25L18 10.6875C18.2812 10.4062 18.2812 9.96875 18 9.6875Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

const SingleTestimonial = ({
  image,
  name,
  city,
  rating,
  review,
}: {
  image: string;
  name: string;
  city: string;
  rating: number;
  review: string;
}) => {
  return (
    <div className="dark:border-dark-3 dark:bg-dark-2 h-full rounded-2xl border border-teal-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
      {/* Profile Image and Info */}
      <div className="mb-6 flex items-center">
        <div className="mr-4 h-16 w-16 overflow-hidden rounded-full border-2 border-black-2 dark:border-white">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h4 className="text-gray-900 text-lg font-semibold text-black-2 dark:text-white">
            {name}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{city}</p>

          {/* Rating Stars */}
          <div className="text-black-600 mt-1 flex dark:text-teal-400">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <FaStar
                  key={idx}
                  className={
                    idx < rating
                      ? 'text-yellow-500 dark:text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }
                  size={16}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Review Text */}
      <div className="relative">
        <svg
          className="mb-3 h-6 w-6 text-teal-300 dark:text-teal-700"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>

        <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
          &quot;{review}&quot;
        </p>
      </div>

      {/* Decorative Elements */}
      {/* <div className="absolute -bottom-2 -right-2 z-[-1] opacity-20">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 32C3 15.9837 15.9837 3 32 3C48.0163 2.99999 61 15.9837 61 32C61 48.0163 48.0163 61 32 61C15.9837 61 3 48.0163 3 32Z"
            stroke="#84cc16"
            strokeWidth="6"
          />
        </svg>
      </div> */}
    </div>
  );
};

// Remove the old DotShape component since we're using a simpler design
