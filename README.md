# Scheduler Component

A flexible and customizable scheduler component for displaying events in **daily** or **weekly** view modes. Perfect for applications that require event management, calendar views, or scheduling functionalities.

## Features

- **Daily and Weekly Views**: Easily switch between daily and weekly event displays.
- **Lightweight**: Minimal dependencies and optimized for performance.
- **Customizable Appearance**: Easily modify the look and feel of the scheduler through configuration options, including colors, line styles, and font sizes.
- **Timeframe Configuration**: Define the start and end times for the scheduler, tailoring it to specific business hours or event durations.
- **Availability Indicators**: Clearly display available and unavailable time slots, making it easy to identify open appointment times.
- **Data-Driven**: Populate the scheduler with dynamic data, allowing for real-time updates and integration with external data sources.
- **Typescript Support**: Written in Typescript, providing type safety and improved code maintainability.
- **Week number**: Display current week number.

## Installation

You can install the package via npm:

```bash
npm install day-week-simple-schedule
```
## Usage

Here's a basic example of how to use the Scheduler component in your React application:

```jsx
import React, { useState } from 'react';
import Scheduler from 'day-week-simple-schedule';
import { availabilityInfo } from './props/availabilityInfo'; // Import your availability data
import schedulerData from './Scheduler/SchedulerData'; // Import your scheduler data
import { schedulerSettings } from './Scheduler/schedulerSettings'; // Import your scheduler settings

function App() {
  const [scheduleDate, setScheduleDate] = useState(new Date());

  const callBack = (id) => {
    console.log(id);
  };

  return (
    <Scheduler
      scheduleDate={scheduleDate}
      availabilityInfo={availabilityInfo}
      schedulerConfiguration={schedulerSettings}
      schedulerData={schedulerData}
      displayMode="week"
      eventClick={callBack}
    />
  );
}

export default App;
```

## Props

The Scheduler component accepts the following props:

*   **scheduleDate**: A `Date` object representing the date to be displayed on the scheduler.
*   **availabilityInfo**: An array of objects defining the availability for each day. Each object should have `openHour`, `closeHour`, and `isOpen` properties.
*   **schedulerConfiguration**: An optional object that allows you to customize the appearance of the scheduler, including colors, line styles, and font sizes.
*   **schedulerData**: An object containing the scheduler's data, including an array of `visits` (events). Each visit should have `id`, `name`, `startDate`, and `endDate` properties.
*   **displayMode**: A string that determines the display mode of the scheduler. It can be either `"day"` or `"week"`.
*   **eventClick**: A callback function that is called when an event is clicked. It receives the event's `id` as an argument.

## Typing

```typescript
interface Event {
  id: string | number;
  name: string;
  startDate: Date;
  endDate: Date;
}

interface Availability {
  openHour: string;
  closeHour: string;
  isOpen: boolean;
}

interface GraphConfiguration {
  timescale: number;
  cellHeight: string;
  primaryHorizontalLineWidth?: string;
  secondaryHorizontalLineWidth?: string;
  verticalLineWidth?: string;
  lineStyle?: string;
  fontSize?: string;
}

interface ColorsConfiguration {
    primaryCell?: string;
    secondaryCell?: string;
    primaryCellNotAvailable?: string;
    secondaryCellNotAvailable?: string;
    primaryCellActive?: string;
    secondaryCellActive?: string;
    primaryCellNotAvailableActive?: string;
    secondaryCellNotAvailableActive?: string;
    visit?: string;
    visitFailure?: string;
    lineColor?: string;
}

interface SchedulerConfiguration {
  graphConfiguration?: GraphConfiguration;
  colors?: ColorsConfiguration;
}

interface SchedulerData {
  visits: Event[];
}

interface SchedulerProps {
  scheduleDate: Date;
  availabilityInfo: Availability[];
  schedulerConfiguration?: SchedulerConfiguration;
  schedulerData: SchedulerData;
  displayMode: "day" | "week";
  eventClick: (id: string, event: React.MouseEvent<HTMLElement>) => void;
}

const Scheduler: React.FC<SchedulerProps>;