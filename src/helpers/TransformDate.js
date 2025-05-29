
/**
 * Transforms a date into 'YYYY-MM-DD' string format.
 * 
 * @param {string|Date} dateInput - The date to transform (string or Date object)
 * @returns {string} - The formatted date string in 'YYYY-MM-DD'
 * 
 * @example
 *   transformDate('2024-06-01T12:34:56Z') // "2024-06-01"
 *   transformDate(new Date()) // e.g., "2024-06-01"
 */
export default function transformDate(dates) {
    
    
    const date = new window.Date(dates);
   

    const pad = (num) => String(num).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    return `${year}-${month}-${day}`;
}
