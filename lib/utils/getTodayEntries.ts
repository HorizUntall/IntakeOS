import { Entry } from "@/types/entry";

function isToday(dateInput: Date | string, todayReference: Date): boolean {
  const date = new Date(dateInput);

  // Set both to local midnight to compare only the calendar day
  const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const d2 = new Date(
    todayReference.getFullYear(),
    todayReference.getMonth(),
    todayReference.getDate(),
  );

  return d1.getTime() === d2.getTime();
}

export default function getTodayEntries(entries: Entry[]) {
  // Use a Date object as the reference, not a string
  const now = new Date();

  const todayEntries = entries.filter((entry) => isToday(entry.createdAt, now));

  console.log("Filtered Today's Entries:", todayEntries);
  return todayEntries;
}
