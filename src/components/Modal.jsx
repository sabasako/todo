import { useRef, useEffect } from "react";
import classes from "./Modal.module.css";

export default function Modal({
  onCancel,
  title,
  placeholder,
  onSubmitForm,
  currentId,
  lists,
  date,
}) {
  const inputRef = useRef();
  const inputDescriptionRef = useRef();
  const inputDateRef = useRef();

  console.log(date);
  let currentList;

  if (lists) {
    currentList = lists?.find((list) => list.id === currentId);
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
      <div className={classes.wrapper}>
        <div className={classes.modal}>
          <h3 className={classes.heading}>{title}</h3>
          <form
            action=""
            className={classes.form}
            onSubmit={(e) =>
              onSubmitForm(
                e,
                inputRef.current.value,
                inputDescriptionRef.current.value,
                inputDateRef.current.value
              )
            }
          >
            <input
              defaultValue={currentList?.name || ""}
              ref={inputRef}
              className={classes.input}
              type="text"
              placeholder={placeholder}
              required
            />
            <textarea
              ref={inputDescriptionRef}
              className={classes.textarea}
              name="textarea"
              id="textarea"
              cols="30"
              rows="10"
              defaultValue={currentList?.description || ""}
              placeholder="Note description"
            ></textarea>
            <input
              ref={inputDateRef}
              type="date"
              className={classes.date}
              defaultValue={date || ""}
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
      </div>
    </>
  );
}
