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
import DailyView from "./views/DailyView";
import WeeklyView from "./views/WeeklyView";
import { graphConfiguration } from "./graphConfiguration";

interface SchedulerProps {
  scheduleDate: Date;
}

interface GraphConfiguration {
  startHour: number;
  endHour: number;
  numberOfRows: number;
}

interface Availability {
  openHour: string;
  closeHour: string;
  isOpen: boolean;
}

const Scheduler = (props: SchedulerProps) => {
  const [timeFramesForGraph, setTimeFramesForGraph] =
    useState<GraphConfiguration>({
      startHour: 0,
      endHour: 0,
      numberOfRows: 0,
    });

  const [availability, setAvailability] = useState<Availability>({
    openHour: "",
    closeHour: "",
    isOpen: false,
  });

  const [displayMode, setDisplayMode] = useState("day");

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
      openingTime = latestHour - earliestHour;
    }

    setTimeFramesForGraph((prevTimeFramesForGraph) => {
      return {
        ...prevTimeFramesForGraph,
        startHour: earliestHour,
        endHour: latestHour,
        numberOfRows: openingTime / graphConfiguration.timeScale,
      };
    });
  };

  const readAvailabilityData = () => {
    const dayOfWeek = props.scheduleDate.getDay();
    setAvailability(schedulerData.availabilityInfo[dayOfWeek]);
  };

  const handleDisplayMode = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setDisplayMode(target.id);
  };

  useEffect(() => {
    calculateGraphTimeFrames();
  }, [availability, displayMode]);

  useEffect(() => {
    readAvailabilityData();
  }, [props.scheduleDate]);

  return (
    <>
      <Container className="d-flex justify-content-center my-3">
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
      {displayMode === "day" ? (
        <DailyView
          timeFramesForGraph={timeFramesForGraph}
          visits={schedulerData.visits}
          scheduleDate={props.scheduleDate}
          availability={availability}
        />
      ) : (
        <WeeklyView
          scheduleDate={props.scheduleDate}
          timeFramesForGraph={timeFramesForGraph}
          visits={schedulerData.visits}
        />
      )}
    </>
  );
};

export default Scheduler;
