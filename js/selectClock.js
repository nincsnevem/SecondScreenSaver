const offButton = document.getElementById("option-off")
offButton.addEventListener("click", () => setClock("off"));

const digitalButton = document.getElementById("option-digital")
digitalButton.addEventListener("click", () => setClock("digital"));

const analogButton = document.getElementById("option-analog")
analogButton.addEventListener("click", () => setClock("analog"))

const digitalClock = document.getElementById("digitalClockContainer")
const analogClock = document.getElementById("analogClockContainer")





const savedClockStatus = localStorage.getItem("clockStatus");
setClock(savedClockStatus)
console.log("Clock loaded");


function setClock(status) {
    digitalClock.style.setProperty("opacity", "0")
    digitalClock.style.setProperty("visibility", "visible")
    analogClock.style.setProperty("opacity", "0")
    analogClock.style.setProperty("visibility", "visible")
    if (status == "off") {
        document.querySelector(".clockOption.active").classList.remove("active");
        offButton.classList.add("active");


    }
    if (status == "digital") {
        document.querySelector(".clockOption.active").classList.remove("active");
        digitalButton.classList.add("active");
        digitalClock.style.setProperty("opacity", "1")

    }
    if (status == "analog") {
        document.querySelector(".clockOption.active").classList.remove("active");
        analogButton.classList.add("active");
        analogClock.style.setProperty("opacity", "1")
    }
    localStorage.setItem("clockStatus", status);
}