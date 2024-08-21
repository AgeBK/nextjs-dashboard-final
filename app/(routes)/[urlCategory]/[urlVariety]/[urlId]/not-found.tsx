import ErrorMain from '@/app/ui/error-main';
import data from '@/app/lib/appData.json';

export default function NotFound() {
  const { notFoundMsg } = data;

  return <ErrorMain message={notFoundMsg} />;
}
