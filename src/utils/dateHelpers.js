export const getWeekDates = (year, weekNumber) => {
  const dayNames = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];
  const backendDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
  const monday = getMondayOfWeek(year, weekNumber);

  return dayNames.map((dayName, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return {
      dayName,
      date: date.toLocaleDateString("da-DK", {
        day: "numeric",
        month: "long",
      }),
      backendDay: backendDays[index],
    };
  });
};

export const getWeekDateString = (year, weekNumber) => {
  const monday = getMondayOfWeek(year, weekNumber);
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  const options = { day: "numeric", month: "long" };
  const startStr = monday.toLocaleDateString("da-DK", options);
  const endStr = friday.toLocaleDateString("da-DK", options);

  return `${startStr}, ${year} - ${endStr}, ${year}`;
};

export const getCurrentWeekAndYear = () => {
  const date = new Date();
  const target = new Date(date.valueOf());

  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);

  const year = target.getFullYear();

  const firstThursday = new Date(year, 0, 4);
  const firstDayNr = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDayNr + 3);

  const week =
    1 + Math.round((target - firstThursday) / (7 * 24 * 60 * 60 * 1000));

  return { week, year };
};

export const getUpcomingWeeks = (
  numWeeks = 8,
  { startFromNextWeek = true } = {},
) => {
  const { week: startWeek, year: startYear } = getCurrentWeekAndYear();
  const weeks = [];

  let currentWeek = startWeek;
  let currentYear = startYear;

  if (startFromNextWeek) {
    currentWeek++;
    if (currentWeek > 52) {
      currentWeek = 1;
      currentYear++;
    }
  }

  for (let i = 0; i < numWeeks; i++) {
    weeks.push({
      week: currentWeek,
      year: currentYear,
      label: `Uge ${currentWeek} (${getWeekDateString(currentYear, currentWeek)})`,
    });

    currentWeek++;

    if (currentWeek > 52) {
      currentWeek = 1;
      currentYear++;
    }
  }

  return weeks;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getGreetingWelcomeMessage = () => {
  const hour = new Date().getHours();

  if (hour < 9) return "Godmorgen";
  if (hour < 12) return "God formiddag";
  if (hour < 17) return "God eftermiddag";

  return "Godaften";
};

export const getTodaysFormattedDate = () => {
  const date = new Date().toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return date.charAt(0).toUpperCase() + date.slice(1);
};

export const getWeekAndYearFromDate = (dateInput) => {
  const date = new Date(dateInput);
  const target = new Date(date.valueOf());

  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);

  const year = target.getFullYear();

  const firstThursday = new Date(year, 0, 4);
  const firstDayNr = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDayNr + 3);

  const week =
    1 + Math.round((target - firstThursday) / (7 * 24 * 60 * 60 * 1000));

  return { week, year };
};

export const getTodayDate = () => new Date().toISOString().split("T")[0];

const getMondayOfWeek = (year, weekNumber) => {
  const firstDayOfYear = new Date(year, 0, 1);
  const monday = new Date(firstDayOfYear);

  monday.setDate(
    firstDayOfYear.getDate() +
      (weekNumber - 1) * 7 -
      ((firstDayOfYear.getDay() + 6) % 7),
  );

  return monday;
};
