import { Overlay, ModalWrap } from "./Modal.styled";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

export function Modal({ selectedImageUrl, tags, onCloseModal }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCloseModal]);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) onCloseModal();
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWrap>
        <img src={selectedImageUrl} alt={tags} />
      </ModalWrap>
    </Overlay>,
    modalRoot
  );
}
