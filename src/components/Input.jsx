import classes from "./Input.module.css";

export default function Input() {
  return (
    <>
      <input className={classes.input} type="text" placeholder="Search note" />
      {/* <input type="submit" /> */}
    </>
  );
}
