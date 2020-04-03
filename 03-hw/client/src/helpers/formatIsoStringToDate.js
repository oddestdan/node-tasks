export const formatIsoStringToDate = iso => {
  const date = new Date(iso);
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
};
