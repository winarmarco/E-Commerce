import { Facebook, Instagram, Mail, Twitter } from "lucide-react";


const Footer = () => {
  return (
      <div className="h-[calc(25vh-90px-4rem)]  bg-gray-800 text-gray-100 mt-auto">
      <div className="grid h-full w-full grid-cols-4 items-center justify-center">
        <div className="flex items-center justify-center gap-x-2">
          <Instagram /> Essentia.au
        </div>

        <div className="flex items-center justify-center gap-x-2">
          <Twitter /> Essentia.au
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <Facebook /> Essentia.au
        </div>

        <div className="flex items-center justify-center gap-x-2">
          <Mail /> essentia@gmail.com
        </div>
      </div>
    </div>
  );
};

export default Footer;
