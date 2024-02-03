import classes from "./Message.module.css";

export default function Message({ message, color }) {
  return (
    <div className={classes.content} style={{ backgroundColor: color }}>
      <p className={classes.text}>{message}</p>
    </div>
  );
}
