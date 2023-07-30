import dayjs from "dayjs";

export const FAKE_ARR_EVENTS = [
  {
    id: 0,
    date: dayjs("2023 6 11"),
    title: "Meeting",
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    background: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    message: "meeting is about debugging and testing",
  },
  {
    id: 1,

    date: dayjs("2023 6 11"),
    title: "Travel",
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    background: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    message: "have second lesson",
  },
  {
    id: 2,
    date: dayjs("2023 6 2"),
    title: "extra",
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    background: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    message: "have second lesson",
  },
  {
    id: 3,
    date: dayjs("2023 6 5"),
    title: "university",
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    background: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    message: "have second lesson",
  },
  {
    id: 4,
    date: dayjs("2023 6 5"),
    title: "add",
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    background: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    message: "have second lesson",
  },
  {
    id: 5,
    date: dayjs("2023 6 12"),
    title: "Birthday",
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    background: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    message: "have second lesson",
  },
  {
    id: 6,
    date: dayjs("2023 5 18"),
    title: "Last",
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    background: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    message: "have second lesson",
  },
];

// export const weekdaysLocal = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// export const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
