'use strict';
let date = new Date();
let hour,
minutes,
degrees;

hour = date.getHours();
hour = hour % 12;
minutes = date.getMinutes();


function degree (hour, minutes) {
    degrees = ((hour * 30)  + (minutes * 0.5) - (minutes * 6));
    if (degrees > 180) {
        degrees = 360 - degrees;
    } 
    else if (degrees < 0 ) {
        degrees = degrees * -1;
    }
    return (degrees);
}
degree (hour, minutes);
alert (degrees);
