import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper"; // removed Pagination import
import { Card, CardHeader, CardBody } from "@nextui-org/react";

export default function CombinedSlider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: clgForms, error: clgError } = await supabase
        .from("clg_form")
        .select("id, imgs")
        .limit(15);

      const { data: content, error: contentError } = await supabase
        .from("content")
        .select("id, image, title, description")
        .eq("type", "results")
        .limit(15);

      if (!clgError && !contentError) {
        const formatted = [
          ...(clgForms || []).map((item) => ({
            id: `form-${item.id}`,
            type: "clg_form",
            img: item.imgs,
          })),
          ...(content || []).map((item) => ({
            id: `content-${item.id}`,
            type: "content",
            img: item.image,
            title: item.title,
            description: item.description,
          })),
        ];

        const unique = Array.from(
          new Map(formatted.map((item) => [item.img, item])).values()
        );

        // Shuffle + limit 12
        const shuffled = unique.sort(() => 0.5 - Math.random()).slice(0, 12);

        setSlides(shuffled);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto my-8">
      <h2 className="text-6xl font-serif font-bold text-center mb-12 text-primary">
        Success Stories
      </h2>

      <Swiper
        modules={[Autoplay]} // removed Pagination module
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        loop={true} // ✅ still looping
        className="pb-4"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {slide.type === "clg_form" ? (
              <img
                src={slide.img}
                alt="College Form"
                className="w-full h-56 object-cover rounded-lg shadow-md 
                           transform transition-transform duration-500 ease-in-out 
                           hover:scale-105"
              />
            ) : (
              <Card className="font-sans shadow-md rounded-lg">
                <CardHeader className="relative p-0">
                  <img
                    className="rounded-t-md w-full h-36 object-cover 
                               transform transition-transform duration-500 ease-in-out 
                               hover:scale-105"
                    src={
                      slide.img ??
                      "https://static.toiimg.com/photo/62192417.cms"
                    }
                    alt={slide.title}
                  />
                  <div className="w-10 h-10 border-2 flex flex-col justify-center items-center text-sm border-white bg-primary text-white shadow-md shadow-primary rounded-full px-3 absolute right-2 top-2 font-sans font-bold -rotate-[15deg]">
                    {parseFloat(slide.description)}
                  </div>
                </CardHeader>
                <CardBody className="pt-3 pb-4 px-3">
                  <h2 className="font-sans text-lg font-bold text-primary">
                    {slide.title}
                  </h2>
                  <p className="text-gray-700 text-sm">{slide.description}</p>
                </CardBody>
              </Card>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
