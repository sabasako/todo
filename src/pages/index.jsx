import AddButton from "@/components/AddButton";
import Filter from "@/components/Filter";
import Input from "@/components/Input";
import LayoutChanger from "@/components/LayoutChanger";
import List from "@/components/List";
import Modal from "@/components/Modal";
import ThemeButton from "@/components/ThemeButton";
import Head from "next/head";

import { useState } from "react";

let defaultTheme =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export default function Home() {
  const [lists, setLists] = useState([
    {
      date: "2004-12-04",
      description:
        "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lrem ipsum",
      completed: false,
      name: "rubiki",
      id: "1fsdfsdf",
    },
    {
      date: "2004-01-04",
      description:
        "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lrem ipsum",
      completed: true,
      name: "loiaoki",
      id: "1fsdfsdf2",
    },
    {
      date: "2004-12-23",
      description: "",
      completed: true,
      name: "lori",
      id: "1fsdfsdf23",
    },
    {
      date: "2004-05-21",
      description: "",
      completed: false,
      name: "rubiki12",
      id: "1fsdfsdf234",
    },
    {
      date: "2004-06-04",
      description: "",
      completed: false,
      name: "ruca",
      id: "1fsdfsdf2345",
    },
    {
      date: "2004-07-04",
      description: "",
      completed: false,
      name: "irakli",
      id: "1fsdfsdf23456",
    },
    {
      date: "2004-12-04",
      description: "",
      completed: false,
      name: "ira123",
      id: "1fsdfsdf234567",
    },
    {
      date: "2004-08-27",
      description:
        "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lrem ipsum",
      completed: false,
      name: "listani",
      id: "1fsdfsdf2345678",
    },
    {
      date: "2004-09-14",
      description: "",
      completed: true,
      name: "List",
      id: "1fsdfsdf23456789",
    },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [currentId, setCurrentId] = useState();

  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  const [currentLayout, setCurrentLayout] = useState("list");

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

  function handleSubmitForm(e, value, descriptionValue, dateValue) {
    e.preventDefault();
    setLists((prev) => [
      ...prev,
      {
        completed: false,
        name: value,
        description: descriptionValue,
        id: Date.now(),
        date: dateValue,
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
  function handleEditForm(e, value, descriptionValue, dateValue) {
    e.preventDefault();
    const newList = lists.map((list) => {
      if (list.id === currentId) {
        return {
          ...list,
          name: value,
          description: descriptionValue,
          date: dateValue,
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

  function switchTheme() {
    if (currentTheme === "light") {
      document.documentElement.style.setProperty("--primary-color", "#f7f7f7");
      document.documentElement.style.setProperty("--secondary-color", "#fff");
      document.documentElement.style.setProperty(
        "--background-color",
        "#252525"
      );
      document.documentElement.style.setProperty("--border-color", "#f7f7f7");
      document.documentElement.style.setProperty(
        "--list-border-color",
        "#6b63ff6c"
      );
      document.documentElement.style.setProperty(
        "--secondary-light-color",
        "#d3d3d3"
      );
      document.documentElement.style.setProperty(
        "--cancel-btn-hover-color",
        "#323232"
      );
      document.documentElement.style.setProperty(
        "--layout-background-color",
        "#bebebe72"
      );
      setCurrentTheme("dark");
    } else {
      document.documentElement.style.setProperty("--primary-color", "#6c63ff");
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#252525"
      );
      document.documentElement.style.setProperty("--background-color", "#fff");
      document.documentElement.style.setProperty("--border-color", "#6c63ff");
      document.documentElement.style.setProperty(
        "--list-border-color",
        "#6b63ff6c"
      );
      document.documentElement.style.setProperty(
        "--secondary-light-color",
        "#5f5f5f"
      );
      document.documentElement.style.setProperty(
        "--cancel-btn-hover-color",
        "#d2d2d2"
      );
      document.documentElement.style.setProperty(
        "--layout-background-color",
        "#c2e7ff"
      );
      setCurrentTheme("light");
    }
  }

  function switchLayout(layout) {
    setCurrentLayout(layout);
  }

  return (
    <>
      <Head>
        <title>TODO APP</title>
        <meta
          name="description"
          content="TODO APP, app where you can add todo lists, sort them, you can edit or delete lists later, you can filter lists by completed or pending, you can search lists by name, supports dark and light themes, "
        />
      </Head>
      <main>
        <h1 className="main-heading">TODO LIST</h1>
        <div className="input-wrapper">
          <LayoutChanger layout={currentLayout} switchLayout={switchLayout} />
          <Input onSearch={(value) => setSearchValue(value)} lists={lists} />
          <Filter
            options={["All", "Completed", "Pending"]}
            onFilterChange={(value) => setSelectedFilter(value)}
          />
          <ThemeButton switchTheme={switchTheme} currentTheme={currentTheme} />
        </div>
        <List
          onCheck={handleCheck}
          selectedFilter={selectedFilter}
          value={searchValue}
          onEdit={handleEdit}
          onDelete={handleDelete}
          lists={lists}
          currentTheme={currentTheme}
          currentLayout={currentLayout}
        />
        {showNewModal && (
          <Modal
            title={"NEW NOTE"}
            placeholder={"Note title... *"}
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
            currentId={currentId}
            lists={lists}
            date={lists.find((list) => list.id === currentId).date}
          />
        )}
        <AddButton
          currentLayout={currentLayout}
          onAddList={() => setShowNewModal(true)}
        />
      </main>
    </>
  );
}
