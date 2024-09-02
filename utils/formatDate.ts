export function formatDate(dateString: Date) {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}
