import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { fetchImages } from "../services/api";
import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { AppWrap, IdleStatus, NoImageWrap } from "./App.styled";
import { ImagesErrorView } from "./ImagesErrorView";
import { ImagesPendingView } from "./ImagesPendingView";
import noImage from "./no_image.jpeg";
import { useEffect } from "react";

export function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus("pending");
    getImages();
    setStatus("resolved");
    // eslint-disable-next-line 
  }, [query, page]);

  const getImages = async () => {
    await fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        setImages([...images, ...hits]);
        setTotalHits(totalHits);
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      });
  };

  const openModal = (largeImageURL, tags) => {
    setSelectedImageUrl(largeImageURL);
    setTags(tags);
  };

  const onCloseModal = () => {
    setSelectedImageUrl("");
  };

  const onSubmitForm = (inputName) => {
    if (inputName !== query) {
      setQuery(inputName);
      setImages([]);
      setPage(1);
    }
  };

  let isBtnLoadMore = false;
  let countPages = Math.ceil(totalHits / 12);

  if (totalHits && images.length && page < countPages) {
    isBtnLoadMore = true;
  }

  return (
    <AppWrap>
      <Searchbar onSubmit={onSubmitForm} />
      {status === "idle" && (
        <IdleStatus>
          There are no images here yet...
          <NoImageWrap src={noImage} width="240" alt="saddog" />
        </IdleStatus>
      )}
      {status === "pending" && <ImagesPendingView />}

      {status === "rejected" && <ImagesErrorView message={error.message} />}

      {status === "resolved" && images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {isBtnLoadMore && (
        <Button
          page={page}
          onLoadMore={() => setPage((s) => s + 1)}
          countPages={countPages}
        />
      )}
      {selectedImageUrl && (
        <Modal
          selectedImageUrl={selectedImageUrl}
          tags={tags}
          onCloseModal={onCloseModal}
        />
      )}
      <ToastContainer autoClose={3000} />
    </AppWrap>
  );
}
