import styles from "./Search.module.css";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router";

const COMMANDS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Projekter", path: "/projects" },
  { label: "Medarbejdere", path: "/employees" },
  { label: "Kompetencer", path: "/competences" },
  { label: "Brugere", path: "/users" },
  { label: "Profil", path: "/profile" },
];

const Search = ({ collapsed }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const results =
    query.trim().length > 0
      ? COMMANDS.filter((c) =>
          c.label.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  const handleSelect = (path) => {
    navigate(path);
    setQuery("");
  };

  return (
    <>
      {!collapsed && (
        <div className={styles.wrapper}>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.icon} />
            <input
              type="text"
              placeholder="Gå til..."
              className={styles.input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {results.length > 0 && (
            <div className={styles.dropdown}>
              {results.map((c) => (
                <button
                  key={c.path}
                  className={styles.result}
                  onClick={() => handleSelect(c.path)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
