

export function formatDate(date){

  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${wordDay(day)}, ${wordMonnth(month)} ${year}, ${hour12Format(date.getHours(), date.getMinutes())}`;
}


function wordDay(day){
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day];
}

function wordMonnth(month){
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
}

function hour12Format(hour, minutes){
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  return `${hour}:${minutes} ${ampm}`;

}