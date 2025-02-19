// eslint-disable-next-line
import React, { useEffect, useState, MouseEvent } from 'react';
import './Scheduler.css';
import schedulerData from './SchedulerData';

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
  // let date = new Date(0);

  // const schedulerData = {
  //   availabilityInfo: [
  //     {
  //       //sunday
  //       isOpen: false,
  //       openHour: date.setHours(9, 30),
  //       closeHour: date.setHours(22, 30),
  //     },
  //     {
  //       //monday
  //       isOpen: true,
  //       openHour: date.setHours(9, 30),
  //       closeHour: date.setHours(22, 0),
  //     },
  //     {
  //       //tuesday
  //       isOpen: true,
  //       openHour: date.setHours(2, 30),
  //       closeHour: date.setHours(19, 30),
  //     },
  //     {
  //       //wednesday
  //       isOpen: true,
  //       openHour: date.setHours(8, 30),
  //       closeHour: date.setHours(19, 30),
  //     },
  //     {
  //       //thurday
  //       isOpen: true,
  //       openHour: date.setHours(9, 30),
  //       closeHour: date.setHours(20, 30),
  //     },
  //     {
  //       //friday
  //       isOpen: true,
  //       openHour: date.setHours(9, 30),
  //       closeHour: date.setHours(20, 30),
  //     },
  //     {
  //       //saturday
  //       isOpen: false,
  //       openHour: date.setHours(9, 30),
  //       closeHour: date.setHours(20, 30),
  //     },
  //   ],
  //   visits: [
  //     {
  //       id: '1',
  //       name: 'Jadzia Nowak',
  //       startDate: new Date('2025-02-18T08:30:00'),
  //       endDate: new Date('2025-02-18T10:30:00'),
  //     },
  //     {
  //       id: '2',
  //       name: 'Ela Malinowska',
  //       startDate: new Date('2025-02-18T12:00:00'),
  //       endDate: new Date('2025-02-18T13:00:00'),
  //     },
  //     {
  //       id: '3',
  //       name: 'Kasia Kowalska',
  //       startDate: new Date('2025-02-18T13:30:00'),
  //       endDate: new Date('2025-02-18T14:45:00'),
  //     },
  //     {
  //       id: '4',
  //       name: 'Iza Jaworska',
  //       startDate: new Date('2025-02-17T13:30:00'),
  //       endDate: new Date('2025-02-17T14:45:00'),
  //     },
  //   ],
  // };

  const [timeFramesForGraph, setTimeFramesForGraph] = useState<number[]>([
    0, 0, 0,
  ]);
  const [graphFrameData, setGraphFrameData] = useState<number[]>([]);
  const [availability, setAvailability] = useState({
    isOpen: false,
    openHour: 0,
    closeHour: 0,
  });

  const handleAvailability = () => {
    const dayOfWeek = props.scheduleDate.getDay();
    setAvailability(schedulerData.availabilityInfo[dayOfWeek]);
  };

  const handleInputData = () => {
    if (!availability.isOpen) {
      setGraphFrameData([0, 0]);
      setTimeFramesForGraph([0, 0, 0]);
      return;
    }

    const earliestHour = availability.openHour / 60 / 60 / 1000;
    const latestHour = availability.closeHour / 60 / 60 / 1000;
    const openingTime = latestHour - earliestHour;

    setGraphFrameData([openingTime * 2, openingTime]);
    setTimeFramesForGraph([earliestHour, latestHour, openingTime]);
  };

  const formatTime = (decimalTime: number) => {
    const hours = Math.floor(decimalTime);
    const minutes = Math.round((decimalTime - hours) * 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const calculateTopPosition = (startDate: Date) => {
    const startHour = startDate.getHours() + startDate.getMinutes() / 60;
    const earliestHour = timeFramesForGraph[0];
    const totalHours = timeFramesForGraph[2];
    const percentage = ((startHour - earliestHour) / totalHours) * 100;
    return `${percentage}%`;
  };

  const calculateHeight = (startDate: Date, endDate: Date) => {
    const startHour = startDate.getHours() + startDate.getMinutes() / 60;
    const endHour = endDate.getHours() + endDate.getMinutes() / 60;
    const totalHours = timeFramesForGraph[2];
    const percentage = ((endHour - startHour) / totalHours) * 100;
    return `${percentage}%`;
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

  useEffect(() => {
    handleInputData();
  }, [availability]);

  useEffect(() => {
    handleAvailability();
  }, [props.scheduleDate]);

  return (
    <>
      {availability.isOpen ? (
        <div className="chart-main-container">
          {/* <div className="chart-main-container"> */}
          <div className="label-column">
            {Array.from({ length: graphFrameData[0] }).map((_, index) => {
              const isFullHour =
                (timeFramesForGraph[0] + index * 0.5) % 1 === 0;
              return (
                <div
                  key={index}
                  className="label-frame"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderBottom: '1px solid #aaa',
                    borderTop: isFullHour ? '2px solid #aaa' : undefined,
                    height: '15px',
                    width: '100%',
                    fontSize: '12px',
                  }}
                >
                  {isFullHour
                    ? formatTime(timeFramesForGraph[0] + index * 0.5)
                    : ''}
                </div>
              );
            })}
          </div>
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
                      ? 'rgb(119, 203, 231)'
                      : 'rgb(174, 235, 255)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottom: '1px solid #aaa',
                    borderLeft: '1px solid #aaa',
                    borderRight: '1px solid #aaa',
                    borderTop: isFullHour ? '2px solid #aaa' : '1px solid #aaa',
                    height: '15px',
                    width: '100%',
                    fontSize: '12px',
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
                  position: 'absolute',
                  top: calculateTopPosition(visit.startDate),
                  height: calculateHeight(visit.startDate, visit.endDate),
                  color: 'white',
                  backgroundColor: 'rgb(79, 79, 232)',
                  border: '1px solid black',
                  borderRadius: '3px',
                  width: '98%',
                  boxSizing: 'border-box',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
                onClick={handleVisitDetails}
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
    </>
  );
};

export default Scheduler;
