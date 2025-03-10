import { Availability } from "./Availability";
import { SchedulerSettings } from "./SchedulerSettings";

export interface SchedulerProps {
  scheduleDate: Date;
  availabilityInfo: Availability[];
  schedulerSettings: SchedulerSettings;
  schedulerData: SchedulerData;
  displayMode: string;
  callBack: (id: string, event: React.MouseEvent<HTMLElement>) => void; 
}
