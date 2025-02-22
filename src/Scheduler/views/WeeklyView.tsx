import React, { useEffect, useState } from "react";
import {
  calculateArrayOfDatesInCurrentWeek,
  calculateNumberOfWeek,
} from "../Functions";
import "./Scheduler.css";
import { graphConfiguration } from "../graphConfiguration";
import {
  formatTime,
  calculateTopPosition,
  calculateHeight,
  calculateHourFromString,
} from "../Functions";
import schedulerData from "../SchedulerData";

interface TimeFramesForGraph {
  startHour: number;
  endHour: number;
  numberOfRows: number;
}

interface Visit {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

interface WeeklyViewProps {
  scheduleDate: Date;
  timeFramesForGraph: TimeFramesForGraph;
  visits: Visit[];
}

const WeeklyView = (props: WeeklyViewProps) => {
  const [arrayOfDaysForWeekMode, setArrayOfDaysForWeekMode] = useState<
    string[]
  >([]);

  const setCellColor = (
    isFullHour: boolean,
    scheduleDate: Date,
    checkedDay: string,
    index: number
  ) => {
    let scheduleDateString = scheduleDate.toISOString().split("T")[0];
    let dayOfWeek = new Date(checkedDay).getDay();
    let currentDayOpenHours = { ...schedulerData.availabilityInfo[dayOfWeek] };
    let currentHour =
      props.timeFramesForGraph.startHour + index * graphConfiguration.timeScale;
    // const closeHour = currentOpenHours.openHour.split(":")

    console.log("bieżąca godzina: ", currentHour);
    console.log(
      "godzina otwarcia :",
      calculateHourFromString(currentDayOpenHours.openHour)
    );

    if (isFullHour) {
      if (
        currentHour >= calculateHourFromString(currentDayOpenHours.openHour) &&
        currentHour < calculateHourFromString(currentDayOpenHours.closeHour)
      ) {
        if (scheduleDateString === checkedDay) {
          return "rgb(105, 223, 105)";
        } else return "rgb(119, 203, 231)";
      } else {
        if (scheduleDateString === checkedDay) {
          return "rgb(84, 177, 84)";
        } else return "#999";
      }
    } else {
      if (
        currentHour >= calculateHourFromString(currentDayOpenHours.openHour) &&
        currentHour < calculateHourFromString(currentDayOpenHours.closeHour)
      ) {
        if (scheduleDateString === checkedDay) {
          return "rgb(141, 236, 141)";
        } else return "rgb(174, 235, 255)";
      } else {
        if (scheduleDateString === checkedDay) {
          return "rgb(56, 122, 56)";
        } else return "#ddd";
      }
    }
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
                index * graphConfiguration.timeScale) %
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
                  borderTop: isFullHour ? "2px solid #aaa" : undefined,
                  height: "15px",
                  width: "100%",
                  fontSize: "12px",
                }}
              >
                {isFullHour
                  ? formatTime(
                      props.timeFramesForGraph.startHour +
                        index * graphConfiguration.timeScale
                    )
                  : ""}
              </div>
            );
          })}
        </div>
        <>
          {arrayOfDaysForWeekMode.map((day, index) => {
            return (
              <div className="chart-column" key={index}>
                <div className="day-label" style={{ height: "30px" }}>
                  {day}
                </div>
                <div className="chart-body">
                  {Array.from({
                    length: props.timeFramesForGraph.numberOfRows,
                  }).map((_, index) => {
                    const isFullHour =
                      (props.timeFramesForGraph.startHour +
                        index * graphConfiguration.timeScale) %
                        1 ===
                      0;
                    return (
                      <div
                        key={index}
                        className="graph-frame"
                        style={{
                          backgroundColor: setCellColor(
                            isFullHour,
                            props.scheduleDate,
                            day,
                            index
                          ),
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderLeft: "1px solid #aaa",
                          borderRight: "1px solid #aaa",
                          borderTop: isFullHour
                            ? "2px solid #aaa"
                            : "1px solid #aaa",
                          height: "15px",
                          width: "100%",
                          fontSize: "12px",
                        }}
                      ></div>
                    );
                  })}
                  {props.visits
                    .filter((visit) => {
                      let visitDate = visit.startDate
                        .toISOString()
                        .split("T")[0];
                      return visitDate === day;
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
                          backgroundColor: "rgb(79, 79, 232)",
                          border: "1px solid black",
                          borderRadius: "3px",
                          width: "98%",
                          boxSizing: "border-box",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                        // onClick={handleVisitDetails}
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
