import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import ImageTrack from "./ImageTrack";
import { useState, useEffect } from "react";
import { HERO_STRING } from "../consts/en";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const images = [
    '/img/portfolio-7.png',
    '/img/portfolio-1.jpg',
    '/img/portfolio-2.jpg',
    '/img/portfolio-3.jpg',
    '/img/portfolio-4.jpg',
    '/img/portfolio-5.png',
    '/img/portfolio-6.png'
  ];

  const [mouseDownAt, setMouseDownAt] = useState("0");
  const [percentage, setPercentage] = useState("0");
  const [prevPercentage, setPrevPercentage] = useState("0");

  const handleMouseDown = (e) => {
    const clientX = e.clientX || e.touches?.[0]?.clientX || "0";
    setMouseDownAt(clientX);
  };

  const handleMouseUp = () => {
    setMouseDownAt("0");
    setPrevPercentage(percentage);
  };

  const handleMouseMove = (e) => {
    if (mouseDownAt === "0") return;

    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const mouseDelta = parseFloat(mouseDownAt) - clientX;
    
    const baseMultiplier = 2;
    const imageCountMultiplier = Math.ceil(images.length / 3);
    let maxDelta = window.innerWidth * baseMultiplier * imageCountMultiplier;
    if (maxDelta > 300) {
      maxDelta = 100;
    }

    // 计算最大移动范围
    // 大屏幕是42，小屏幕是62
    const itemWidth = window.innerWidth > 768 ? 42 : 62;
    const totalItems = images.length + 3;
    // 计算需要的额外移动空间（百分比）
    const maxMovePercentage = -(totalItems * itemWidth);

    const nextPercentageUnconstrained = (mouseDelta / maxDelta) * -100 + parseFloat(prevPercentage);
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), maxMovePercentage);

    setPercentage(nextPercentage.toString());
  };

  const handlePercentageChange = (newPercentage) => {
    setPercentage(newPercentage);
  };

  // 阻止默认的触摸行为（如滚动）
  const preventDefault = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const element = document.getElementById('image-container');
    if (element) {
      element.addEventListener('touchmove', preventDefault, { passive: false });
    }
    return () => {
      if (element) {
        element.removeEventListener('touchmove', preventDefault);
      }
    };
  }, []);

  useGSAP(() => {
    gsap.set("#image-container", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#image-container", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#image-container",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div 
      className="relative h-dvh w-screen overflow-x-hidden"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleMouseMove}
    >
      <div
        id="image-container"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <ImageTrack 
          images={images}
          externalMouseDownAt={mouseDownAt}
          externalPercentage={percentage}
          onPercentageChange={handlePercentageChange}
        />

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white">
          {HERO_STRING.subtitle}
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-white">
              {HERO_STRING.title}
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-white">
              {HERO_STRING.description}
            </p>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        {HERO_STRING.subtitle}
      </h1>
    </div>
  );
};

export default Hero;
