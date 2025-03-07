import React, { useState, useEffect } from "react";
import { formatTime } from "../Functions";
import {
  calculateTopPosition,
  calculateHeight,
  specifyBorderTopLineStyle,
  specifyBorderLineStyle,
  setVisitColor,
} from "../Functions";
import "./Scheduler.css";
import * as types from "../types";

const DailyView = (props: types.DailyViewProps) => {
  const [filteredVisits, setFilteredVisits] = useState<types.Visit[]>();

  const filterVisits = (visits: types.Visit[]) => {
    let tempFilteredVisits = visits.filter((visit) => {
      const visitDate = visit.startDate.toDateString();
      const scheduleDate = props.scheduleDate.toDateString();
      return visitDate === scheduleDate;
    });
    setFilteredVisits(tempFilteredVisits);
  };

  const handleClick = (
    id: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    props.callBack(id, event);
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
                    index *
                      props.schedulerSettings.graphConfiguration.timescale) %
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
                      height:
                        props.schedulerSettings.graphConfiguration.cellHeight,
                      width: "100%",
                      fontSize:
                        props.schedulerSettings.graphConfiguration.fontSize,
                    }}
                  >
                    {isFullHour
                      ? formatTime(
                          props.timeFramesForGraph.startHour +
                            index *
                              props.schedulerSettings.graphConfiguration
                                .timescale
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
                    index *
                      props.schedulerSettings.graphConfiguration.timescale) %
                    1 ===
                  0;
                return (
                  <div
                    key={index}
                    className="graph-frame"
                    style={{
                      backgroundColor: isFullHour
                        ? props.schedulerSettings.colors.primaryCell
                        : props.schedulerSettings.colors.secondaryCell,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderLeft: specifyBorderLineStyle(
                        props.schedulerSettings
                      ),
                      borderRight: specifyBorderLineStyle(
                        props.schedulerSettings
                      ),
                      borderTop: specifyBorderTopLineStyle(
                        isFullHour,
                        false,
                        props.schedulerSettings
                      ),
                      height:
                        props.schedulerSettings.graphConfiguration.cellHeight,
                      width: "100%",
                      fontSize:
                        props.schedulerSettings.graphConfiguration.fontSize,
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
                    backgroundColor: setVisitColor(
                      visit,
                      props.availability,
                      props.scheduleDate,
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
      ) : (
        <div>
          <h2>Your business is closed this day</h2>
        </div>
      )}
    </div>
  );
};

export default DailyView;
