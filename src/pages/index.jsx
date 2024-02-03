import AddButton from "@/components/AddButton";
import Filter from "@/components/Filter";
import Input from "@/components/Input";
import LayoutChanger from "@/components/LayoutChanger";
import List from "@/components/List";
import Modal from "@/components/Modal";
import ThemeButton from "@/components/ThemeButton";
import Head from "next/head";

import { useEffect, useState } from "react";

// let defaultTheme =
//   typeof window !== "undefined" &&
//   window.matchMedia &&
//   window.matchMedia("(prefers-color-scheme: light)").matches
//     ? "light"
//     : "dark";

export default function Home() {
  const [lists, setLists] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [currentId, setCurrentId] = useState();

  const [currentTheme, setCurrentTheme] = useState("dark");

  const [currentLayout, setCurrentLayout] = useState("list");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }

    const savedLayout = localStorage.getItem("layout");
    if (savedLayout) {
      setCurrentLayout(savedLayout);
    }

    const savedLists = JSON.parse(localStorage.getItem("lists"));
    if (savedLists) {
      setLists(savedLists);
    }
  }, []);

  useEffect(() => {
    if (currentTheme === "dark") {
      document.body.classList.add("dark");
    } else if (currentTheme === "light") {
      document.body.classList.remove("dark");
    }
  }, [currentTheme]);

  // when user adds new list, this function will get list name value from form and update lists state
  function handleAdd(e, value, descriptionValue, dateValue) {
    e.preventDefault();
    setLists((prev) => {
      const newList = [
        ...prev,
        {
          completed: false,
          name: value,
          description: descriptionValue,
          id: Date.now(),
          date: dateValue,
        },
      ];
      localStorage.setItem("lists", JSON.stringify(newList));
      return newList;
    });
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
    localStorage.setItem("lists", JSON.stringify(newList));
  }

  // when user clicks on delete icon, this function will delete that specific list and update ui
  function handleDelete(id) {
    const newList = lists.filter((list) => list.id !== id);
    setLists(newList);
    localStorage.setItem("lists", JSON.stringify(newList));
  }

  // when user checks or unchecks list, this function will update completed state of that specific list
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
    localStorage.setItem("lists", JSON.stringify(newList));
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
      localStorage.setItem("theme", "dark");
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
      localStorage.setItem("theme", "light");
    }
  }

  function switchLayout(layout) {
    setCurrentLayout(layout);
    localStorage.setItem("layout", layout);
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
            onSubmitForm={handleAdd}
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
