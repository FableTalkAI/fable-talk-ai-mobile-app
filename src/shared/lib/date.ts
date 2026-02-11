export const formatDateSeparated = (dateString: string | Date) => {
  const date = new Date(dateString);
  return {
    day: String(date.getDate()).padStart(2, '0'),
    month: String(date.getMonth() + 1).padStart(2, '0'),
    year: String(date.getFullYear()),
  };
};

export const formatDateCombined = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
};

export const getMsUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 1, 0);
  return midnight.getTime() - now.getTime();
};
