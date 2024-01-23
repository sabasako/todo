import { useRef, useEffect } from "react";
import classes from "./Modal.module.css";

export default function Modal({ onCancel, title, placeholder, onSubmitForm }) {
  const inputRef = useRef();

  function handleForm(e) {
    e.preventDefault();
    onAddList(inputRef.current.value);
    onCancel();
  }

  useEffect(() => {
    inputRef.current.focus();
    const keyDown = document.body.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    });

    return () => {
      document.body.removeEventListener("keydown", keyDown);
    };
  }, [onCancel]);

  return (
    <>
      <div onClick={onCancel} className={classes.background}></div>
      <div className={classes.modal}>
        <h3 className={classes.heading}>{title}</h3>
        <form
          action=""
          className={classes.form}
          onSubmit={(e) => onSubmitForm(e, inputRef.current.value)}
        >
          <input
            ref={inputRef}
            className={classes.input}
            type="text"
            placeholder={placeholder}
          />
          <div className={classes.btnWrapper}>
            <button
              type="button"
              className={classes.cancelBtn}
              onClick={onCancel}
            >
              CANCEL
            </button>
            <button className={classes.applyBtn} type="submit">
              APPLY
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
