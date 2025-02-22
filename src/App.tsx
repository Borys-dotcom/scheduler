import { useState } from "react";
import "./App.css";
import Scheduler from "./Scheduler/Scheduler";
import { Button, Container } from "react-bootstrap";

function App() {

  const [scheduleDate, setScheduleDate] = useState(new Date());

  const handleChangeDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const [action, duration] = target.id.split("-");
    setScheduleDate((prevScheduleDate) => {
      return new Date(
        prevScheduleDate.setDate(
          prevScheduleDate.getDate() +
            (duration === "day" ? 1 : 7) * (action === "plus" ? 1 : -1)
        )
      );
    });
  };

  return (
    <div className="App">
      <Container className="d-flex justify-content-center">
        <Button className="mx-2" id="minus-week" onClick={handleChangeDate}>
          &lt;&lt;
        </Button>
        <Button className="mx-2" id="minus-day" onClick={handleChangeDate}>
          &lt;
        </Button>

        <div className="date-display card">
          {scheduleDate.toISOString().split("T")[0]}
        </div>

        <Button className="mx-2" id="plus-day" onClick={handleChangeDate}>
          &gt;
        </Button>
        <Button className="mx-2" id="plus-week" onClick={handleChangeDate}>
          &gt;&gt;
        </Button>
      </Container>

      <Scheduler scheduleDate={scheduleDate} />
    </div>
  );
}

export default App;
