import Image from 'next/image';
import data from '@/app/lib/appData.json';
import { ImgProps } from '../lib/definitions';
// import styles from "@/app/_assets/css/Image.module.css";

export default function Img({
  imageSrc, // TODO: make imgSrc etc, shorter
  imageAlt,
  imageWidth,
  imageHeight,
}: ImgProps) {
  const { imgPath } = data;
  return (
    <Image
      className=""
      src={`${imgPath}${imageSrc}`}
      alt={imageAlt}
      width={imageWidth}
      height={imageHeight}
      // priority // TODO: ?
    />
  );
}
