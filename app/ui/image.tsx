import Image from 'next/image';
import data from '@/app/lib/appData.json';
// import styles from "@/app/_assets/css/Image.module.css";

type ImgProps = {
  imageSrc: string;
  // imageStyle: keyof typeof styles;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

const Img = ({
  imageSrc,
  // imageStyle, // TODO: am i using?
  imageAlt,
  imageWidth,
  imageHeight,
}: ImgProps) => {
  const { imgPath } = data;
  return (
    <Image
      className=""
      src={`${imgPath}${imageSrc}`}
      alt={imageAlt}
      width={imageWidth}
      height={imageHeight}
      priority // TODO: ?
    />
  );
};

export default Img;
