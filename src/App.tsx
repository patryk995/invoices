import React, { useState, useRef } from "react";
import { Button } from "semantic-ui-react";
import "./App.css";
import ReactToPrint from "react-to-print";
import InvoicePage from "./components/InvoicePage";
import MainForm from "./components/MainForm";
import CalendarModal from "./components/CalendarModal";

function App() {
  const [date, setDate] = useState(new Date());

  const invoiceRef = useRef<HTMLDivElement>(null);

  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const toggleCalendar = () => setCalendarModalVisible(!isCalendarModalVisible);

  return (
    <div className="App">
      <header className="App-header">UAB "Sanidentas"</header>
      <MainForm date={date} toggleCalendar={toggleCalendar} />

      {/* <div className="buttons-container">
        <ReactToPrint
          trigger={() => (
            <Button primary as="Link">
              Spausdinti sąskaita faktūra
            </Button>
          )}
          content={() => invoiceRef.current}
        />
        <ReactToPrint
          trigger={() => (
            <Button primary as="Link">
              Spausdinti 2 sąskaitas faktūras
            </Button>
          )}
          content={() => this.componentRef}
        />
        <ReactToPrint
          trigger={() => (
            <Button primary as="Link">
              Spausdinti KPO
            </Button>
          )}
          content={() => this.componentRef}
        />
      </div> */}

      <div style={{ display: "none" }}>
        <div ref={invoiceRef}>
          <InvoicePage />
        </div>
        {/* <Test ref={el => (this.invoice = el)} /> */}
      </div>
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
