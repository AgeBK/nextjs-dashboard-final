import Image from 'next/image';
import data from '@/app/lib/appData.json';
import { ImgProps } from '../lib/definitions';
// import styles from "@/app/_assets/css/Image.module.css";

export default function Img({ imgSrc, imgAlt, imgWidth, imgHeight }: ImgProps) {
  const { imgPath } = data;
  return (
    <Image
      className=""
      src={`${imgPath}${imgSrc}`}
      alt={imgAlt}
      width={imgWidth}
      height={imgHeight}
      // priority // TODO: ?
    />
  );
}
