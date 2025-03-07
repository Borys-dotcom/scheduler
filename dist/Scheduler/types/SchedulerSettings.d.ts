export interface SchedulerSettings {
    graphConfiguration: {
        timescale: number;
        cellHeight: string;
        primaryHorizontalLineWidth: string;
        secondaryHorizontalLineWidth: string;
        verticalLineWidth: string;
        lineStyle: string;
        fontSize: string;
    };
    colors: {
        primaryCell: string;
        secondaryCell: string;
        primaryCellNotAvailable: string;
        secondaryCellNotAvailable: string;
        primaryCellActive: string;
        secondaryCellActive: string;
        primaryCellNotAvailableActive: string;
        secondaryCellNotAvailableActive: string;
        visit: string;
        visitFailure: string;
        lineColor: string;
    };
}
