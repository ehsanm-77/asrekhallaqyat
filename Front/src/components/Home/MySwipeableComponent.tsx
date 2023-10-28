import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';
import Image from 'next/image';

export default function SwiperMain() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper h-80 z-10 shadow-md mb-8"
    >
      <SwiperSlide>
        <div className="swiper-slide">
          <Image
            src="/assets/img/swiper/elisa-calvet-b-S3nUOqDmUvc-unsplash.jpg"
            className="swiper-img"
            alt=""
            width={1200}
            height={800}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-slide">
          <Image
            src="/assets/img/swiper/sincerely-media-nGrfKmtwv24-unsplash.jpg"
            className="swiper-img"
            alt=""
            width={1200}
            height={800}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-slide">
          <Image
            src="/assets/img/swiper/luisa-brimble-VfHoMBagDPc-unsplash.jpg"
            className="swiper-img"
            alt=""
            width={1200}
            height={800}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-slide">
          <Image
            src="/assets/img/swiper/nong-9pw4TKvT3po-unsplash.jpg"
            className="swiper-img"
            alt=""
            width={1200}
            height={800}
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
