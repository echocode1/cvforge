const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2022-03" -> "Mar 2022". Anything else is shown as typed. */
export function formatMonth(value: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(value.trim());
  if (!match) return value.trim();
  const month = MONTHS[Number(match[2]) - 1];
  return month ? `${month} ${match[1]}` : value.trim();
}

export function formatRange(start: string, end: string, current = false): string {
  const from = formatMonth(start);
  const to = current ? 'Present' : formatMonth(end);
  if (!from && !to) return '';
  if (!from) return to;
  if (!to) return from;
  return `${from} – ${to}`;
}

export function contactItems(basics: {
  email: string;
  phone: string;
  location: string;
  url: string;
}): string[] {
  return [basics.email, basics.phone, basics.location, basics.url].filter(Boolean);
}
