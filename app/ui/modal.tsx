import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./Modal.module.css";

const Modal = () => {
  const [toggleModal, setToggleModal] = useState(false);

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.target === e.currentTarget && setToggleModal(!toggleModal);
  };

  const contact = () => {
    alert("Contact");
  };

  return toggleModal ? (
    <section className={styles.modal} onClick={handleClick}>
      <div className={styles.contact}>
        <h3>Contact</h3>
        <button onClick={contact}>Email us!!</button>
      </div>
    </section>
  ) : (
    <button onClick={handleClick}>Contact us!!</button>
  );
};

export default Modal;
