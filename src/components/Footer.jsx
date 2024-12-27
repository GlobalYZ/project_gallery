import { FaGithub, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.linkedin.com/in/muyangli1996/", icon: <FaLinkedin /> },
  { href: "https://github.com/GlobalYZ", icon: <FaGithub /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-orange-300 py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          Inspired by  <a href="https://zentry.com/">zentry</a>
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white hover:translate-y-[-5px]"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
