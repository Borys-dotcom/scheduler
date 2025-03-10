interface SchedulerEvent {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
}

interface SchedulerData {
    visits: SchedulerEvent[];
}