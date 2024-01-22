import Modal from "./Modal";
import { useState, useRef } from "react";

export default function AddButton({ onAddList }) {
  const [showModal, setShowModal] = useState(false);

  const value = useRef();
  console.log(value.current?.value);

  function handleAdd() {
    setShowModal(true);
  }

  function handleCancel() {
    setShowModal(false);
  }

  return (
    <>
      <button onClick={handleAdd} className="add-todo btn-transition">
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
      </button>
      {showModal && (
        <Modal onAddList={onAddList} ref={value} onCancel={handleCancel} />
      )}
    </>
  );
}
