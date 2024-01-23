import classes from "./Filter.module.css";

export default function Filter({ onFilterChange }) {
  const handleChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <select
      onChange={handleChange}
      name="filter"
      id="filter"
      className={`${classes.filter} btn-transition`}
    >
      <option value="All">All</option>
      <option value="Completed">Completed</option>
      <option value="Incomplete">InComplete</option>
    </select>
  );
}
