function getExcerciseInfo() {
    return {
        excerciseNumber: 4,
        isAnimated: false,
    };
}

function draw(two) {
    axesWithD3(two);
    drawCircles(two);
}

function drawCircles(two) {
    let data = getDataForExercise4();
    console.log(data)
    const scaleY = getScaleY(two);
    const scaleX = getScaleX(two);

    circle1(two, data, scaleX, scaleY);
    //circle2(two, data, scaleX, scaleY);
    //square1(two, data, scaleX, scaleY);
    //square2(two, data, scaleX, scaleY);

}

function circle1(two, data, scaleX, scaleY){
    for (var i = 0; i < data.length; i++) {
        if (data[i].category === "true") {
            two.makeCircle(scaleX(data[i].x), scaleY(data[i].y), data[i].value/2).fill = "Green";
        } else
            two.makeCircle(scaleX(data[i].x), scaleY(data[i].y), data[i].value/2).fill = "Red";
    }
}


function circle2(two, data, scaleX, scaleY){
    for (var i = 0; i < data.length; i++) {
        var circle = two.makeCircle(scaleX(data[i].x), scaleY(data[i].y), data[i].value/2);

        // Farbcodierung basierend auf Kategorie
        if (data[i].category === "true") {
            circle.fill = "Green";
        } else {
            circle.fill = "Red";
        }

        // Anpassung der Transparenz basierend auf dem Wert
        var transparency = data[i].value / 100; // Beispiel für Transparenz basierend auf dem Wert
        circle.opacity = transparency;
    }
}

function square1(two, data, scaleX, scaleY){
    for (var i = 0; i < data.length; i++) {
        if (data[i].category === "true") {
            two.makeRectangle(scaleX(data[i].x), scaleY(data[i].y), data[i].value, data[i].value).fill = "Green";
        } else
            two.makeRectangle(scaleX(data[i].x), scaleY(data[i].y), data[i].value, data[i].value).fill = "Red";
    }
}

function square2(two, data, scaleX, scaleY){
    for (var i = 0; i < data.length; i++) {
        var square = two.makeRectangle(scaleX(data[i].x), scaleY(data[i].y), data[i].value, data[i].value);

        // Farbcodierung basierend auf Kategorie
        if (data[i].category === "true") {
            square.fill = "Green";
        } else {
            square.fill = "Red";
        }

        // Anpassung der Transparenz basierend auf dem Wert
        var transparency = data[i].value / 100; // Beispiel für Transparenz basierend auf dem Wert
        square.opacity = transparency;
    }
}
