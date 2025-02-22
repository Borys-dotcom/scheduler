import React, { useState, useEffect } from "react";
import { formatTime } from "../Functions";
import { graphConfiguration } from "../graphConfiguration";
import { calculateTopPosition, calculateHeight } from "../Functions";
import "./Scheduler.css";

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

interface Availability {
  openHour: string;
  closeHour: string;
  isOpen: boolean;
}

interface DailyViewProps {
  timeFramesForGraph: TimeFramesForGraph;
  visits: Visit[];
  scheduleDate: Date;
  availability: Availability;
}

const DailyView = (props: DailyViewProps) => {

  const [filteredVisits, setFilteredVisits] = useState<Visit[]>();

  const filterVisits = (visits: Visit[]) => {
    let tempFilteredVisits = visits.filter((visit) => {
      const visitDate = visit.startDate.toDateString();
      const scheduleDate = props.scheduleDate.toDateString();
      return visitDate === scheduleDate;
    });
    tempFilteredVisits = tempFilteredVisits.filter((visit) => {
      const timeZoneOffset = props.scheduleDate.getTimezoneOffset();
      const visitStartDate = visit.startDate;
      const businessStartDate = new Date(
        new Date(
          props.scheduleDate.getFullYear(),
          props.scheduleDate.getMonth(),
          props.scheduleDate.getDate(),
          parseInt(props.availability.openHour.split(":")[0]),
          parseInt(props.availability.openHour.split(":")[1]),
          0
        ).getTime() -
          timeZoneOffset * 1000 * 60
      );
      const visitEndDate = visit.endDate;
      const businessCloseDate = new Date(
        new Date(
          props.scheduleDate.getFullYear(),
          props.scheduleDate.getMonth(),
          props.scheduleDate.getDate(),
          parseInt(props.availability.closeHour.split(":")[0]),
          parseInt(props.availability.closeHour.split(":")[1]),
          0
        ).getTime() -
          timeZoneOffset * 1000 * 60
      );

      return (
        visitStartDate >= businessStartDate && visitEndDate <= businessCloseDate
      );
    });
    setFilteredVisits(tempFilteredVisits);
  };

  useEffect(() => {
    filterVisits(props.visits);
  }, [props.scheduleDate, props.availability]);

  return (
    <div>
      {props.availability.isOpen ? (
        <div className="chart-main-container">
          <div className="label-column">
            {Array.from({ length: props.timeFramesForGraph.numberOfRows }).map(
              (_, index) => {
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
                      borderTop: isFullHour ? "2px solid #aaa" : "",
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
              }
            )}
          </div>
          <div className="chart-column">
            {Array.from({ length: props.timeFramesForGraph.numberOfRows }).map(
              (_, index) => {
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
              }
            )}
            {filteredVisits &&
              filteredVisits.map((visit, index) => (
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
      ) : (
        <div>
          <h2>Your business is closed this day</h2>
        </div>
      )}
    </div>
  );
};

export default DailyView;
