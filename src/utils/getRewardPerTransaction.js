const pointsForTransactionsAbove100 = (amount= 0) => {
  //  2 points for every dollar spent over $100
  if (amount < 100) return 0;

  return (Math.round(amount) - 100) * 2;
};

const pointsForTransactionsBelow100 = (amount= 0) => {
  // 1 point for every dollar spent over $50 but less than $100
  if (amount < 50) return 0;
  else if (amount > 99) return 50;
  return Math.round(amount);
};

const getRewardPerTransaction = (amount) => {
  const formatted = typeof amount !== 'number' ? Number(amount.substring(1)) : amount

  return pointsForTransactionsAbove100(formatted) + pointsForTransactionsBelow100(formatted);
}

export default getRewardPerTransaction;
