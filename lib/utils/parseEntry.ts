export function parseEntryPOST(input: string) {
  const text = input.toLowerCase();
  const results: { amount: number; type: "calories" | "protein" }[] = [];

  // Regex for Calories
  const calMatch = text.match(/(\d+)\s*(?:calories|calorie|cal|cals|kcal)/i);
  if (calMatch) {
    results.push({ amount: parseInt(calMatch[1]), type: "calories" });
  }

  // Regex for Protein
  const proMatch = text.match(/(\d+)\s*(?:protein|g|grams|gram)/i);
  if (proMatch) {
    results.push({ amount: parseInt(proMatch[1]), type: "protein" });
  }

  return results;
}

export function parseEntryGET(input: string) {
  const text = input.toLowerCase();

  const hasHowMuchOrMany = /how (much|many)/.test(text);
  const isRemaining = /remaining|left/.test(text);
  const hasCalories = /calories|calorie|cal|cals|kcal/.test(text);
  const hasProtein = /protein|g|grams|gram/.test(text);

  if (hasHowMuchOrMany || isRemaining || hasCalories || hasProtein) {
    let res = "";

    if (isRemaining) {
      res += "remaining_";
    }
    if (hasCalories && hasProtein) {
      res += "both";
    } else if (hasCalories) {
      res += "calories";
    } else if (hasProtein) {
      res += "protein";
    } else {
      return null;
    }
    return res;
  }

  const hasSummary = /summary/.test(text);
  if (hasSummary) {
    return "summary";
  }
  return null;
}
