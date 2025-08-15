export const formatDateSeparated = (dateString: string) => {
  const date = new Date(dateString);
  return {
    day: String(date.getDate()).padStart(2, '0'),
    month: String(date.getMonth() + 1).padStart(2, '0'),
    year: String(date.getFullYear()),
  };
};

export const formatDateCombined = (dateString: string) => {
  const { day, month, year } = formatDateSeparated(dateString);
  return `${day}/${month}/${year}`;
};
