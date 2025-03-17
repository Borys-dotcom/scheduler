import React, { useEffect, useState, MouseEvent } from "react";
import "./Scheduler.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import { calculateNumberOfWeek } from "./Functions";
import DailyView from "./views/DailyView";
import WeeklyView from "./views/WeeklyView";
import * as types from "./types";
// import { availabilityInfo } from "../props/availabilityInfo";


const defaultSchedulerConfiguration: types.SchedulerSettings = {
  graphConfiguration: {
    timescale: 0.5,
    cellHeight: "20px",
    primaryHorizontalLineWidth: "1.5px",
    secondaryHorizontalLineWidth: "0.5px",
    verticalLineWidth: "0.5px",
    lineStyle: "solid",
    fontSize: "12px",
  },
  colors: {
    primaryCell: "rgb(119, 203, 231)",
    secondaryCell: "rgb(174, 235, 255)",
    primaryCellNotAvailable: "#999",
    secondaryCellNotAvailable: "#ddd",
    primaryCellActive: "rgb(105, 223, 105)",
    secondaryCellActive: "rgb(141, 236, 141)",
    primaryCellNotAvailableActive: "rgb(56, 122, 56)",
    secondaryCellNotAvailableActive: "rgb(84, 177, 84)",
    visit: "blue",
    visitFailure: "red",
    lineColor: "#999",
  },
};

const Scheduler: React.FC<types.SchedulerProps> = ({
  scheduleDate,
  availabilityInfo,
  schedulerConfiguration = defaultSchedulerConfiguration,
  schedulerData,
  displayMode,
  eventClick,
}) => {

  const [mergedSchedulerConfiguration, setMergedSchedulerConfiguration] =
    useState<types.SchedulerSettings>(defaultSchedulerConfiguration);

  useEffect(() => {
    const mergeSchedulerConfiguration = () => {
      const mergedGraphConfiguration = {
        ...defaultSchedulerConfiguration.graphConfiguration,
        ...(schedulerConfiguration.graphConfiguration || {}),
      };

      const mergedColors = {
        ...defaultSchedulerConfiguration.colors,
        ...(schedulerConfiguration.colors || {}),
      };

      setMergedSchedulerConfiguration({
        graphConfiguration: mergedGraphConfiguration,
        colors: mergedColors,
      });
    };

    mergeSchedulerConfiguration();
  }, [schedulerConfiguration]);

  const [timeFramesForGraph, setTimeFramesForGraph] =
    useState<types.GraphConfiguration>({
      startHour: 0,
      endHour: 0,
      numberOfRows: 0,
    });

  const [availability, setAvailability] = useState<types.Availability>({
    openHour: "",
    closeHour: "",
    isOpen: false,
  });

  // const [displayMode, setDisplayMode] = useState("day");

  const calculateGraphTimeFrames = () => {
    let earliestHour: number = 24 * 60,
      latestHour: number = 0,
      openingTime: number = 0;

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
    } else if (displayMode === "week") {
      for (let i = 0; i < availabilityInfo.length; i++) {
        let openHourInMinutes =
          parseInt(availabilityInfo[i].openHour.split(":")[0]) * 60 +
          parseInt(availabilityInfo[i].openHour.split(":")[1]);
        let closeHourInMinutes =
          parseInt(availabilityInfo[i].closeHour.split(":")[0]) * 60 +
          parseInt(availabilityInfo[i].closeHour.split(":")[1]);
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

    setTimeFramesForGraph((prevTimeFramesForGraph) => {
      return {
        ...prevTimeFramesForGraph,
        startHour: earliestHour,
        endHour: latestHour,
        numberOfRows:
          openingTime / mergedSchedulerConfiguration.graphConfiguration.timescale,
      };
    });
  };

  const readAvailabilityData = () => {
    const dayOfWeek = scheduleDate.getDay();
    setAvailability(availabilityInfo[dayOfWeek]);
  };

  // const handleDisplayMode = (e: MouseEvent<HTMLButtonElement>) => {
  //   const target = e.target as HTMLButtonElement;
  //   setDisplayMode(displayMode);
  // };

  useEffect(() => {
    calculateGraphTimeFrames();
  }, [availability, displayMode]);

  useEffect(() => {
    readAvailabilityData();
  }, [scheduleDate]);

  return (
    <>
      <Container className="d-flex justify-content-center my-3">
        <Row>
          {/* <Col xl={3}>
            <Button onClick={handleDisplayMode} id="day" className="mx-2">
              Day
            </Button>
          </Col>
          <Col xl={6} className="card"> */}
          Week number: {calculateNumberOfWeek(scheduleDate)}
          {/* </Col>
          <Col xl={3}>
            <Button onClick={handleDisplayMode} id="week" className="mx-2">
              Week
            </Button>
          </Col> */}
        </Row>
      </Container>
      <Container className="scheduler-main-container">
        {displayMode === "day" ? (
          <DailyView
            timeFramesForGraph={timeFramesForGraph}
            visits={schedulerData.visits}
            scheduleDate={scheduleDate}
            availability={availability}
            schedulerSettings={mergedSchedulerConfiguration}
            eventClick={eventClick}
          />
        ) : (
          <WeeklyView
            scheduleDate={scheduleDate}
            timeFramesForGraph={timeFramesForGraph}
            visits={schedulerData.visits}
            availabilityInfo={availabilityInfo}
            schedulerSettings={mergedSchedulerConfiguration}
            eventClick={eventClick}
          />
        )}
      </Container>
    </>
  );
};

export default Scheduler;
