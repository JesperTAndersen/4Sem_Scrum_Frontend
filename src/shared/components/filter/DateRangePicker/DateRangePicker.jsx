import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./DateRangePicker.module.css";
import {
  formatShortDate,
  parseDateString,
  toDateString,
} from "@/utils/dateHelpers";

const DateRangePicker = ({
  startDate,
  endDate,
  onChange,
  label = "Projektperiode",
  startLabel = "Startdato",
  endLabel = "Deadline",
  hasError = false,
  errorMessage = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedRange = {
    from: startDate ? parseDateString(startDate) : undefined,
    to: endDate ? parseDateString(endDate) : undefined,
  };

  const handleSelect = (range) => {
    onChange({
      startDate: range?.from ? toDateString(range.from) : "",
      endDate: range?.to ? toDateString(range.to) : "",
    });
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <label className={styles.label}>{label}</label>

      <button
        type="button"
        className={`${styles.input} ${hasError ? styles.error : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={styles.dateField}>
          <span className={styles.dateLabel}>{startLabel}</span>

          <span className={startDate ? styles.dateValue : styles.placeholder}>
            {startDate
              ? formatShortDate(parseDateString(startDate))
              : "Vælg dato"}
          </span>
        </div>

        <span className={styles.arrow}>→</span>

        <div className={styles.dateField}>
          <span className={styles.dateLabel}>{endLabel}</span>

          <span className={endDate ? styles.dateValue : styles.placeholder}>
            {endDate ? formatShortDate(parseDateString(endDate)) : "Vælg dato"}
          </span>
        </div>
      </button>

      {hasError && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}

      {isOpen && (
        <div className={styles.calendar}>
          <DayPicker
            mode="range"
            selected={selectedRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            pagedNavigation
            showOutsideDays
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
