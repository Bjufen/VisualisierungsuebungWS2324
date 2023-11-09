"use strict";

let excersiceInfo;

function initialiseWebpage() {
    // setup webpage with all needed elements, e.g. creating the title and the canvas to draw on etc.
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
    canvas.style.width = "900px";
    canvas.style.height = "600px";
    canvas.style.margin = "4rem auto";
    main.appendChild(canvas);

    return canvas;
}

function main() {
    if (document.getElementById("canvas")) return; // already initialised
    const canvas = initialiseWebpage();

    const params = {
        width: 900,
        height: 600
    };
    // this is how to setup two.js for further information look into https://two.js.org/
    const two = new Two(params);
    two.appendTo(canvas);
    draw(two); // drawing action happening in app.js

    if (excersiceInfo.isAnimated) two.play();
    else two.update();
}

function getCenterXValuesForExercise3() {
    return [116, 288, 460, 632, 804];
}

// call main function so something actually happens
main();