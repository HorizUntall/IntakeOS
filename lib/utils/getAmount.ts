import { Entry } from "@/types/entry";
import { cal, protein } from "@/types/entryType";

export function getTodayAmounts(todayEntries: Entry[]) {
  let calAmt = 0;
  let proteinAmt = 0;
  for (const entry of todayEntries) {
    if (entry.type === cal) {
      calAmt += entry.amount;
    } else if (entry.type === protein) {
      proteinAmt += entry.amount;
    }
  }

  return {
    calAmt,
    proteinAmt,
  };
}
