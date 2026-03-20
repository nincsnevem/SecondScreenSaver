const offButton = document.getElementById("option-off");
offButton.addEventListener("click", () => setVisible("off"));

const digitalButton = document.getElementById("option-digital");;
digitalButton.addEventListener("click", () => setVisible("digital"));

const analogButton = document.getElementById("option-analog");
analogButton.addEventListener("click", () => setVisible("analog"));

const animOffButton = document.getElementById("game-anim-off");
animOffButton.addEventListener("click", () => setVisible("off"));

const animDVDButton = document.getElementById("game-anim-dvd");
animDVDButton.addEventListener("click", () => setVisible("dvd"));

const snakeButton = document.getElementById("game-anim-snake");
snakeButton.addEventListener("click", () => setVisible("snake"));

const simpleOffButton = document.getElementById("simple-anim-off");
simpleOffButton.addEventListener("click", () => setVisible("off"));

const simpleCircleButton = document.getElementById("simple-anim-circle");
simpleCircleButton.addEventListener("click", () => setVisible("circle"));

const simpleBubbleButton = document.getElementById("simple-anim-bubble");
simpleBubbleButton.addEventListener("click", () => setVisible("bubble"));

const digitalClock = document.getElementById("digitalClockContainer");
const analogClock = document.getElementById("analogClockContainer");
const dvdLogo = document.getElementById("dvdLogo");
const snakeContainer = document.getElementById("snakeContainer");
const circleGradient = document.getElementById("gradientContainer");
const bubbleContainer = document.getElementById("bubbleContainer")





const savedStatus = localStorage.getItem("Status");
setVisible(savedStatus)
console.log("Clock loaded");


function setVisible(status) {
    digitalClock.style.setProperty("opacity", "0");
    analogClock.style.setProperty("opacity", "0");

    analogClock.style.setProperty("visibility", "hidden");
    digitalClock.style.setProperty("visibility", "hidden");

    dvdLogo.style.setProperty("visibility", "hidden");
    dvdLogo.style.setProperty("opacity", "0");

    snakeContainer.style.setProperty("visibility", "hidden");
    snakeContainer.style.setProperty("opacity", "0");

    circleGradient.style.setProperty("visibility", "hidden");
    circleGradient.style.setProperty("opacity", "0");

    bubbleContainer.style.setProperty("visibility", "hidden");
    bubbleContainer.style.setProperty("opacity", "0");

    document.querySelectorAll(".active").forEach(el => {
        el.classList.remove("active");
    });

    offButton.classList.add("active");
    animOffButton.classList.add("active");
    simpleOffButton.classList.add("active");


    if (status == "digital") {
        document.querySelectorAll(".clockOption.active").forEach(el => {
            el.classList.remove("active");
        });

        digitalButton.classList.add("active");
        digitalClock.style.setProperty("visibility", "visible");
        digitalClock.style.setProperty("opacity", "1");


    }
    if (status == "analog") {
        document.querySelectorAll(".clockOption.active").forEach(el => {
            el.classList.remove("active");
        });
        analogButton.classList.add("active");
        analogClock.style.setProperty("visibility", "visible");
        analogClock.style.setProperty("opacity", "1");

        requestAnimationFrame(updateClock);

    }


    if (status == "dvd") {
        document.querySelectorAll(".game-anim-option.active").forEach(el => {
            el.classList.remove("active");
        });


        animDVDButton.classList.add("active");

        dvdLogo.style.setProperty("visibility", "visible");
        dvdLogo.style.setProperty("opacity", "1");
        requestAnimationFrame(updateLogo);
    }

    if (status == "snake") {

        document.querySelectorAll(".game-anim-option.active").forEach(el => {
            el.classList.remove("active");
        });
        snakeButton.classList.add("active");

        snakeContainer.style.setProperty("visibility", "visible");
        snakeContainer.style.setProperty("opacity", "1");
    }
    if (status === "circle") {
        document.querySelectorAll(".simple-anim-option.active").forEach(el => {
            el.classList.remove("active");
        });
        simpleCircleButton.classList.add("active");
        circleGradient.style.setProperty("visibility", "visible");
        circleGradient.style.setProperty("opacity", "1");
    }
    if (status === "bubble") {
        document.querySelectorAll(".simple-anim-option.active").forEach(el => {
            el.classList.remove("active");
        });
        simpleBubbleButton.classList.add("active");
        bubbleContainer.style.setProperty("visibility", "visible");
        bubbleContainer.style.setProperty("opacity", "1");
    }
    localStorage.setItem("Status", status);
}