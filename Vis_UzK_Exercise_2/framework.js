"use strict";

let excersiceInfo;

function initialiseWebpage() {
    // Setup webpage with all needed elements, e.g. creating the title and the canvas to greenRect on etc.
    const main = document.getElementById("main");
    excersiceInfo = getExcerciseInfo();

    const title = document.createElement("h1");
    title.style.fontFamily = "inherit";
    title.style.textAlign = "center";
    title.textContent = "Visualisierung WS 21/22";
    main.appendChild(title);

    const subTitle = document.createElement("h2");
    subTitle.style.fontFamily = "inherit";
    subTitle.style.textAlign = "center";
    subTitle.textContent = "Übung " + excersiceInfo.excerciseNumber;
    main.appendChild(subTitle);
    document.title = "Vis WS 21/22 Übung " + excersiceInfo.excerciseNumber;

    const canvas = document.createElement("div");
    canvas.id = "canvas";
    canvas.style.width = "1200px";
    canvas.style.height = "700px";
    canvas.style.margin = "4rem auto";
    main.appendChild(canvas);

    return canvas;
}

function main() {
    if (document.getElementById("canvas")) return; // Already initialised
    const canvas = initialiseWebpage();

    const params = {
        // Dimensions of the drawing-rectangle
        width: 1200,
        height: 700,
        // Value-dimensions of the axes
        xMax: 900,
        yMax: 600,
        // Spacing between the left and bottom edge of the drawing-rectangle to the axes
        offset: 40
    };

    // This is how to setup two.js for further information look into https://two.js.org/
    const two = new Two(params);
    two.appendTo(canvas);
    const circumference = two.makeRectangle(params.width / 2, params.height / 2, params.width, params.height); //mark the circumference of the canvas
    circumference.stroke = "grey";
    drawAll(two); // Drawing action happening in app.js

    if (excersiceInfo.isAnimated) two.play();
    else two.update();
}


function getDataForExercise1() {
    // Create and return a dataset of points that together form a smiley face
    let dataPoints = [];
    const radius = 220;
    const centerX = 415;
    const centerY = 265;
    dataPoints = dataPoints.concat(calculateCircle(centerX, centerY, radius, 2 * Math.PI));
    const centerXLeftEye = centerX - 60;
    const centerXRightEye = centerX + 60;
    const centerYEyes = centerY - 80;
    dataPoints = dataPoints.concat(calculateCircle(centerXLeftEye, centerYEyes, 20, 2 * Math.PI));
    dataPoints = dataPoints.concat(calculateCircle(centerXRightEye, centerYEyes, 20, 2 * Math.PI));
    dataPoints = dataPoints.concat(calculateCircle(centerX, 300, 80, Math.PI));
    return dataPoints;
}

function getDataForExercise2() {
    const data = [
        [50, 50],
        [100, 100],
        [150, 150],
        [200, 200],
        [250, 250],
        [300, 300],
        [350, 350],
        [400, 250],
        [450, 175],
        [500, 100],
        [550, 200],
        [600, 300],
        [650, 350],
        [700, 400],
        [750, 450],
        [800, 500],
        [850, 550]
    ];
    return data;
}

function calculateCircle(centerX, centerY, radius, endAngle) {
    // Create and return a dataset of points that all lie on one circle
    const dataPoints = [];
    for (let i = 0; i < endAngle; i += (.1 * 220) / radius) {
        dataPoints.push({ x: Math.cos(i) * radius + centerX, y: Math.sin(i) * radius + centerY })
    }
    return dataPoints;
}

// Call main function so something actually happens
main();