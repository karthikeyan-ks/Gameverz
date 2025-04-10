import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import valarant1 from '../assets/valorant/valorant.jpg';
import valarant2 from '../assets/valorant/valorant1.jpg';
import valarant3 from '../assets/valorant/valorant3.jpg';
import callofduty from '../assets/call of duty/callofduty.jpeg'
import callofduty1 from '../assets/call of duty/callofduty1.jpeg'

const images = [valarant1, valarant2, valarant3, callofduty, callofduty1];

const GameSwiper = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 1000, disableOnInteraction: false}}
      style={{ width: '800px', height: '500px', borderRadius: '10px' }}
    >
      {images.map((src, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={src}
            alt={`Slide ${idx + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GameSwiper;
