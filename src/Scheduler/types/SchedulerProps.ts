import { Availability } from "./Availability";
import { SchedulerData } from "./SchedulerData";
import { SchedulerConfiguration } from "./SchedulerConfiguration";

export interface SchedulerProps {
  scheduleDate: Date;
  availabilityInfo: Availability[];
  schedulerConfiguration?: SchedulerConfiguration;
  schedulerData: SchedulerData;
  displayMode: string;
  eventClick: (id: string, event: React.MouseEvent<HTMLElement>) => void; 
}
