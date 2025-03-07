export var formatTime = function (decimalTime) {
    var hours = Math.floor(decimalTime);
    var minutes = Math.round((decimalTime - hours) * 60);
    return "".concat(hours, ":").concat(minutes < 10 ? "0" : "").concat(minutes);
};
export var calculateHourFromString = function (hourString) {
    var hourNumber = parseInt(hourString.split(":")[0]) * 60 +
        parseInt(hourString.split(":")[1]);
    return hourNumber / 60;
};
export var calculateTopPosition = function (startDate, chartRange) {
    var startHour = startDate.getHours() + startDate.getMinutes() / 60;
    var earliestHour = chartRange.startHour;
    var totalHours = chartRange.endHour - chartRange.startHour;
    var percentage = ((startHour - earliestHour) / totalHours) * 100;
    return "".concat(percentage, "%");
};
export var calculateHeight = function (startDate, endDate, chartRange) {
    var startHour = startDate.getHours() + startDate.getMinutes() / 60;
    var endHour = endDate.getHours() + endDate.getMinutes() / 60;
    var totalHours = chartRange.endHour - chartRange.startHour;
    var percentage = ((endHour - startHour) / totalHours) * 100;
    return "".concat(percentage, "%");
};
export var calculateNumberOfWeek = function (date) {
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return weekNo;
};
export var calculateArrayOfDatesInCurrentWeek = function (date) {
    var arrayOfDays = [];
    var currentDayOfWeek = date.getDay();
    if (currentDayOfWeek === 0) {
        currentDayOfWeek = 7;
    }
    for (var i = 0; i < 7; i++) {
        arrayOfDays[i] = new Date(date.getFullYear(), date.getMonth(), date.getDate() - currentDayOfWeek + i + 2)
            .toISOString()
            .split("T")[0];
    }
    return arrayOfDays;
};
export var specifyBorderTopLineStyle = function (isFullHour, isLabel, schedulerSettings) {
    return isFullHour
        ? schedulerSettings.graphConfiguration.primaryHorizontalLineWidth +
            " " +
            schedulerSettings.graphConfiguration.lineStyle +
            " " +
            schedulerSettings.colors.lineColor
        : isLabel
            ? ""
            : schedulerSettings.graphConfiguration.secondaryHorizontalLineWidth +
                " " +
                schedulerSettings.graphConfiguration.lineStyle +
                " " +
                schedulerSettings.colors.lineColor;
};
export var specifyBorderLineStyle = function (schedulerSettings) {
    return (schedulerSettings.graphConfiguration.verticalLineWidth +
        " " +
        schedulerSettings.graphConfiguration.lineStyle +
        " " +
        schedulerSettings.colors.lineColor);
};
export var setVisitColor = function (visit, availability, scheduleDate, schedulerSettings) {
    var visitStartDate = visit.startDate;
    var businessStartDate = new Date(new Date(scheduleDate.getFullYear(), scheduleDate.getMonth(), scheduleDate.getDate(), parseInt(availability.openHour.split(":")[0]), parseInt(availability.openHour.split(":")[1]), 0).getTime());
    var visitEndDate = visit.endDate;
    var businessCloseDate = new Date(new Date(scheduleDate.getFullYear(), scheduleDate.getMonth(), scheduleDate.getDate(), parseInt(availability.closeHour.split(":")[0]), parseInt(availability.closeHour.split(":")[1]), 0).getTime());
    if (visitStartDate >= businessStartDate &&
        visitEndDate <= businessCloseDate && availability.isOpen) {
        return schedulerSettings.colors.visit;
    }
    else
        return schedulerSettings.colors.visitFailure;
};
export var getDayOfWeek = function (dateString) {
    var date = new Date(dateString);
    return date.getDay();
};
