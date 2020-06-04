export const DEFAULT_NO_DATE = new Date('0001-01-01T00:00:00Z'); //This date has 0 ticks so it is interpreted to mean there is no date for the variable in the backend
export const MIN_VALID_DATE = new Date('1899-01-01T00:00:00Z'); //Dates must be after this for the frontend

export const asShortString = (date: Date): string => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
