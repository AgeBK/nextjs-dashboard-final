'use client';

import ErrorMain from '../ui/error-main';
import data from '@/app/lib/appData.json';

// if db error occurs
export default function Error() {
  const { errorMsg } = data;
  return <ErrorMain message={errorMsg} />;
}
