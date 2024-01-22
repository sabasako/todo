import { forwardRef } from "react";
import classes from "./Modal.module.css";

const Modal = forwardRef(function Modal({ onCancel }, ref) {
  function handleForm(e) {
    e.preventDefault();
    onCancel();
  }

  return (
    <>
      <div className={classes.background}></div>
      <div className={classes.modal}>
        <h3 className={classes.heading}>NEW NOTE</h3>
        <form action="" className={classes.form} onSubmit={handleForm}>
          <input
            ref={ref}
            className={classes.input}
            type="text"
            placeholder="Input your node..."
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
});

export default Modal;
