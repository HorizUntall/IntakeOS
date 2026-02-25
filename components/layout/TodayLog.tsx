import { Entry } from "@/types/entry";
import { cal, protein } from "@/types/entryType";

interface TodayLogProps {
  todayEntries: Entry[];
}

export default function TodayLog({ todayEntries }: TodayLogProps) {
  // filter by type and time
  const calEntries: Entry[][] = Array.from({ length: 24 }, () => []);
  const proteinEntries: Entry[][] = Array.from({ length: 24 }, () => []);

  for (const entry of todayEntries) {
    const hour = entry.createdAt.getUTCHours();
    if (entry.type === cal) {
      calEntries[hour].push(entry);
    } else if (entry.type === protein) {
      proteinEntries[hour].push(entry);
    }
  }

  const renderItems = () => {
    // skip hours with no entry
    let i;
    for (i = 0; i < 24; i++) {
      if (calEntries[i].length || proteinEntries[i].length) {
        break;
      }
    }

    if (i === 24) {
      return <div className="w-full">No Entries Today</div>;
    }

    const itemList = [];
    for (let k = i; k < 24; k++) {
      itemList.push(
        <div className="flex" key={k}>
          <div className="w-200">{k}</div>
          <div className="w-full flex flex-col">
            {calEntries[k].map((entry, index) => (
              <div key={`${k}-cal-${index}`}>{entry.amount}</div>
            ))}
          </div>
          <div className="w-full flex flex-col">
            {proteinEntries[k].map((entry, index) => (
              <div key={`${k}-cal-${index}`}>{entry.amount}</div>
            ))}
          </div>
        </div>,
      );
    }
    return itemList;
  };

  return <div className="flex-col">{renderItems()}</div>;
}
