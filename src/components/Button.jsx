import clsx from "clsx";

const Button = ({ id, title, rightIcon, leftIcon, containerClass, href }) => {
  const ButtonTag = href ? 'a' : 'button';
  
  return (
    <ButtonTag
      id={id}
      href={href}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-orange-500 px-7 py-3 text-white",
        containerClass
      )}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {rightIcon}
    </ButtonTag>
  );
};

export default Button;
