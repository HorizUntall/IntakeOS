import { Entry } from "@/types/entry";
import { type_protein, type_cal } from "@/types/entryType";

export function getTodayAmounts(todayEntries: Entry[]) {
  let calAmt = 0;
  let proteinAmt = 0;
  for (const entry of todayEntries) {
    if (entry.type === type_cal) {
      calAmt += entry.amount;
    } else if (entry.type === type_protein) {
      proteinAmt += entry.amount;
    }
  }

  return {
    calAmt,
    proteinAmt,
  };
}
