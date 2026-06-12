import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Window from "./Window";
import ScrambleText from "./ScrambleText";
import SendEmail from "@/integrations/Core/SendEmail";

const inputCls =
  "w-full bg-raise/60 border border-line px-4 py-3 font-mono text-[13px] text-ink placeholder:text-faint/60 focus:border-acc/60 outline-none transition-colors";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await SendEmail({
        to: "danielbaravik1003@gmail.com",
        subject: `Portfolio contact: message from ${formData.name}`,
        body: `New message from the portfolio:\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`,
      });
      setSent(true);
    } catch {
      alert(
        "Couldn't open your mail client — email me directly at danielbaravik1003@gmail.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-bg2 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 font-mono">
          <p className="text-[13px] text-dim mb-2">
            <span className="text-acc">$</span> ./send_message --to daniel
          </p>
          <ScrambleText
            text="GET IN TOUCH"
            as="h2"
            className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-ink"
          />
          <p className="mt-4 text-[13px] text-dim max-w-xl leading-6">
            Hiring? Building something? Just want to argue about tabs vs
            spaces? My inbox compiles all of it.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Window title="~/contact — ./send_message">
              {sent ? (
                <div className="font-mono text-[13px] leading-7 py-6">
                  <p className="text-mint">✓ message handed off to your mail client</p>
                  <p className="text-dim mt-2">
                    If nothing opened, reach me directly:{" "}
                    <a
                      href="mailto:danielbaravik1003@gmail.com"
                      className="text-acc link-sweep"
                    >
                      danielbaravik1003@gmail.com
                    </a>
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="mt-6 border border-line2 px-4 py-2 text-dim hover:text-acc hover:border-acc/50 transition-colors"
                  >
                    $ ./send_message --again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-mono">
                  <div>
                    <label htmlFor="c-name" className="block text-[12px] text-faint mb-1.5">
                      <span className="text-vio">--name</span> string, required
                    </label>
                    <input
                      id="c-name"
                      name="name"
                      placeholder="Ada Lovelace"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputCls}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="block text-[12px] text-faint mb-1.5">
                      <span className="text-vio">--reply-to</span> email, required
                    </label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      placeholder="you@company.dev"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputCls}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="c-msg" className="block text-[12px] text-faint mb-1.5">
                      <span className="text-vio">--message</span> text, required
                    </label>
                    <textarea
                      id="c-msg"
                      name="message"
                      rows={5}
                      placeholder="We're building X and need someone who…"
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputCls} resize-y`}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-acc text-bg px-6 py-3 text-[13px] font-medium hover:bg-acc-dim transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                        executing…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        [ execute ↵ ]
                      </>
                    )}
                  </button>
                </form>
              )}
            </Window>
          </motion.div>

          {/* socials.json */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[13px]"
          >
            <Window title="~/contact/socials.json" contentClassName="p-5">
              <pre className="leading-7 whitespace-pre-wrap break-words">
                <span className="text-faint">{"{"}</span>
                {"\n  "}
                <span className="text-vio">"email"</span>
                <span className="text-faint">: </span>
                <a
                  href="mailto:danielbaravik1003@gmail.com"
                  className="text-amber link-sweep break-all"
                >
                  "danielbaravik1003@gmail.com"
                </a>
                <span className="text-faint">,</span>
                {"\n  "}
                <span className="text-vio">"github"</span>
                <span className="text-faint">: </span>
                <a
                  href="https://github.com/danielml1003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber link-sweep"
                >
                  "danielml1003"
                </a>
                <span className="text-faint">,</span>
                {"\n  "}
                <span className="text-vio">"linkedin"</span>
                <span className="text-faint">: </span>
                <a
                  href="https://www.linkedin.com/in/daniel-baravik-429b38207/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber link-sweep"
                >
                  "daniel-baravik"
                </a>
                <span className="text-faint">,</span>
                {"\n  "}
                <span className="text-vio">"phone"</span>
                <span className="text-faint">: </span>
                <a href="tel:+972546377655" className="text-amber link-sweep">
                  "+972 54-637-7655"
                </a>
                <span className="text-faint">,</span>
                {"\n  "}
                <span className="text-vio">"response_time"</span>
                <span className="text-faint">: </span>
                <span className="text-amber">"&lt; 24h"</span>
                {"\n"}
                <span className="text-faint">{"}"}</span>
              </pre>
            </Window>
            <p className="mt-4 text-faint leading-6">
              prefer the keyboard? the terminal up there also answers{" "}
              <span className="text-acc">socials</span> and{" "}
              <span className="text-acc">sudo hire-me</span>.
            </p>
          </motion.div>
        </div>

        {/* footer */}
        <footer className="mt-24 pt-8 border-t border-line font-mono text-[12px] text-faint flex flex-col sm:flex-row gap-3 items-center justify-between pb-10">
          <p>
            © {new Date().getFullYear()} Daniel Baravik — designed & built by
            hand, no template
          </p>
          <p>
            <span className="text-acc">$</span> echo "thanks for scrolling this
            far"
          </p>
        </footer>
      </div>
    </section>
  );
}
