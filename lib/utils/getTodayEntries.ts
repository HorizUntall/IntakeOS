import { Entry } from "@/types/entry";

function isToday(dateInput: Date | string, todayReference: Date): boolean {
  const date = new Date(dateInput);

  return (
    date.getUTCFullYear() === todayReference.getUTCFullYear() &&
    date.getUTCMonth() === todayReference.getUTCMonth() &&
    date.getUTCDate() === todayReference.getUTCDate()
  );
}

export default function getTodayEntries(entries: Entry[]) {
  // Use a Date object as the reference, not a string
  const now = new Date();

  const todayEntries = entries.filter((entry) => isToday(entry.createdAt, now));

  console.log("Filtered Today's Entries:", todayEntries);
  return todayEntries;
}
