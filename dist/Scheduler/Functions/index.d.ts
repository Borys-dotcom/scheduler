import * as types from "../types";
export declare const formatTime: (decimalTime: number) => string;
export declare const calculateHourFromString: (hourString: string) => number;
interface TimeFramesForGraph {
    startHour: number;
    endHour: number;
    numberOfRows: number;
}
export declare const calculateTopPosition: (startDate: Date, chartRange: TimeFramesForGraph) => string;
export declare const calculateHeight: (startDate: Date, endDate: Date, chartRange: TimeFramesForGraph) => string;
export declare const calculateNumberOfWeek: (date: Date) => number;
export declare const calculateArrayOfDatesInCurrentWeek: (date: Date) => string[];
export declare const specifyBorderTopLineStyle: (isFullHour: boolean, isLabel: boolean, schedulerSettings: types.SchedulerSettings) => string;
export declare const specifyBorderLineStyle: (schedulerSettings: types.SchedulerSettings) => string;
export declare const setVisitColor: (visit: types.Visit, availability: types.Availability, scheduleDate: Date, schedulerSettings: types.SchedulerSettings) => string;
export declare const getDayOfWeek: (dateString: string) => number;
export {};
