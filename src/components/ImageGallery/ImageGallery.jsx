import { ImageGalleryWrap } from "./ImageGallery.styled";
import { ImageGalleryItem } from "../ImageGalleryItem";

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ImageGalleryWrap>
      {images.map((item) => (
        <ImageGalleryItem key={item.id} image={item} openModal={openModal} />
      ))}
    </ImageGalleryWrap>
  );
};
