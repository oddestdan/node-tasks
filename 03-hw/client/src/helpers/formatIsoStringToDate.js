export const formatIsoStringToDate = iso => {
  const date = new Date(iso);
  const yr = date.getFullYear();
  const mo = date.getMonth() + 1;
  const da = date.getDate();
  const hr = date.getHours();
  const mn = date.getMinutes();

  return `${yr}-${mo}-${da} / ${hr}:${mn}`;
};
