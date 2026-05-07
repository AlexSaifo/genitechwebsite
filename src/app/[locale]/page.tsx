'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <>
      <section id="home">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('title')}
        </motion.div>
      </section>
      <section id="about" aria-hidden="true" />
      <section id="services" aria-hidden="true" />
      <section id="blog" aria-hidden="true" />
      <section id="contact" aria-hidden="true" />
    </>
  );
}
