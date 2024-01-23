import { useRef } from "react";
import classes from "./Input.module.css";

export default function Input({ onSearch }) {
  const inputValue = useRef();

  function handleInput() {
    let value = inputValue.current.value.toLowerCase();
    onSearch(value);
  }

  return (
    <>
      <input
        onChange={handleInput}
        className={classes.input}
        ref={inputValue}
        type="text"
        placeholder="Search note"
      />
    </>
  );
}
