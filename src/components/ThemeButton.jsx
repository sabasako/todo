const defaultTheme =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export default function ThemeButton({}) {
  let currentTheme = defaultTheme;
  const switchTheme = () => {
    if (!currentTheme) {
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
      currentTheme = true;
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
      currentTheme = false;
    }
  };

  return (
    <button onClick={switchTheme} className="theme-btn btn-transition">
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
  );
}
