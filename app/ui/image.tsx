import Image from "next/image";
import appData from "@/app/lib/appData.json"; // TODO:
import styles from "@/app/_assets/css/Image.module.css";

type ImgProps = {
  imageSrc: string;
  imageStyle: keyof typeof styles;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

const Img = ({
  imageSrc,
  imageStyle, // TODO: am i using?
  imageAlt,
  imageWidth,
  imageHeight,
}: ImgProps) => {
  // console.log(imageSrc, imageWidth);

  return (
    <Image
      className={styles[imageStyle]}
      src={`${appData.imgPath}${imageSrc}`}
      alt={imageAlt}
      width={imageWidth}
      height={imageHeight}
      priority // TODO: ?
    />
  );
};

export default Img;
