export const formatResponseTime = (value) => {
  if (value === null || value === undefined) {
    return "-";
  }
  return `${value} ms`;
};

export const formatDateTime = (value) => {
  if (!value) {
    return "Never";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleString();
};
