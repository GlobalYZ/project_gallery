import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FEATURES_STRING } from "../consts/en";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isLinked }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        playsInline
        autoPlay
        className="absolute left-0 top-0 size-full object-contain object-center"
        onCanPlay={(e) => {
          const playPromise = e.target.play();
          if (playPromise !== undefined) {
            playPromise
              .catch(err => {
                console.log('Playback failed:', err);
              });
          }
        }}
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
        <div className="bg-slate-500 bg-opacity-50 w-full md:w-[60%]">
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="p-3 text-xs md:text-base text-justify">{description}</p>
          )}
        </div>

        {isLinked && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <a className="relative z-20" href={isLinked}>Click Me</a>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          {FEATURES_STRING.title}
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          {FEATURES_STRING.description}
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              {FEATURES_STRING.feature1.title}
            </>
          }
          description={FEATURES_STRING.feature1.description}
        />
      </BentoTilt>

      <div className="grid h-[200vh] md:h-[135vh] w-full grid-cols-2 md:grid-cols-2 grid-rows-4 md:grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 col-span-2 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                {FEATURES_STRING.feature2.title}
              </>
            }
            description={FEATURES_STRING.feature2.description}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 col-span-2 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                {FEATURES_STRING.feature3.title}
              </>
            }
            description={FEATURES_STRING.feature3.description}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 col-span-2 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                {FEATURES_STRING.feature4.title}
              </>
            }
            description={FEATURES_STRING.feature4.description}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 row-span-1 col-span-2 md:col-span-1">
          <div className="flex size-full flex-col justify-between bg-orange-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              More coming soon
            </h1>

            <TiLocationArrow className="text-black m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 row-span-1 col-span-2 md:col-span-1">
          <BentoCard
            src="videos/feature-5.mp4"
            title={
              <>
                {FEATURES_STRING.feature5.title}
              </>
            }
            description={FEATURES_STRING.feature5.description}
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
