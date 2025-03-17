interface SchedulerEvent {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
}

export interface SchedulerData {
    visits: SchedulerEvent[];
}

