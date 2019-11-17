import React, { useState } from "react";
import "./App.css";
import MainForm from "./components/MainForm";
import CalendarModal from "./components/CalendarModal";
import Logo from "./Sanidentas_logotipas.svg";
function App() {
    const [date, setDate] = useState(new Date());

    const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
    const toggleCalendar = () =>
        setCalendarModalVisible(!isCalendarModalVisible);

    return (
        <div className="App">
            <header className="App-header">
                <img src={Logo} alt="sanidentas" style={{ width: 150 }} />
            </header>
            <MainForm date={date} toggleCalendar={toggleCalendar} />
            {isCalendarModalVisible && (
                <CalendarModal
                    setDate={setDate}
                    date={date}
                    toggleCalendar={toggleCalendar}
                />
            )}
        </div>
    );
}

export default App;
