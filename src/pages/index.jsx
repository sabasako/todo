import AddButton from "@/components/AddButton";
import Filter from "@/components/Filter";
import Input from "@/components/Input";
import List from "@/components/List";
import Modal from "@/components/Modal";
import Head from "next/head";

import { useEffect, useState } from "react";

export default function Home() {
  const [lists, setLists] = useState([
    { completed: false, name: "rubiki", id: "1fsdfsdf" },
    { completed: true, name: "loiaoki", id: "1fsdfsdf2" },
    { completed: true, name: "lori", id: "1fsdfsdf23" },
    { completed: false, name: "rubiki12", id: "1fsdfsdf234" },
    { completed: false, name: "ruca", id: "1fsdfsdf2345" },
    { completed: false, name: "irakli", id: "1fsdfsdf23456" },
    { completed: false, name: "ira123", id: "1fsdfsdf234567" },
    { completed: false, name: "listani", id: "1fsdfsdf2345678" },
    { completed: false, name: "List", id: "1fsdfsdf23456789" },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [currentId, setCurrentId] = useState();

  // useEffect(() => {
  //   const sendData = async () => {
  //     const response = await fetch(
  //       "https://todo-625d5-default-rtdb.firebaseio.com",
  //       {
  //         method: "POST",
  //         body: JSON.stringify(lists),
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //   };
  // }, []);

  // when user adds new list, this function will get list name value from form and update lists state

  function handleSubmitForm(e, value) {
    e.preventDefault();
    setLists((prev) => [
      ...prev,
      {
        completed: false,
        name: value,
        id: Date.now(),
      },
    ]);
    setShowNewModal(false);
  }

  // when user clicks on edit icon, this function will show edit modal and update ui
  function handleEdit(id) {
    setShowEditModal(true);
    setCurrentId(id);
  }

  // when user clicks on apply button in edit modal, this function will get data from form and update editValue state
  function handleEditForm(e, value) {
    e.preventDefault();
    const newList = lists.map((list) => {
      if (list.id === currentId) {
        return {
          ...list,
          name: value,
        };
      }
      return list;
    });
    setLists(newList);
    setShowEditModal(false);
  }

  // when user clicks on delete icon, this function will delete that specific list and update ui
  function handleDelete(id) {
    const newList = lists.filter((list) => list.id !== id);
    setLists(newList);
  }

  function handleCheck(id, checked) {
    const newList = lists.map((list) => {
      if (list.id === id) {
        return {
          ...list,
          completed: checked,
        };
      }
      return list;
    });
    setLists(newList);
  }

  return (
    <>
      <Head>
        <title>TODO APP</title>
      </Head>
      <h1 className="main-heading">TODO LIST</h1>
      <div className="input-wrapper">
        <Input onSearch={(value) => setSearchValue(value)} lists={lists} />
        <Filter onFilterChange={(value) => setSelectedFilter(value)} />
        <button className="theme-btn btn-transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </button>
      </div>
      <AddButton onAddList={() => setShowNewModal(true)} />
      <List
        onCheck={handleCheck}
        selectedFilter={selectedFilter}
        value={searchValue}
        onEdit={handleEdit}
        onDelete={handleDelete}
        lists={lists}
      />
      {showNewModal && (
        <Modal
          title={"NEW NOTE"}
          placeholder={"Input your note..."}
          onSubmitForm={handleSubmitForm}
          onCancel={() => setShowNewModal(false)}
        />
      )}
      {showEditModal && (
        <Modal
          title={"EDIT NOTE"}
          placeholder={"Edit note..."}
          onSubmitForm={handleEditForm}
          onCancel={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}
