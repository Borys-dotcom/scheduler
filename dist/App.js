import React, { useState } from "react";
import "./App.css";
import Scheduler from "./Scheduler/Scheduler";
import { Button, Container } from "react-bootstrap";
import { availabilityInfo } from "./props/availabilityInfo";
import { schedulerSettings } from "./Scheduler/schedulerSettings";
function App() {
    var _a = useState(new Date()), scheduleDate = _a[0], setScheduleDate = _a[1];
    var handleChangeDate = function (e) {
        var target = e.currentTarget;
        var _a = target.id.split("-"), action = _a[0], duration = _a[1];
        setScheduleDate(function (prevScheduleDate) {
            return new Date(prevScheduleDate.setDate(prevScheduleDate.getDate() +
                (duration === "day" ? 1 : 7) * (action === "plus" ? 1 : -1)));
        });
    };
    var callBack = function (id) {
        console.log(id);
    };
    return (React.createElement("div", { className: "App" },
        React.createElement(Container, { className: "d-flex justify-content-center" },
            React.createElement(Button, { className: "mx-2", id: "minus-week", onClick: handleChangeDate }, "<<"),
            React.createElement(Button, { className: "mx-2", id: "minus-day", onClick: handleChangeDate }, "<"),
            React.createElement("div", { className: "date-display card" }, scheduleDate.toISOString().split("T")[0]),
            React.createElement(Button, { className: "mx-2", id: "plus-day", onClick: handleChangeDate }, ">"),
            React.createElement(Button, { className: "mx-2", id: "plus-week", onClick: handleChangeDate }, ">>")),
        React.createElement(Scheduler, { scheduleDate: scheduleDate, availabilityInfo: availabilityInfo, schedulerSettings: schedulerSettings, callBack: callBack })));
}
export default App;
