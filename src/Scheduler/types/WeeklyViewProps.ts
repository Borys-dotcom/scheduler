import { Availability } from "./Availability";
import { SchedulerSettings } from "./SchedulerSettings";
import { TimeFramesForGraph } from "./TimeFramesForGraph";
import { Visit } from "./Visit";

export interface WeeklyViewProps {
  scheduleDate: Date;
  timeFramesForGraph: TimeFramesForGraph;
  visits: Visit[];
  schedulerSettings: SchedulerSettings;
  availabilityInfo: Availability[];
  eventClick: (id: string, event: React.MouseEvent<HTMLElement>) => void;
}
