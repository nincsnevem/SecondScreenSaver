const hourHand = document.getElementById("analogHour");
const minuteHand = document.getElementById("analogMinute");
const secondHand = document.getElementById("analogSecond");

let shadowHourX = 0;
let shadowHourY = 0;
let shadowHourDistance = 10;

let shadowMinX = 0;
let shadowMinY = 0;
let shadowMinDistance = 12;

let shadowSecX = 0;
let shadowSecY = 0;
let shadowSecDistance = 14;






function setHands(ms, seconds, minutes, hours) {
    hoursDeg = (hours % 12) * 30 + minutes / 2 + seconds / 120 + ms / 120000;
    minutesDeg = minutes * 6 + seconds / 10 + ms * 0.0001;
    secondsDeg = seconds * 6 + ms * 0.006;

    hourHand.style.transform = `translate(-50%, -110%) rotate(${hoursDeg}deg)`;
    minuteHand.style.transform = `translate(-50%, -110%) rotate(${minutesDeg}deg)`;
    secondHand.style.transform = `translate(-50%, -100%) rotate(${secondsDeg}deg)`;


}

function setShadow(ms, seconds, minutes, hours) {
    hoursRad = (Math.PI / 180) * ((hours % 12) * 30 + minutes / 2 + seconds / 60 + ms / 120000);
    minutesRad = (Math.PI / 180) * (minutes * 6 + seconds / 10 + ms * 0.0001);
    secondsRad = (Math.PI / 180) * (seconds * 6 + ms * 0.006);


    let shadowHourX = Math.sin(hoursRad) * shadowHourDistance;
    let shadowHourY = Math.max(Math.cos(-hoursRad) * shadowHourDistance, 0);

    let shadowMinX = Math.sin(minutesRad) * shadowHourDistance;
    let shadowMinY = Math.max(Math.cos(-minutesRad) * shadowMinDistance, 0);

    let shadowSecX = Math.sin(secondsRad) * shadowHourDistance;
    let shadowSecY = Math.max(Math.cos(-secondsRad) * shadowSecDistance, 0);



    document.documentElement.style.setProperty('--hour-x', `${shadowHourX}px`);
    document.documentElement.style.setProperty('--hour-y', `${shadowHourY}px`);

    document.documentElement.style.setProperty('--min-x', `${shadowMinX}px`);
    document.documentElement.style.setProperty('--min-y', `${shadowMinY}px`);

    document.documentElement.style.setProperty('--sec-x', `${shadowSecX}px`);
    document.documentElement.style.setProperty('--sec-y', `${shadowSecY}px`);
}


function updateClock() {
    const now = new Date();


    if (analogClock.style.getPropertyValue("visibility") === "visible") {

        setHands(now.getMilliseconds(), now.getSeconds(), now.getMinutes(), now.getHours());
        setShadow(now.getMilliseconds(), now.getSeconds(), now.getMinutes(), now.getHours());
    }
    requestAnimationFrame(updateClock);
}