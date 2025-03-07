let date = new Date(0);

const schedulerData = {
  visits: [
    {
      id: "1",
      name: "Mariola Kowalczyk",
      startDate: new Date("2025-02-22T11:00:00"),
      endDate: new Date("2025-02-22T12:00:00"),
    },
    {
      id: "2",
      name: "Jan Nowak",
      startDate: new Date("2025-02-22T13:00:00"),
      endDate: new Date("2025-02-22T14:00:00"),
    },
    {
      id: "3",
      name: "Anna Wiśniewska",
      startDate: new Date("2025-02-23T09:00:00"),
      endDate: new Date("2025-02-23T10:00:00"),
    },
    {
      id: "4",
      name: "Piotr Malinowski",
      startDate: new Date("2025-02-23T14:00:00"),
      endDate: new Date("2025-02-23T15:00:00"),
    },
    {
      id: "5",
      name: "Katarzyna Zielińska",
      startDate: new Date("2025-02-24T08:30:00"),
      endDate: new Date("2025-02-24T09:30:00"),
    },
    {
      id: "6",
      name: "Tomasz Lewandowski",
      startDate: new Date("2025-02-25T10:00:00"),
      endDate: new Date("2025-02-25T11:00:00"),
    },
    {
      id: "7",
      name: "Agnieszka Dąbrowska",
      startDate: new Date("2025-02-26T12:00:00"),
      endDate: new Date("2025-02-26T13:00:00"),
    },
    {
      id: "8",
      name: "Marek Szymański",
      startDate: new Date("2025-02-27T14:00:00"),
      endDate: new Date("2025-02-27T15:00:00"),
    },
    {
      id: "9",
      name: "Ewa Woźniak",
      startDate: new Date("2025-02-28T08:00:00"),
      endDate: new Date("2025-02-28T09:00:00"),
    },
    {
      id: "10",
      name: "Robert Kamiński",
      startDate: new Date("2025-03-01T11:00:00"),
      endDate: new Date("2025-03-01T12:00:00"),
    },
    {
      id: "11",
      name: "Magdalena Jankowska",
      startDate: new Date("2025-03-02T13:00:00"),
      endDate: new Date("2025-03-02T14:00:00"),
    },
    {
      id: "12",
      name: "Damian Zieliński",
      startDate: new Date("2025-03-03T09:00:00"),
      endDate: new Date("2025-03-03T10:00:00"),
    },
    {
      id: "13",
      name: "Joanna Wójcik",
      startDate: new Date("2025-03-04T12:00:00"),
      endDate: new Date("2025-03-04T13:00:00"),
    },
    {
      id: "14",
      name: "Paweł Kozłowski",
      startDate: new Date("2025-03-05T14:00:00"),
      endDate: new Date("2025-03-05T15:00:00"),
    },
    {
      id: "15",
      name: "Monika Mazur",
      startDate: new Date("2025-03-06T08:30:00"),
      endDate: new Date("2025-03-06T09:30:00"),
    },
    {
      id: "16",
      name: "Grzegorz Nowicki",
      startDate: new Date("2025-03-07T10:00:00"),
      endDate: new Date("2025-03-07T19:00:00"),
    },
    {
      id: "17",
      name: "Karolina Pawlak",
      startDate: new Date("2025-03-08T12:00:00"),
      endDate: new Date("2025-03-08T13:00:00"),
    },
    {
      id: "18",
      name: "Michał Adamczyk",
      startDate: new Date("2025-03-09T14:00:00"),
      endDate: new Date("2025-03-09T15:00:00"),
    },
    {
      id: "19",
      name: "Aleksandra Górska",
      startDate: new Date("2025-03-10T09:00:00"),
      endDate: new Date("2025-03-10T10:00:00"),
    },
    {
      id: "20",
      name: "Krzysztof Sikora",
      startDate: new Date("2025-03-11T11:00:00"),
      endDate: new Date("2025-03-11T12:00:00"),
    },
    {
      id: "21",
      name: "Barbara Rutkowska",
      startDate: new Date("2025-03-12T13:00:00"),
      endDate: new Date("2025-03-12T14:00:00"),
    },
    {
      id: "22",
      name: "Łukasz Borkowski",
      startDate: new Date("2025-03-13T08:30:00"),
      endDate: new Date("2025-03-13T09:30:00"),
    },
    {
      id: "23",
      name: "Dorota Michalska",
      startDate: new Date("2025-03-14T10:00:00"),
      endDate: new Date("2025-03-14T11:00:00"),
    },
    {
      id: "24",
      name: "Artur Zając",
      startDate: new Date("2025-03-15T12:00:00"),
      endDate: new Date("2025-03-15T13:00:00"),
    },
    {
      id: "25",
      name: "Natalia Kaczmarek",
      startDate: new Date("2025-03-16T14:00:00"),
      endDate: new Date("2025-03-16T15:00:00"),
    },
    {
      id: "26",
      name: "Rafał Piotrowski",
      startDate: new Date("2025-03-17T09:00:00"),
      endDate: new Date("2025-03-17T10:00:00"),
    },
    {
      id: "27",
      name: "Sylwia Jasinska",
      startDate: new Date("2025-03-18T11:00:00"),
      endDate: new Date("2025-03-18T12:00:00"),
    },
    {
      id: "28",
      name: "Marcin Duda",
      startDate: new Date("2025-03-19T13:00:00"),
      endDate: new Date("2025-03-19T14:00:00"),
    },
    {
      id: "29",
      name: "Iwona Sobczak",
      startDate: new Date("2025-03-20T08:30:00"),
      endDate: new Date("2025-03-20T09:30:00"),
    },
    {
      id: "30",
      name: "Patryk Walczak",
      startDate: new Date("2025-03-21T10:00:00"),
      endDate: new Date("2025-03-21T11:00:00"),
    },
  ],
};

export default schedulerData;
