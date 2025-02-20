// eslint-disable-next-line
import React, { useEffect, useState, MouseEvent } from "react";
import "./Scheduler.css";
import schedulerData from "./SchedulerData";
import { Button, Container, Row, Col } from "react-bootstrap";
import {
  formatTime,
  calculateTopPosition,
  calculateHeight,
  calculateNumberOfWeek,
  calculateArrayOfDatesInCurrentWeek,
} from "./Functions";

// interface VisitProps {
//   id: String;
//   name: String;
//   startDate: Date;
//   endDate: Date;
// }

// interface Availability {
//   isOpen: boolean;
//   openHour: Date;
//   closeHour: Date;
// }

// interface SchedulerProps {
//   availabilityInfo: Availability[];
//   visits: VisitProps[];
// }

interface SchedulerProps {
  scheduleDate: Date;
}

const Scheduler = (props: SchedulerProps) => {
  const [timeFramesForGraph, setTimeFramesForGraph] = useState<number[]>([
    0, 0, 0,
  ]);
  const [timeFramesForWeeklyGraph, setTimeFramesForWeeklyGraph] = useState<
    number[]
  >([0, 0, 0]);
  const [graphFrameData, setGraphFrameData] = useState<number[]>([]);
  const [availability, setAvailability] = useState({
    isOpen: false,
    openHour: "",
    closeHour: "",
  });
  const [displayMode, setDisplayMode] = useState("day");
  const [arraysOfDaysForWeekMode, setArraysOfDaysForWeekMode] = useState<
    String[]
  >([]);

  const handleAvailability = () => {
    const dayOfWeek = props.scheduleDate.getDay();
    setAvailability(schedulerData.availabilityInfo[dayOfWeek]);
  };

  const handleInputData = () => {
    setGraphFrameData([0, 0]);
    setTimeFramesForGraph([0, 0, 0]);

    const earliestHour =
      (parseInt(availability.openHour.split(":")[0]) * 60 +
        parseInt(availability.openHour.split(":")[1])) /
      60;
    const latestHour =
      (parseInt(availability.closeHour.split(":")[0]) * 60 +
        parseInt(availability.closeHour.split(":")[1])) /
      60;
    const openingTime = latestHour - earliestHour;

    setGraphFrameData([openingTime * 2, openingTime]);
    setTimeFramesForGraph([earliestHour, latestHour, openingTime]);
  };

  const handleVisitDetails = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    console.log(target.id);
  };

  const filteredVisits = schedulerData.visits.filter((visit) => {
    const visitDate = visit.startDate.toDateString();
    const scheduleDate = props.scheduleDate.toDateString();
    return visitDate === scheduleDate;
  });

  const handleDisplayMode = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setDisplayMode(target.id);
  };

  // Calculate earliest and latest opening hours in week
  const calculateWeekTimeFrames = () => {
    let earliestHour = 24 * 60;
    let latestHour = 0;
    let openTime = 0;
    for (let i = 0; i < schedulerData.availabilityInfo.length; i++) {
      let openHourInMinutes =
        parseInt(schedulerData.availabilityInfo[i].openHour.split(":")[0]) *
          60 +
        parseInt(schedulerData.availabilityInfo[i].openHour.split(":")[1]);
      let closeHourInMinutes =
        parseInt(schedulerData.availabilityInfo[i].closeHour.split(":")[0]) *
          60 +
        parseInt(schedulerData.availabilityInfo[i].closeHour.split(":")[1]);
      if (openHourInMinutes < earliestHour) {
        earliestHour = openHourInMinutes;
      }
      if (closeHourInMinutes > latestHour) {
        latestHour = closeHourInMinutes;
      }
    }
    earliestHour = earliestHour / 60;
    latestHour = latestHour / 60;
    openTime = latestHour - earliestHour;
    setTimeFramesForWeeklyGraph([earliestHour, latestHour, openTime]);
  };

  useEffect(() => {
    handleInputData();
  }, [availability]);

  useEffect(() => {
    handleAvailability();
    setArraysOfDaysForWeekMode(
      calculateArrayOfDatesInCurrentWeek(
        props.scheduleDate,
        calculateNumberOfWeek(props.scheduleDate)
      )
    );
  }, [props.scheduleDate]);

  useEffect(() => {
    calculateWeekTimeFrames();
  }, [displayMode]);

  console.log(props.scheduleDate)

  return (
    <>
      <Container className="d-flex justify-content-center mt-3">
        <Row>
          <Col xl={3}>
            <Button onClick={handleDisplayMode} id="day" className="mx-2">
              Day
            </Button>
          </Col>
          <Col xl={6}>
            Week number: {calculateNumberOfWeek(props.scheduleDate)}
          </Col>
          <Col xl={3}>
            <Button onClick={handleDisplayMode} id="week" className="mx-2">
              Week
            </Button>
          </Col>
        </Row>
      </Container>
      {availability.isOpen || displayMode === "week" ? (
        <div className="chart-main-container">
          <div className="label-column">
            {displayMode === "week" ? (
              <div className="placeHolder" style={{ height: "30px" }}></div>
            ) : (
              <></>
            )}
            {Array.from({
              length:
                displayMode === "day"
                  ? graphFrameData[0]
                  : timeFramesForWeeklyGraph[2] * 2,
            }).map((_, index) => {
              const isFullHour =
                ((displayMode === "day"
                  ? timeFramesForGraph[0]
                  : timeFramesForWeeklyGraph[0]) +
                  index * 0.5) %
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
                    // borderBottom: "1px solid #aaa",
                    borderTop: isFullHour ? "2px solid #aaa" : undefined,
                    height: "15px",
                    width: "100%",
                    fontSize: "12px",
                  }}
                >
                  {isFullHour
                    ? formatTime(
                        (displayMode === "day"
                          ? timeFramesForGraph[0]
                          : timeFramesForWeeklyGraph[0]) +
                          index * 0.5
                      )
                    : ""}
                </div>
              );
            })}
          </div>
          {displayMode === "day" ? (
            <>
              <div className="chart-column">
                {Array.from({ length: graphFrameData[0] }).map((_, index) => {
                  const isFullHour =
                    (timeFramesForGraph[0] + index * 0.5) % 1 === 0;
                  return (
                    <div
                      key={index}
                      className="graph-frame"
                      style={{
                        backgroundColor: isFullHour
                          ? "rgb(119, 203, 231)"
                          : "rgb(174, 235, 255)",
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
                {filteredVisits.map((visit, index) => (
                  <div
                    key={index}
                    id={visit.id}
                    className="graph-visit"
                    style={{
                      position: "absolute",
                      top: calculateTopPosition(
                        visit.startDate,
                        timeFramesForGraph
                      ),
                      height: calculateHeight(
                        visit.startDate,
                        visit.endDate,
                        timeFramesForGraph
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
                    onClick={handleVisitDetails}
                  >
                    {visit.name}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {arraysOfDaysForWeekMode.map((day) => {
                return (
                  <div className="chart-column">
                    <div className="day-label" style={{height: "30px"}}>{day}</div>
                    {Array.from({
                      length: timeFramesForWeeklyGraph[2] * 2,
                    }).map((_, index) => {
                      const isFullHour =
                        (timeFramesForWeeklyGraph[0] + index * 0.5) % 1 === 0;
                      return (
                        <div
                          key={index}
                          className="graph-frame"
                          style={{
                            backgroundColor: isFullHour
                              ? day===props.scheduleDate.toISOString().split("T")[0]?"rgb(105, 223, 105)":"rgb(119, 203, 231)"
                              : day===props.scheduleDate.toISOString().split("T")[0]?"rgb(141, 236, 141)":"rgb(174, 235, 255)",
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
                  </div>
                );
              })}
            </>
          )}
        </div>
      ) : (
        <div>
          <h2>Your business is closed this day</h2>
        </div>
      )}
    </>
  );
};

export default Scheduler;
