import * as types from "../types";

export const formatTime = (decimalTime: number) => {
  const hours = Math.floor(decimalTime);
  const minutes = Math.round((decimalTime - hours) * 60);
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
};

export const calculateHourFromString = (hourString: string) => {
  const hourNumber =
    parseInt(hourString.split(":")[0]) * 60 +
    parseInt(hourString.split(":")[1]);
  return hourNumber / 60;
};

interface TimeFramesForGraph {
  startHour: number;
  endHour: number;
  numberOfRows: number;
}

export const calculateTopPosition = (
  startDate: Date,
  chartRange: TimeFramesForGraph
) => {
  const startHour = startDate.getHours() + startDate.getMinutes() / 60;
  const earliestHour = chartRange.startHour;
  const totalHours = chartRange.endHour - chartRange.startHour;
  const percentage = ((startHour - earliestHour) / totalHours) * 100;
  return `${percentage}%`;
};

export const calculateHeight = (
  startDate: Date,
  endDate: Date,
  chartRange: TimeFramesForGraph
) => {
  const startHour = startDate.getHours() + startDate.getMinutes() / 60;
  const endHour = endDate.getHours() + endDate.getMinutes() / 60;
  const totalHours = chartRange.endHour - chartRange.startHour;
  const percentage = ((endHour - startHour) / totalHours) * 100;
  return `${percentage}%`;
};

export const calculateNumberOfWeek = (date: Date) => {
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  let yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  let weekNo = Math.ceil(
    ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );

  return weekNo;
};

export const calculateArrayOfDatesInCurrentWeek = (date: Date) => {
  let arrayOfDays: string[] = [];
  let currentDayOfWeek = date.getDay();

  if (currentDayOfWeek === 0) {
    currentDayOfWeek = 7;
  }

  for (let i = 0; i < 7; i++) {
    arrayOfDays[i] = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - currentDayOfWeek + i + 2
    )
      .toISOString()
      .split("T")[0];
  }

  return arrayOfDays;
};

export const specifyBorderTopLineStyle = (
  isFullHour: boolean,
  isLabel: boolean,
  schedulerSettings: types.SchedulerSettings
) => {
  return isFullHour
    ? schedulerSettings.graphConfiguration.primaryHorizontalLineWidth +
        " " +
        schedulerSettings.graphConfiguration.lineStyle +
        " " +
        schedulerSettings.colors.lineColor
    : isLabel
    ? ""
    : schedulerSettings.graphConfiguration.secondaryHorizontalLineWidth +
      " " +
      schedulerSettings.graphConfiguration.lineStyle +
      " " +
      schedulerSettings.colors.lineColor;
};

export const specifyBorderLineStyle = (
  schedulerSettings: types.SchedulerSettings
) => {
  return (
    schedulerSettings.graphConfiguration.verticalLineWidth +
    " " +
    schedulerSettings.graphConfiguration.lineStyle +
    " " +
    schedulerSettings.colors.lineColor
  );
};

export const setVisitColor = (
  visit: types.Visit,
  availability: types.Availability,
  scheduleDate: Date,
  schedulerSettings: types.SchedulerSettings
) => {
  const visitStartDate = visit.startDate;
  const businessStartDate = new Date(
    new Date(
      scheduleDate.getFullYear(),
      scheduleDate.getMonth(),
      scheduleDate.getDate(),
      parseInt(availability.openHour.split(":")[0]),
      parseInt(availability.openHour.split(":")[1]),
      0
    ).getTime()
  );
  const visitEndDate = visit.endDate;
  const businessCloseDate = new Date(
    new Date(
      scheduleDate.getFullYear(),
      scheduleDate.getMonth(),
      scheduleDate.getDate(),
      parseInt(availability.closeHour.split(":")[0]),
      parseInt(availability.closeHour.split(":")[1]),
      0
    ).getTime()
  );

  if (
    visitStartDate >= businessStartDate &&
    visitEndDate <= businessCloseDate && availability.isOpen
  ) {
    return schedulerSettings.colors.visit;
  } else return schedulerSettings.colors.visitFailure;
};

export const getDayOfWeek = (dateString: string): number => {
  const date = new Date(dateString);
  return date.getDay();
};