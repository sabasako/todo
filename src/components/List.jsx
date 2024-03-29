import classes from "./List.module.css";
import empty from "/public/empty.svg";
import darkEmpty from "/public/dark-empty.svg";
import Image from "next/image";

// prettier-ignore
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December",];

// prettier-ignore
export default function List({ lists, onEdit, onDelete, value, selectedFilter, onCheck, currentTheme, currentLayout }) {
  let listsToRender;
  if (selectedFilter === "Completed") {
    listsToRender = lists.filter((list) => list.completed === true && list.name.toLowerCase().includes(value));
  } else if (selectedFilter === "Pending") {
    listsToRender = lists.filter((list) => list.completed === false && list.name.toLowerCase().includes(value));
  } else {
    listsToRender = lists.filter((list) => list.name.toLowerCase().includes(value));
  }

  return (
    <ul className={currentLayout === "list" ? classes.ul : classes.gridUl}>
      {lists.length === 0 ? (
        <div className={classes.emptyWrapper}>
          {currentTheme === "light" ? 
          <Image src={empty} alt="Empty list icon"  /> : <Image src={darkEmpty} alt="Dark Empty list icon" />}
          <p>Empty...</p>
        </div>
      ) : (
        listsToRender
          .slice()
          .reverse()
          .map((list) => (
            <div key={list.id} className={currentLayout === "list" ? classes.wrapper : classes.gridWrapper}>
              <li className={currentLayout === "list" ? classes.li : classes.liGrid}>
                <div className={classes.titleWrapper}>
                  <input onChange={(e) => onCheck(list.id, e.target.checked)} className={classes.input} type="checkbox" checked={list.completed}/>
                  <p className={classes.text}>{list.name}</p>
                 {list.completed && <div className={classes.checkedSvgWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#ffffff" className={classes.checkedSvg}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>}
                </div>
                <div className={classes.svgWrapper}>
                  {currentLayout === "list" && <p className={classes.date}>{`${new Date(list.date).getDate() || ""} ${monthNames[new Date(list.date).getMonth()] || "No due date"}`}</p>}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${classes.svg} ${classes.edit}`}
                    onClick={() => onEdit(list.id)}
                  >
                    <path
                      d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${classes.svg} ${classes.delete}`}
                    onClick={() => onDelete(list.id)}
                  >
                    <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" />
                    <path d="M14.625 3.75H3.375" strokeLinecap="round" />
                    <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" />
                    <path d="M10.5 9V12.75" strokeLinecap="round" />
                    <path d="M7.5 9V12.75" strokeLinecap="round" />
                  </svg>
                </div>
              </li>
              {list.description !== "" && <p className={`${classes.description} ${list.completed ? classes.textLine : ""}`}>{list.description}</p>}
            </div>
          ))
      )}
    </ul>
  );
}
