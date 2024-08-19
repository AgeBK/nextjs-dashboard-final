import { ImgFillProps } from '../lib/definitions';
import Image from 'next/image';
import data from '@/app/lib/appData.json';
import styles from '@/app/assets/css/Image.module.css';

// Created this because product images are all different sizes (doesn't look good with set height/width)
export default function ImgFill({
  imgSrc,
  imgAlt,
  imgStyle,
  imgPriority,
}: ImgFillProps) {
  const { imgPath } = data;
  return (
    <div className={styles[imgStyle]}>
      <Image
        src={`${imgPath}${imgSrc}`}
        alt={imgAlt}
        fill
        style={{ objectFit: 'contain' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={imgPriority || false}
      />
    </div>
  );
}
