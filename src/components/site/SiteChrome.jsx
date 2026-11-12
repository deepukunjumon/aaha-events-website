import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import AnnouncementBar from "@/components/site/AnnouncementBar";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import BackToTop from "@/components/site/BackToTop";

export default function SiteChrome({ settings = {}, services = [], children }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-sm focus:bg-forest focus:px-4 focus:py-2 focus:text-[0.7rem] focus: focus:tracking-[0.2em] focus:text-bone"
      >
        Skip to content
      </a>
      <AnnouncementBar settings={settings} />
      <Header settings={settings} />
      <main id="main" className="flex-1">
        <motion.div
          key={pathname}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </main>
      <Footer settings={settings} services={services} />
      <WhatsAppButton settings={settings} />
      <BackToTop />
    </div>
  );
}