"use client";
import { FadeUp, LinkHover } from "@/animation";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Socials() {
  const [year, setYear] = useState(2024);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const contactInfo = [
    {
      icon: <Mail size={20} strokeWidth={1.5} />,
      label: "Email",
      value: "info@budgetndiostory.org",
      href: "mailto:info@budgetndiostory.org",
    },
    {
      icon: <Phone size={20} strokeWidth={1.5} />,
      label: "Phone",
      value: "+254711106814",
      href: "tel:+254711106814",
    },
    {
      icon: <MapPin size={20} strokeWidth={1.5} />,
      label: "Location",
      value: "Nairobi, Kenya",
      href: "#",
    },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Twitter", href: "https://twitter.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "YouTube", href: "https://youtube.com" },
  ];

  return (
    <section className="w-full bg-background py-[80px]">
      <FadeUp>
        <div className="w-full flex flex-col lgOnly:flex-row gap-[60px] padding-x">
          {/* Contact Info */}
          <div className="w-full lgOnly:w-[40%]">
            <h2 className="sub-heading font-FoundersGrotesk text-secondry uppercase mb-[40px]">
              Contact Info
            </h2>
            <div className="flex flex-col gap-[30px]">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-[15px]">
                  <div className="text-secondry mt-[2px]">{item.icon}</div>
                  <div>
                    <p className="paragraph font-NeueMontreal text-secondry mb-[5px]">
                      {item.label}
                    </p>
                    <LinkHover
                      className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                      title={item.value}
                      href={item.href}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="w-full lgOnly:w-[30%]">
            <h2 className="sub-heading font-FoundersGrotesk text-secondry uppercase mb-[40px]">
              Follow Us
            </h2>
            <div className="flex flex-col gap-[15px]">
              {socialLinks.map((social, index) => (
                <LinkHover
                  key={index}
                  className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                  title={social.name}
                  href={social.href}
                />
              ))}
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div className="w-full lgOnly:w-[30%]">
            <h2 className="sub-heading font-FoundersGrotesk text-secondry uppercase mb-[20px]">
              Stay Updated
            </h2>
            <p className="paragraph font-NeueMontreal text-secondry mb-[20px]">
              Subscribe to our newsletter for budget insights and updates.
            </p>
            <div className="flex gap-[10px]">
              <input
                type="email"
                placeholder="Your email"
                className="paragraph w-full font-NeueMontreal text-secondry bg-transparent border-b border-[#21212155] focus:border-secondry outline-none py-[10px]"
              />
              <button className="paragraph font-NeueMontreal text-secondry uppercase hover:underline">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Bottom Bar */}
      <div className="w-full border-t border-[#21212122] mt-[60px] pt-[30px]">
        <div className="flex flex-col smOnly:flex-row xm:flex-row justify-between items-center gap-[20px] padding-x">
          <p className="paragraph font-NeueMontreal text-secondry">
            © {year} Budget Ndio Story. All rights reserved.
          </p>
          <div className="flex gap-[30px]">
            <Link
              href="/privacy"
              className="paragraph font-NeueMontreal text-secondry hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="paragraph font-NeueMontreal text-secondry hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
