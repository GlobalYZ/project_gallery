import { useState, useRef, useEffect } from "react";

const ImageTrack = ({ 
  images = [], 
  externalMouseDownAt,
  externalPercentage,
  onPercentageChange
}) => {
  const trackRef = useRef(null);
  const [mouseDownAt, setMouseDownAt] = useState("0");
  const [prevPercentage, setPrevPercentage] = useState("0");
  const [percentage, setPercentage] = useState("0");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (externalMouseDownAt !== undefined) {
      setMouseDownAt(externalMouseDownAt);
    }
  }, [externalMouseDownAt]);

  useEffect(() => {
    if (externalPercentage !== undefined) {
      setPercentage(externalPercentage);
      setPrevPercentage(externalPercentage);
    }
  }, [externalPercentage]);

  const handleOnDown = (e) => {
    setMouseDownAt(e.clientX || e.touches?.[0]?.clientX || "0");
  };

  const handleOnUp = () => {
    setMouseDownAt("0");
    setPrevPercentage(percentage);
  };

  const handleOnMove = (e) => {
    if (mouseDownAt === "0") return;

    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const mouseDelta = parseFloat(mouseDownAt) - clientX;
    
    // 根据图片数量动态计算 maxDelta
    const baseMultiplier = 2; // 基础乘数
    const imageCountMultiplier = Math.ceil(images.length / 3); // 每3张图片增加一个乘数
    const maxDelta = window.innerWidth * baseMultiplier * imageCountMultiplier;

    const nextPercentageUnconstrained = (mouseDelta / maxDelta) * -100 + parseFloat(prevPercentage);
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -200);

    setPercentage(nextPercentage.toString());
    onPercentageChange?.(nextPercentage.toString());
  };

  useEffect(() => {
    const handleMouseMove = (e) => handleOnMove(e);
    const handleMouseUp = () => handleOnUp();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseDownAt, prevPercentage]);

  // 计算每张图片的object-position
  const calculateObjectPosition = (index) => {
    // 将百分比转换为0-1之间的值
    const normalizedPercentage = (parseFloat(percentage) + 200) / 200;
    // 根据图片位置计算偏移量，中间的图片偏移最小
    const centerIndex = Math.floor(images.length / 2);
    const distanceFromCenter = index - centerIndex;
    // 偏移范围从-20到20
    const offset = distanceFromCenter * 20 * normalizedPercentage;
    
    return `${50 + offset}% center`;
  };

  return (
    <div className="fixed w-screen h-screen overflow-hidden bg-black">
      {/* Selected Image Overlay */}
      {selectedImage && (
        <div className="fixed top-[10vh] left-[10vw] w-[80vw] h-[80vh] z-10 bg-black">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Image Track */}
      <div
        ref={trackRef}
        className={`flex gap-[4vmin] absolute left-[50%] top-1/2 -translate-y-1/2 select-none cursor-grab duration-600
          ${isMinimized ? 'fixed right-[2vmin] bottom-[2vmin] top-auto left-auto scale-[0.2] origin-bottom-right z-50 hover:scale-[0.25] transition-all duration-400' : ''}
          transition-transform duration-300 ease-out`}
        style={{
          transform: `translate(${percentage}%, -50%)`,
        }}
        onMouseDown={handleOnDown}
        onTouchStart={handleOnDown}
        onTouchEnd={handleOnUp}
        onTouchMove={handleOnMove}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            draggable="false"
            className="md:size-[40vmin] size-[60vmin] object-cover transition-all duration-300 ease-out hover:scale-105"
            style={{
              objectPosition: calculateObjectPosition(index)
            }}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageTrack; 