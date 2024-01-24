let defaultTheme =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export const switchTheme = () => {
  if (defaultTheme === "light") {
    document.documentElement.style.setProperty("--primary-color", "#f7f7f7");
    document.documentElement.style.setProperty("--secondary-color", "#fff");
    document.documentElement.style.setProperty("--background-color", "#252525");
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
    defaultTheme = "dark";
  } else {
    document.documentElement.style.setProperty("--primary-color", "#6c63ff");
    document.documentElement.style.setProperty("--secondary-color", "#252525");
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
    defaultTheme = "light";
  }
};
