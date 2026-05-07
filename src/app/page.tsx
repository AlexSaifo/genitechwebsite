'use client';

import { motion } from 'framer-motion';
import {useTranslations} from 'next-intl';

export default function Example() {
  const t = useTranslations('Home');
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {t('title')}
    </motion.div>
  );
}