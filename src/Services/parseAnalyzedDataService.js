/**
 * Parses a string of analyzed data into its components.
 * @param {string} analyzedData - The data string to parse.
 * @returns An object containing the parsed data.
 */
export const parseAnalyzedData = (analyzedData) => {
  const parts = analyzedData.split(',').map(part => part.trim());
  
  if (parts.length !== 6) {
    throw new Error('The analyzed data does not contain the expected number of parts.');
  }

  const [shortName, category, subCategory, color, tempRangeLow, tempRangeHigh] = parts;
  
  return {
    shortName,
    category,
    subCategory,
    color,
    tempRangeLow: parseInt(tempRangeLow, 10),
    tempRangeHigh: parseInt(tempRangeHigh, 10)
  };
};
