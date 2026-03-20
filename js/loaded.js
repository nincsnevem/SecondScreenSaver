window.onload = function() {
    const savedColor = localStorage.getItem("mainColor");
    const savedAltColor = localStorage.getItem("altColor");
    const savedContrastColor = localStorage.getItem("contrastColor");

    globalBgColor = toRgb(localStorage.getItem("mainColor"));
    globalAltColor = toRgb(localStorage.getItem("altColor"));

    console.log("All colors loaded");
    document.documentElement.style.setProperty("--bgcolor", savedColor);
    document.documentElement.style.setProperty("--altcolor", savedAltColor);
    document.documentElement.style.setProperty("--contrastcolor", savedContrastColor);

}