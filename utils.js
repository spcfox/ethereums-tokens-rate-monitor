const dateTimeFormatOptions = {
    dateStyle: 'medium',
    timeStyle: 'short'
};
const dateTimeFormat = new Intl.DateTimeFormat('en-US', dateTimeFormatOptions)

export function formatDate(timestamp) {
    return dateTimeFormat.format(new Date(1000 * timestamp));
}