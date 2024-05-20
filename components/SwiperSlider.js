import styles from './SwiperSlider.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination,FreeMode,Parallax } from 'swiper';
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
function SwiperSlider(props){

    return <>
    <Swiper
     modules={[Navigation, Pagination, Autoplay,FreeMode,Parallax]}
      spaceBetween={20}
      
      slidesPerView={1}
      parallax={{enabled:props?.config?.parallax || true}}
      loop={props?.config?.loop || false }
      autoplay={props?.config?.autoplay || true}
      freeMode={{enabled:props?.config?.freeMode || false}}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 2,
        },
      }}
      pagination={{ clickable: true }}
      centeredSlides={props?.config?.centered || false }
      onSlideChange={() =>{}}

      onSwiper={(swiper) => {}}
      onInit={(swiper) => {
       
        swiper.navigation.update();
      }}
      navigation={{
        nextEl: '.next',
        prevEl: '.prev',
        clickable:true,
      }}
   
    >


     
      
      {props?.data?.slides && props.data.slides.map((item,index)=>{

return(<>

<SwiperSlide data-swiper-parallax={50} key={index}><img  className={styles.slide} src={item.image}/></SwiperSlide>

</>)
})} 


    </Swiper>
    </>
}

export default SwiperSlider;