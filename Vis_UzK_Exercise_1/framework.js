"use strict";

let excersiceInfo;

function initialiseWebpage() {
    // setup webpage with all needed elements, e.g. creating the title and the canvas to greenRect on etc.
    const main = document.getElementById("main");
    excersiceInfo = getExcerciseInfo();

    const title = document.createElement("h1");
    title.style.fontFamily = "inherit";
    title.style.textAlign = "center";
    title.textContent = "Visualisierung";
    main.appendChild(title);

    const subTitle = document.createElement("h2");
    subTitle.style.fontFamily = "inherit";
    subTitle.style.textAlign = "center";
    subTitle.textContent = "Übung " + excersiceInfo.excerciseNumber;
    main.appendChild(subTitle);
    document.title = "Vis Übung " + excersiceInfo.excerciseNumber;

    const canvas = document.createElement("div");
    canvas.id = "canvas";
    canvas.style.width = "900px";
    canvas.style.height = "600px";
    canvas.style.margin = "4rem auto";
    main.appendChild(canvas);

    return canvas;
}

function main() {
    if (document.getElementById("canvas")) return; //already initialised
    const canvas = initialiseWebpage();

    const params = {
        width: 900,
        height: 600
    };
    //this is how to setup two.js for further information look into https://two.js.org/
    const two = new Two(params);
    two.appendTo(canvas);
    const circumference = two.makeRectangle(params.width / 2, params.height / 2, params.width, params.height); //mark the circumference of the canvas
    circumference.stroke = "grey";
    taskTwo(two);

    if (excersiceInfo.isAnimated) two.play();
    else two.update();
}


function getDataForExercise1() {
    // create and return a dataset of points that together form a smiley face
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

function calculateCircle(centerX, centerY, radius, endAngle) {
    //create and return a dataset of points that all lie on one circle
    const dataPoints = [];
    for (let i = 0; i < endAngle; i += (.1 * 220) / radius) {
        dataPoints.push({ x: Math.cos(i) * radius + centerX, y: Math.sin(i) * radius + centerY })
    }
    return dataPoints;
}
//call main function so something actually happens
main();