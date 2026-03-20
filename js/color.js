const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", setBackground);



function setBackground() {

    if (isLight(this.value)) {
        document.documentElement.style.setProperty("--altcolor", "rgb(42, 42, 42)")
        localStorage.setItem("altColor", "rgb(42, 42, 42)");
    } else {
        document.documentElement.style.setProperty("--altcolor", "#f0f8ff");
        localStorage.setItem("altColor", "#f0f8ff");
    }
    document.documentElement.style.setProperty("--bgcolor", this.value);
    document.documentElement.style.setProperty("--contrastcolor", contrastColor(this.value));


    localStorage.setItem("mainColor", this.value);
    localStorage.setItem("contrastColor", contrastColor(this.value));

}


function isLight(hex) {
    // Remove '#' if present
    hex = hex.replace("#", "");
    const limit = 170;
    // Parse RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const brightness = (0.299 * r + 0.587 * g + 0.15 * b);

    if (brightness > 165) {
        return true;
    }
    if ((r > 250 || g > 250 || b > 250) && Math.min(r, g, b) < 10) {
        return true;
    }
    if (r > limit && g > limit && b > limit) {
        return true;
    } else {
        return false;
    }

}


function contrastColor(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);


    if (!IsColored(hex)) {

        return "#fc3f10"
    }

    if (IsVibrant(hex)) {
        let ir = 256 - Math.max(r, 20);
        let ig = 256 - Math.max(g, 20);
        let ib = 256 - Math.max(b, 20);

        return `rgb(${ir}, ${ig}, ${ib})`;
    }

    if (isLight(hex)) {
        let ir = r * 1.5;
        let ig = g * 1.5;
        let ib = b * 1.5;

        return `rgb(${ir}, ${ig}, ${ib})`;
    } else {
        let ir = r * 1.2;
        let ig = g * 1.2;
        let ib = b * 1.2;

        return `rgb(${ir}, ${ig}, ${ib})`;
    }

}

function IsColored(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);



    distance = Math.max(Math.abs(r - g), Math.abs(r - b), Math.abs(g - b));
    if (distance < 20 || Math.max(r, g, b) < 30) {
        return false
    }
    return true
}


function IsVibrant(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    if (Math.max(r, g, b) > 120 && Math.min(r, g, b) < 80) {
        return true;
    }
    return false;
}


function IsDesaturated(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    if (Math.max(r, g, b) > 160 && Math.min(r, g, b) < 200) {
        return true;
    }
    return false;
}

function IsDark(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    if (Math.max(r, g, b) < 160 && Math.min(r, g, b) > 40) {
        return true;
    }
    if (Math.max(r, g, b) < 120 && Math.max(r, g, b) > 70) {
        return true;
    }
    return false;

}