import React, { useState, useEffect } from "react";
import { formatTime } from "../Functions";
import { calculateTopPosition, calculateHeight, specifyBorderTopLineStyle, specifyBorderLineStyle, setVisitColor, } from "../Functions";
import "./Scheduler.css";
var DailyView = function (props) {
    var _a = useState(), filteredVisits = _a[0], setFilteredVisits = _a[1];
    var filterVisits = function (visits) {
        var tempFilteredVisits = visits.filter(function (visit) {
            var visitDate = visit.startDate.toDateString();
            var scheduleDate = props.scheduleDate.toDateString();
            return visitDate === scheduleDate;
        });
        setFilteredVisits(tempFilteredVisits);
    };
    var handleClick = function (id, event) {
        props.callBack(id, event);
    };
    useEffect(function () {
        filterVisits(props.visits);
    }, [props.scheduleDate, props.availability]);
    return (React.createElement("div", null, props.availability.isOpen ? (React.createElement("div", { className: "chart-main-container" },
        React.createElement("div", { className: "label-column" }, Array.from({ length: props.timeFramesForGraph.numberOfRows }).map(function (_, index) {
            var isFullHour = (props.timeFramesForGraph.startHour +
                index *
                    props.schedulerSettings.graphConfiguration.timescale) %
                1 ===
                0;
            return (React.createElement("div", { key: index, className: "label-frame", style: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderTop: specifyBorderTopLineStyle(isFullHour, true, props.schedulerSettings),
                    height: props.schedulerSettings.graphConfiguration.cellHeight,
                    width: "100%",
                    fontSize: props.schedulerSettings.graphConfiguration.fontSize,
                } }, isFullHour
                ? formatTime(props.timeFramesForGraph.startHour +
                    index *
                        props.schedulerSettings.graphConfiguration
                            .timescale)
                : ""));
        })),
        React.createElement("div", { className: "chart-column" },
            Array.from({ length: props.timeFramesForGraph.numberOfRows }).map(function (_, index) {
                var isFullHour = (props.timeFramesForGraph.startHour +
                    index *
                        props.schedulerSettings.graphConfiguration.timescale) %
                    1 ===
                    0;
                return (React.createElement("div", { key: index, className: "graph-frame", style: {
                        backgroundColor: isFullHour
                            ? props.schedulerSettings.colors.primaryCell
                            : props.schedulerSettings.colors.secondaryCell,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderLeft: specifyBorderLineStyle(props.schedulerSettings),
                        borderRight: specifyBorderLineStyle(props.schedulerSettings),
                        borderTop: specifyBorderTopLineStyle(isFullHour, false, props.schedulerSettings),
                        height: props.schedulerSettings.graphConfiguration.cellHeight,
                        width: "100%",
                        fontSize: props.schedulerSettings.graphConfiguration.fontSize,
                    } }));
            }),
            filteredVisits &&
                filteredVisits.map(function (visit, index) { return (React.createElement("div", { key: index, id: visit.id, className: "graph-visit", style: {
                        position: "absolute",
                        top: calculateTopPosition(visit.startDate, props.timeFramesForGraph),
                        height: calculateHeight(visit.startDate, visit.endDate, props.timeFramesForGraph),
                        color: "white",
                        backgroundColor: setVisitColor(visit, props.availability, props.scheduleDate, props.schedulerSettings),
                        border: "1px solid black",
                        borderRadius: "3px",
                        width: "98%",
                        boxSizing: "border-box",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }, onClick: function (event) { return handleClick(visit.id, event); } }, visit.name)); })))) : (React.createElement("div", null,
        React.createElement("h2", null, "Your business is closed this day")))));
};
export default DailyView;
