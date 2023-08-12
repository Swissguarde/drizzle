import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type FooterProps = {};

interface ColumnProps {
  title: string;
  links: Array<string>;
}

const FooterColumn = ({ title, links }: ColumnProps) => {
  return (
    <div className="flex-1 flex flex-col gap-3 text-sm min-w-max">
      <p className="font-semibold">{title}</p>
      <div className="flex flex-col gap-2 font-normal">
        {links.map((link) => (
          <Link href="/" key={link}>
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="flex items-center justify-start flex-col lg:px-20 py-6 px-5 w-full gap-20 bg-[#FAFAFB]">
      <div className="flex w-full flex-col gap-12">
        <div className="flex flex-col items-start">
          <Image src="/logo.png" width={116} height={38} alt="logo" />

          <p className="mt-5 max-w-xs text-start text-sm font-normal">
            Drizzle is the leading community for creatives to share, grow, and
            get hired.
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />

          <div className="flex flex-1 flex-col gap-4">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>

          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />
          <div className="flex flex-1 flex-col gap-4">
            <FooterColumn
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterColumn
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>
          <FooterColumn
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
        </div>
      </div>

      <div className="flex justify-between items-center max-sm:flex-col w-full text-sm font-normal">
        <p>@ 2023 Drizzle. All rights reserved</p>
        <p className="text-gray">
          <span className="font-semibold text-black">
            22,345 projects submitted
          </span>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
