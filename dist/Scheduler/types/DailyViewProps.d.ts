/// <reference types="react" />
import { TimeFramesForGraph } from "./TimeFramesForGraph";
import { Visit } from "./Visit";
import { Availability } from "./Availability";
import { SchedulerSettings } from "./SchedulerSettings";
export interface DailyViewProps {
    timeFramesForGraph: TimeFramesForGraph;
    visits: Visit[];
    scheduleDate: Date;
    availability: Availability;
    schedulerSettings: SchedulerSettings;
    callBack: (id: string, event: React.MouseEvent<HTMLElement>) => void;
}
