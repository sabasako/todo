import AddButton from "@/components/AddButton";
import Filter from "@/components/Filter";
import Input from "@/components/Input";
import List from "@/components/List";
import Modal from "@/components/Modal";
import Head from "next/head";

import { useState } from "react";

const LISTS = ["NOTE #1", "NOTE #2", "NOTE #3", "NOTE #4", "NOTE #5"];

export default function Home() {
  const [lists, setLists] = useState(LISTS);

  function handleAddList(value) {
    setLists((prev) => [...prev, value]);
  }

  return (
    <>
      <Head>
        <title>TODO APP</title>
      </Head>
      <h1 className="main-heading">TODO LIST</h1>
      <div className="input-wrapper">
        <Input />
        <Filter />
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
      <AddButton onAddList={handleAddList} />
      <List lists={lists} />
    </>
  );
}
