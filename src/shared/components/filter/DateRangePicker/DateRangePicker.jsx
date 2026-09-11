import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./DateRangePicker.module.css";

const DateRangePicker = ({
  startDate,
  endDate,
  onChange,
  label = "Projektperiode",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedRange = {
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  };

  const handleSelect = (range) => {
    onChange({
      startDate: range?.from ? range.from.toISOString().split("T")[0] : "",
      endDate: range?.to ? range.to.toISOString().split("T")[0] : "",
    });
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>

      <button
        type="button"
        className={styles.input}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{startDate || "Startdato"}</span>

        <span>→</span>

        <span>{endDate || "Deadline"}</span>
      </button>

      {isOpen && (
        <div className={styles.calendar}>
          <DayPicker
            mode="range"
            selected={selectedRange}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
