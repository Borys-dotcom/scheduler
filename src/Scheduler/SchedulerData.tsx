let date = new Date(0);

const schedulerData = {
    availabilityInfo: [
      {
        //sunday
        isOpen: false,
        openHour: date.setHours(9, 30),
        closeHour: date.setHours(22, 30),
      },
      {
        //monday
        isOpen: true,
        openHour: date.setHours(9, 30),
        closeHour: date.setHours(22, 0),
      },
      {
        //tuesday
        isOpen: true,
        openHour: date.setHours(2, 30),
        closeHour: date.setHours(19, 30),
      },
      {
        //wednesday
        isOpen: true,
        openHour: date.setHours(8, 30),
        closeHour: date.setHours(19, 30),
      },
      {
        //thurday
        isOpen: true,
        openHour: date.setHours(9, 30),
        closeHour: date.setHours(20, 30),
      },
      {
        //friday
        isOpen: true,
        openHour: date.setHours(9, 30),
        closeHour: date.setHours(20, 30),
      },
      {
        //saturday
        isOpen: false,
        openHour: date.setHours(9, 30),
        closeHour: date.setHours(20, 30),
      },
    ],
    visits: [
      {
        id: '1',
        name: 'Jadzia Nowak',
        startDate: new Date('2025-02-18T08:30:00'),
        endDate: new Date('2025-02-18T10:30:00'),
      },
      {
        id: '2',
        name: 'Ela Malinowska',
        startDate: new Date('2025-02-18T12:00:00'),
        endDate: new Date('2025-02-18T13:00:00'),
      },
      {
        id: '3',
        name: 'Kasia Kowalska',
        startDate: new Date('2025-02-18T13:30:00'),
        endDate: new Date('2025-02-18T14:45:00'),
      },
      {
        id: '4',
        name: 'Iza Jaworska',
        startDate: new Date('2025-02-17T13:30:00'),
        endDate: new Date('2025-02-17T14:45:00'),
      },
    ],
  };

  export default schedulerData;