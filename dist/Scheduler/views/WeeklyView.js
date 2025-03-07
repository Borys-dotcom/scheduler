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
import { calculateArrayOfDatesInCurrentWeek, specifyBorderLineStyle, specifyBorderTopLineStyle, setVisitColor, getDayOfWeek, } from "../Functions";
import "./Scheduler.css";
import { formatTime, calculateTopPosition, calculateHeight, calculateHourFromString, } from "../Functions";
var WeeklyView = function (props) {
    var _a = useState([]), arrayOfDaysForWeekMode = _a[0], setArrayOfDaysForWeekMode = _a[1];
    var setCellColor = function (isFullHour, scheduleDate, checkedDay, index, schedulerSettings) {
        var scheduleDateString = scheduleDate.toISOString().split("T")[0];
        var dayOfWeek = new Date(checkedDay).getDay();
        var currentDayOpenHours = __assign({}, props.availabilityInfo[dayOfWeek]);
        var currentHour = props.timeFramesForGraph.startHour +
            index * props.schedulerSettings.graphConfiguration.timescale;
        if (isFullHour) {
            if (currentHour >= calculateHourFromString(currentDayOpenHours.openHour) &&
                currentHour < calculateHourFromString(currentDayOpenHours.closeHour) &&
                currentDayOpenHours.isOpen) {
                if (scheduleDateString === checkedDay) {
                    return schedulerSettings.colors.primaryCellActive;
                }
                else
                    return schedulerSettings.colors.primaryCell;
            }
            else {
                if (scheduleDateString === checkedDay) {
                    return schedulerSettings.colors.primaryCellNotAvailableActive;
                }
                else
                    return schedulerSettings.colors.primaryCellNotAvailable;
            }
        }
        else {
            if (currentHour >= calculateHourFromString(currentDayOpenHours.openHour) &&
                currentHour < calculateHourFromString(currentDayOpenHours.closeHour) &&
                currentDayOpenHours.isOpen) {
                if (scheduleDateString === checkedDay) {
                    return schedulerSettings.colors.secondaryCellActive;
                }
                else
                    return schedulerSettings.colors.secondaryCell;
            }
            else {
                if (scheduleDateString === checkedDay) {
                    return schedulerSettings.colors.secondaryCellNotAvailableActive;
                }
                else
                    return schedulerSettings.colors.secondaryCellNotAvailable;
            }
        }
    };
    var judgeIfVisitShouldBeDisplayed = function (visit, day) {
        var visitDate = visit.startDate.toISOString().split("T")[0];
        return visitDate === day;
        // && businessOpen &&
        // visitStartHour >= businessOpenHour &&
        // visitEndHour < businessCloseHour
    };
    var handleClick = function (id, event) {
        props.callBack(id, event);
    };
    useEffect(function () {
        setArrayOfDaysForWeekMode(calculateArrayOfDatesInCurrentWeek(props.scheduleDate));
    }, [props.scheduleDate]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "chart-main-container" },
            React.createElement("div", { className: "label-column" },
                React.createElement("div", { className: "placeHolder", style: { height: "30px" } }),
                Array.from({
                    length: props.timeFramesForGraph.numberOfRows,
                }).map(function (_, index) {
                    var isFullHour = (props.timeFramesForGraph.startHour +
                        index * props.schedulerSettings.graphConfiguration.timescale) %
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
                                props.schedulerSettings.graphConfiguration.timescale)
                        : ""));
                })),
            React.createElement(React.Fragment, null, arrayOfDaysForWeekMode.map(function (day, index_col) {
                return (React.createElement("div", { className: "chart-column", key: index_col },
                    React.createElement("div", { className: "day-label", style: { height: "30px" } }, day),
                    React.createElement("div", { className: "chart-body" },
                        Array.from({
                            length: props.timeFramesForGraph.numberOfRows,
                        }).map(function (_, index_row) {
                            var isFullHour = (props.timeFramesForGraph.startHour +
                                index_row *
                                    props.schedulerSettings.graphConfiguration
                                        .timescale) %
                                1 ===
                                0;
                            return (React.createElement("div", { key: index_row, className: "graph-frame", style: {
                                    backgroundColor: setCellColor(isFullHour, props.scheduleDate, day, index_row, props.schedulerSettings),
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderLeft: specifyBorderLineStyle(props.schedulerSettings),
                                    borderRight: index_col === 6
                                        ? specifyBorderLineStyle(props.schedulerSettings)
                                        : "",
                                    borderTop: specifyBorderTopLineStyle(isFullHour, false, props.schedulerSettings),
                                    height: props.schedulerSettings.graphConfiguration
                                        .cellHeight,
                                    width: "100%",
                                    fontSize: props.schedulerSettings.graphConfiguration.fontSize,
                                } }));
                        }),
                        props.visits
                            .filter(function (visit) {
                            return judgeIfVisitShouldBeDisplayed(visit, day);
                        })
                            .map(function (visit, index) { return (React.createElement("div", { key: index, id: visit.id, className: "graph-visit", style: {
                                position: "absolute",
                                top: calculateTopPosition(visit.startDate, props.timeFramesForGraph),
                                height: calculateHeight(visit.startDate, visit.endDate, props.timeFramesForGraph),
                                color: "white",
                                backgroundColor: setVisitColor(visit, props.availabilityInfo[getDayOfWeek(day)], new Date(day), props.schedulerSettings),
                                border: "1px solid black",
                                borderRadius: "3px",
                                width: "98%",
                                boxSizing: "border-box",
                                left: "50%",
                                transform: "translateX(-50%)",
                            }, onClick: function (event) { return handleClick(visit.id, event); } }, visit.name)); }))));
            })))));
};
export default WeeklyView;
