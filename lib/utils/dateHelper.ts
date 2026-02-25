type DaySlot = {
  date: Date;
  dateString: string;
} | null;

export const generateCalendarYear = (year: number): DaySlot[] => {
  const slots: DaySlot[] = [];

  // Get the first day of the year
  const firstDayOfYear = new Date(year, 0, 1);

  // Add padding for the first week
  const startPadding = firstDayOfYear.getDay();
  for (let i = 0; i < startPadding; i++) {
    slots.push(null);
  }

  // Fill in every day of the year
  const lastDayOfYear = new Date(year, 11, 31);
  let currentDay = new Date(firstDayOfYear);

  while (currentDay <= lastDayOfYear) {
    slots.push({
      date: new Date(currentDay),
      dateString: currentDay.toISOString().split("T")[0],
    });
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return slots;
};
