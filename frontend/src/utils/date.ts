import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string | Date) => {
  return format(new Date(date), 'MMM d, yyyy HH:mm');
};

export const formatRelativeDate = (date: string | Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatDateRange = (startDate: string | Date, endDate: string | Date) => {
  return `${format(new Date(startDate), 'MMM d, yyyy')} - ${format(
    new Date(endDate),
    'MMM d, yyyy'
  )}`;
};