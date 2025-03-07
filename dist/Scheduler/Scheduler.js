var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useEffect, useState } from "react";
import "./Scheduler.css";
import schedulerData from "./SchedulerData";
import { Button, Container, Row, Col } from "react-bootstrap";
import { calculateNumberOfWeek } from "./Functions";
import DailyView from "./views/DailyView";
import WeeklyView from "./views/WeeklyView";
import { availabilityInfo } from "../props/availabilityInfo";
var Scheduler = function (props) {
    var _a = useState({
        startHour: 0,
        endHour: 0,
        numberOfRows: 0,
    }), timeFramesForGraph = _a[0], setTimeFramesForGraph = _a[1];
    var _b = useState({
        openHour: "",
        closeHour: "",
        isOpen: false,
    }), availability = _b[0], setAvailability = _b[1];
    var _c = useState("day"), displayMode = _c[0], setDisplayMode = _c[1];
    var calculateGraphTimeFrames = function () {
        var earliestHour = 24 * 60, latestHour = 0, openingTime = 0;
        if (displayMode === "day") {
            earliestHour =
                (parseInt(availability.openHour.split(":")[0]) * 60 +
                    parseInt(availability.openHour.split(":")[1])) /
                    60;
            latestHour =
                (parseInt(availability.closeHour.split(":")[0]) * 60 +
                    parseInt(availability.closeHour.split(":")[1])) /
                    60;
            openingTime = latestHour - earliestHour;
        }
        else if (displayMode === "week") {
            for (var i = 0; i < props.availabilityInfo.length; i++) {
                var openHourInMinutes = parseInt(props.availabilityInfo[i].openHour.split(":")[0]) * 60 +
                    parseInt(props.availabilityInfo[i].openHour.split(":")[1]);
                var closeHourInMinutes = parseInt(props.availabilityInfo[i].closeHour.split(":")[0]) * 60 +
                    parseInt(props.availabilityInfo[i].closeHour.split(":")[1]);
                if (openHourInMinutes < earliestHour) {
                    earliestHour = openHourInMinutes;
                }
                if (closeHourInMinutes > latestHour) {
                    latestHour = closeHourInMinutes;
                }
            }
            earliestHour = earliestHour / 60;
            latestHour = latestHour / 60;
            openingTime = latestHour - earliestHour;
        }
        setTimeFramesForGraph(function (prevTimeFramesForGraph) {
            return __assign(__assign({}, prevTimeFramesForGraph), { startHour: earliestHour, endHour: latestHour, numberOfRows: openingTime / props.schedulerSettings.graphConfiguration.timescale });
        });
    };
    var readAvailabilityData = function () {
        var dayOfWeek = props.scheduleDate.getDay();
        setAvailability(props.availabilityInfo[dayOfWeek]);
    };
    var handleDisplayMode = function (e) {
        var target = e.target;
        setDisplayMode(target.id);
    };
    useEffect(function () {
        calculateGraphTimeFrames();
    }, [availability, displayMode]);
    useEffect(function () {
        readAvailabilityData();
    }, [props.scheduleDate]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Container, { className: "d-flex justify-content-center my-3" },
            React.createElement(Row, null,
                React.createElement(Col, { xl: 3 },
                    React.createElement(Button, { onClick: handleDisplayMode, id: "day", className: "mx-2" }, "Day")),
                React.createElement(Col, { xl: 6 },
                    "Week number: ",
                    calculateNumberOfWeek(props.scheduleDate)),
                React.createElement(Col, { xl: 3 },
                    React.createElement(Button, { onClick: handleDisplayMode, id: "week", className: "mx-2" }, "Week")))),
        displayMode === "day" ? (React.createElement(DailyView, { timeFramesForGraph: timeFramesForGraph, visits: schedulerData.visits, scheduleDate: props.scheduleDate, availability: availability, schedulerSettings: props.schedulerSettings, callBack: props.callBack })) : (React.createElement(WeeklyView, { scheduleDate: props.scheduleDate, timeFramesForGraph: timeFramesForGraph, visits: schedulerData.visits, availabilityInfo: availabilityInfo, schedulerSettings: props.schedulerSettings, callBack: props.callBack }))));
};
export default Scheduler;
