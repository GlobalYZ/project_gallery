import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { ABOUT_STRING } from "../consts/en";
import { useEffect } from "react";
import useWindowSize from '../hooks/useWindowSize';

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);



const About = () => {
  const { width } = useWindowSize();

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  if (width < 768) {
    return (
      <div id="about" className="w-screen">
      <div className="relative my-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          {ABOUT_STRING.welcome}
        </p>

        <AnimatedTitle
          title={ABOUT_STRING.title}
          containerClass="mt-5 !text-black text-center"
        />
      </div>
      </div>
    );
  } else {
    return (
      <div id="about" className="w-screen">
        <div className="relative mt-36 mb-48 flex flex-col items-center gap-5">
          <p className="font-general text-sm uppercase md:text-[10px]">
            {ABOUT_STRING.welcome}
          </p>
  
          <AnimatedTitle
            title={ABOUT_STRING.title}
            containerClass="mt-5 !text-black text-center"
          />
  
        </div>
  
        {/* <div className="h-dvh w-screen" id="clip">
          <div className="mask-clip-path about-image">
            <img
              src="img/about.png"
              alt="Background"
              className="absolute left-0 top-0 size-full object-cover"
            />
          </div>
        </div> */}
      </div>
    );

  }

  
};

export default About;
