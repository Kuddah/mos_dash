// utils.js

export const monthNamesToNumbers = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  }; 
  
  export const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  export const calculateTotalDays = (dailyRecords) => {
    return dailyRecords.reduce(
      (acc, curr) => acc + (curr.status === "On Duty" ? 1 : 0),
      0
    );
  };
  
  export const getRate = (grade, tierType, rateLookup) => {
    const gradeRates = rateLookup[grade];
    if (gradeRates) {
      const rate = gradeRates[tierType];
      return rate || 0;
    }
    return 0;
  };
  
  export const calculateTotalAmount = (dailyRecords) => {
    return dailyRecords.reduce(
      (acc, curr) => acc + Number(curr.total || 0),
      0
    );
  };
  