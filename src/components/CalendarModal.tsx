import React from "react";
import Calendar from "react-calendar";
interface IProps {
  date: Date;
  toggleCalendar(): void;
  setDate: (newDate: Date) => void;
}
export const CalendarModal = ({ setDate, date, toggleCalendar }: IProps) => {
  return (
    <div className="calendar-modal">
      <div className="calendar-backdrop" onClick={toggleCalendar} />
      <Calendar
        className="calendar"
        locale="lt"
        selectRange={false}
        onChange={newDate => {
          if (Array.isArray(newDate) && newDate.length) {
            setDate(newDate[0]);
          } else if (newDate instanceof Date) {
            setDate(newDate);
          }
        }}
        value={date}
      />
    </div>
  );
};

export default CalendarModal;
