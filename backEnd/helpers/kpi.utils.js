// kpi.utils.js

// لحساب result لكل term
const calculateTermResults = (months) => {
    return months.map(month => {
      const updatedTerms = (month.terms || []).map(term => {
        let result = 0;
        if (term.target > 0) {
          result = Math.round((term.achieved / term.target) * term.weight);
        }
        return {
          ...term,
          result
        };
      });
      return {
        ...month,
        terms: updatedTerms
      };
    });
  };
  
  // لحساب أداء الربع
  const calculateQuarterPerformance = (months) => {
    let totalWeight = 0;
    let totalScore = 0;
  
    months.forEach(month => {
      month.terms.forEach(term => {
        totalWeight += term.weight || 0;
        totalScore += term.result || 0;
      });
    });
  
    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  };
  
  module.exports = {
    calculateTermResults,
    calculateQuarterPerformance
  };
  