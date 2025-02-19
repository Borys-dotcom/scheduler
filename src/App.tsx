import { useState } from "react";
import "./App.css";
import Scheduler from "./Scheduler/Scheduler";
import { Button, Container } from "react-bootstrap";

function App() {
  const [scheduleDate, setScheduleDate] = useState(new Date());

  const incrementDate = () => {
    setScheduleDate((prevScheduleDate) => {
      return new Date(prevScheduleDate.setDate(prevScheduleDate.getDate() + 1));
    });
  };

  const decrementDate = () => {
    setScheduleDate((prevScheduleDate) => {
      return new Date(prevScheduleDate.setDate(prevScheduleDate.getDate() - 1));
    });
  };

  return (
    <div className="App">
      <Container className="d-flex justify-content-center">
        <Button className="mx-2" onClick={decrementDate}>
          &lt;
        </Button>

        <div className="date-display card">
          {scheduleDate.toISOString().split("T")[0]}
        </div>

        <Button className="mx-2" onClick={incrementDate}>
          &gt;
        </Button>
      </Container>

      <Scheduler scheduleDate={scheduleDate} />
    </div>
  );
}

export default App;
