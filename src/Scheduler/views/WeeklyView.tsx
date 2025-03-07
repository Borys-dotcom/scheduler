import React, { useEffect, useState } from "react";
import {
  calculateArrayOfDatesInCurrentWeek,
  specifyBorderLineStyle,
  specifyBorderTopLineStyle,
  setVisitColor,
  getDayOfWeek,
} from "../Functions";
import "./Scheduler.css";
import {
  formatTime,
  calculateTopPosition,
  calculateHeight,
  calculateHourFromString,
} from "../Functions";
import schedulerData from "../SchedulerData";
import * as types from "../types";
import { availabilityInfo } from "../../props/availabilityInfo";

const WeeklyView = (props: types.WeeklyViewProps) => {
  const [arrayOfDaysForWeekMode, setArrayOfDaysForWeekMode] = useState<
    string[]
  >([]);

  const setCellColor = (
    isFullHour: boolean,
    scheduleDate: Date,
    checkedDay: string,
    index: number,
    schedulerSettings: types.SchedulerSettings
  ) => {
    let scheduleDateString = scheduleDate.toISOString().split("T")[0];
    let dayOfWeek = new Date(checkedDay).getDay();
    let currentDayOpenHours = { ...props.availabilityInfo[dayOfWeek] };
    let currentHour =
      props.timeFramesForGraph.startHour +
      index * props.schedulerSettings.graphConfiguration.timescale;

    if (isFullHour) {
      if (
        currentHour >= calculateHourFromString(currentDayOpenHours.openHour) &&
        currentHour < calculateHourFromString(currentDayOpenHours.closeHour) &&
        currentDayOpenHours.isOpen
      ) {
        if (scheduleDateString === checkedDay) {
          return schedulerSettings.colors.primaryCellActive;
        } else return schedulerSettings.colors.primaryCell;
      } else {
        if (scheduleDateString === checkedDay) {
          return schedulerSettings.colors.primaryCellNotAvailableActive;
        } else return schedulerSettings.colors.primaryCellNotAvailable;
      }
    } else {
      if (
        currentHour >= calculateHourFromString(currentDayOpenHours.openHour) &&
        currentHour < calculateHourFromString(currentDayOpenHours.closeHour) &&
        currentDayOpenHours.isOpen
      ) {
        if (scheduleDateString === checkedDay) {
          return schedulerSettings.colors.secondaryCellActive;
        } else return schedulerSettings.colors.secondaryCell;
      } else {
        if (scheduleDateString === checkedDay) {
          return schedulerSettings.colors.secondaryCellNotAvailableActive;
        } else return schedulerSettings.colors.secondaryCellNotAvailable;
      }
    }
  };

  const judgeIfVisitShouldBeDisplayed = (visit: types.Visit, day: string) => {
    let visitDate = visit.startDate.toISOString().split("T")[0];
    return visitDate === day;
    // && businessOpen &&
    // visitStartHour >= businessOpenHour &&
    // visitEndHour < businessCloseHour
  };

  const handleClick = (id: string, event: React.MouseEvent<HTMLDivElement>) => {
    props.callBack(id, event);
  };

  useEffect(() => {
    setArrayOfDaysForWeekMode(
      calculateArrayOfDatesInCurrentWeek(props.scheduleDate)
    );
  }, [props.scheduleDate]);

  return (
    <>
      <div className="chart-main-container">
        <div className="label-column">
          <div className="placeHolder" style={{ height: "30px" }}></div>
          {Array.from({
            length: props.timeFramesForGraph.numberOfRows,
          }).map((_, index) => {
            const isFullHour =
              (props.timeFramesForGraph.startHour +
                index * props.schedulerSettings.graphConfiguration.timescale) %
                1 ===
              0;
            return (
              <div
                key={index}
                className="label-frame"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTop: specifyBorderTopLineStyle(
                    isFullHour,
                    true,
                    props.schedulerSettings
                  ),
                  height: props.schedulerSettings.graphConfiguration.cellHeight,
                  width: "100%",
                  fontSize: props.schedulerSettings.graphConfiguration.fontSize,
                }}
              >
                {isFullHour
                  ? formatTime(
                      props.timeFramesForGraph.startHour +
                        index *
                          props.schedulerSettings.graphConfiguration.timescale
                    )
                  : ""}
              </div>
            );
          })}
        </div>
        <>
          {arrayOfDaysForWeekMode.map((day, index_col) => {
            return (
              <div className="chart-column" key={index_col}>
                <div className="day-label" style={{ height: "30px" }}>
                  {day}
                </div>
                <div className="chart-body">
                  {Array.from({
                    length: props.timeFramesForGraph.numberOfRows,
                  }).map((_, index_row) => {
                    const isFullHour =
                      (props.timeFramesForGraph.startHour +
                        index_row *
                          props.schedulerSettings.graphConfiguration
                            .timescale) %
                        1 ===
                      0;
                    return (
                      <div
                        key={index_row}
                        className="graph-frame"
                        style={{
                          backgroundColor: setCellColor(
                            isFullHour,
                            props.scheduleDate,
                            day,
                            index_row,
                            props.schedulerSettings
                          ),
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderLeft: specifyBorderLineStyle(
                            props.schedulerSettings
                          ),
                          borderRight:
                            index_col === 6
                              ? specifyBorderLineStyle(props.schedulerSettings)
                              : "",
                          borderTop: specifyBorderTopLineStyle(
                            isFullHour,
                            false,
                            props.schedulerSettings
                          ),
                          height:
                            props.schedulerSettings.graphConfiguration
                              .cellHeight,
                          width: "100%",
                          fontSize:
                            props.schedulerSettings.graphConfiguration.fontSize,
                        }}
                      ></div>
                    );
                  })}
                  {props.visits
                    .filter((visit) => {
                      return judgeIfVisitShouldBeDisplayed(visit, day);
                    })
                    .map((visit, index) => (
                      <div
                        key={index}
                        id={visit.id}
                        className="graph-visit"
                        style={{
                          position: "absolute",
                          top: calculateTopPosition(
                            visit.startDate,
                            props.timeFramesForGraph
                          ),
                          height: calculateHeight(
                            visit.startDate,
                            visit.endDate,
                            props.timeFramesForGraph
                          ),
                          color: "white",
                          backgroundColor: setVisitColor(
                            visit,
                            props.availabilityInfo[getDayOfWeek(day)],
                            new Date(day),
                            props.schedulerSettings
                          ),
                          border: "1px solid black",
                          borderRadius: "3px",
                          width: "98%",
                          boxSizing: "border-box",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                        onClick={(event) => handleClick(visit.id, event)}
                      >
                        {visit.name}
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </>
      </div>
    </>
  );
};

export default WeeklyView;
