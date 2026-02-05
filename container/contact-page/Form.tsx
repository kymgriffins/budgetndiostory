"use client";
import { FadeUp } from "@/animation";
import { RoundButton } from "@/components";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <section className="w-full padding-x py-[40px]">
        <FadeUp>
          <div className="w-full flex flex-col items-center justify-center py-[80px] gap-[20px]">
            <h2 className="sub-heading font-FoundersGrotesk text-secondry uppercase">
              Message Sent!
            </h2>
            <p className="paragraph text-secondry font-NeueMontreal text-center max-w-[400px]">
              Thank you for reaching out. We'll get back to you as soon as
              possible.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="paragraph font-NeueMontreal text-secondry underline mt-[20px]"
            >
              Send another message
            </button>
          </div>
        </FadeUp>
      </section>
    );
  }

  return (
    <section className="w-full padding-x py-[40px]">
      <FadeUp delay={0.2}>
        <form onSubmit={handleSubmit} className="w-full max-w-[800px]">
          <div className="w-full flex flex-col gap-[30px]">
            {/* Name and Email Row */}
            <div className="w-full flex gap-[30px] smOnly:flex-col xm:flex-col">
              <div className="w-full">
                <label className="paragraph font-NeueMontreal text-secondry mb-[10px] block">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="paragraph w-full font-NeueMontreal text-secondry bg-transparent border-b border-[#21212155] focus:border-secondry outline-none py-[10px] transition duration-200"
                />
              </div>
              <div className="w-full">
                <label className="paragraph font-NeueMontreal text-secondry mb-[10px] block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="paragraph w-full font-NeueMontreal text-secondry bg-transparent border-b border-[#21212155] focus:border-secondry outline-none py-[10px] transition duration-200"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="w-full">
              <label className="paragraph font-NeueMontreal text-secondry mb-[10px] block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
                className="paragraph w-full font-NeueMontreal text-secondry bg-transparent border-b border-[#21212155] focus:border-secondry outline-none py-[10px] transition duration-200"
              />
            </div>

            {/* Message */}
            <div className="w-full">
              <label className="paragraph font-NeueMontreal text-secondry mb-[10px] block">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more..."
                required
                rows={5}
                className="paragraph w-full font-NeueMontreal text-secondry bg-transparent border-b border-[#21212155] focus:border-secondry outline-none py-[10px] transition duration-200 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-[20px]">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RoundButton
                  bgcolor="#212121"
                  href="#"
                  title={isSubmitting ? "Sending..." : "Send Message"}
                  className="bg-white text-black"
                  style={{ color: "#fff" }}
                />
              </motion.button>
            </div>
          </div>
        </form>
      </FadeUp>
    </section>
  );
}
