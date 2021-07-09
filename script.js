var d = document.querySelector('.countdown-days');
var h = document.querySelector('.countdown-hours');
var m = document.querySelector('.countdown-minutes');
var s = document.querySelector('.countdown-seconds');

var targetDate = new Date('07/11/2021 23:00:00').getTime();
console.log(targetDate);

var timeSet = (targetDate) => {
    var currDate = new Date().getTime();
    var diff = targetDate - currDate;
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;


    var textDay = Math.floor(diff / day);
    var textHour = Math.floor((diff % day) / hour);
    var textMinute = Math.floor((diff % hour) / minute);
    var textSecond = Math.floor((diff % minute) / second);


    // console.log(textDay.toString().padStart(2, '0'), textHour, textMinute, textSecond);
    d.innerHTML = textDay.toString().padStart(2, '0');
    h.innerHTML = textHour.toString().padStart(2, '0');
    m.innerHTML = textMinute.toString().padStart(2, '0');
    s.innerHTML = textSecond.toString().padStart(2, '0');
};

setInterval(() => {
    timeSet(targetDate);
}, 1000);