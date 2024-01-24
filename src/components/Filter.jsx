import classes from "./Filter.module.css";

export default function Filter({ onFilterChange, options }) {
  return (
    <select
      onChange={(e) => onFilterChange(e.target.value)}
      name="filter"
      id="filter"
      className={`${classes.filter}`}
    >
      <option value="All">All</option>
      <option value="Completed">Completed</option>
      <option value="Pending">Pending</option>
    </select>
  );
}
