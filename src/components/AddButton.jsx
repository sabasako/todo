import Modal from "./Modal";

export default function AddButton({ onAddList, currentLayout }) {
  return (
    <div
      onClick={onAddList}
      className={currentLayout === "list" ? "btn-wrapper" : "grid-btn-wrapper"}
    >
      <button
        className={`add-todo icon-transition ${
          currentLayout === "list" ? "add-list" : "add-grid"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <p className={currentLayout === "list" ? "add-p" : "grid-add-p"}>
          New Note
        </p>
      </button>
    </div>
  );
}
