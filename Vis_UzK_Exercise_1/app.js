function getExcerciseInfo() {
    return {
        excerciseNumber: 1,
        isAnimated: false
    }
}
function taskOne(two){
    two.clear();
    greenRect(two);
    orangeCircle(two);
    yellowLine(two);
    roundedRectPurple(two);
    greenEllipse(two);
    yellowStar(two);
    polygon(two);
    arcSegment(two);
    path(two);
    curve(two);

}

function taskTwo(two) {

    createAxes(two);
    mapData(two);
}

function greenRect(two) {
    const rectangle = two.makeRectangle(700, 150, 300, 200);
    rectangle.fill = "green";
}

function orangeCircle(two) {
    const circle = two.makeCircle(100, 100, 60);
    circle.fill = "orange";
}



function yellowLine(two){
    const line = two.makeLine(20, 20, 20, 580);
    line.stroke = "yellow";
    line.linewidth = 5;
}

function roundedRectPurple(two){
    const rectangle = two.makeRoundedRectangle(400, 100, 100, 200, 20);
    rectangle.fill = "purple";
}

function greenEllipse(two){
    const ellipse = two.makeEllipse(200, 300, 150, 100);
    ellipse.fill = "green";
}

function yellowStar(two){
    const star = two.makeStar(300, 500, 200, 150, 10);
    star.fill = "yellow";
}

function polygon(two){
    const polygon = two.makePolygon(550, 350, 50, 10);
    polygon.fill = "red";
}

function arcSegment(two){
    const arcSegment = two.makeArcSegment(700, 350, 30, 70, 0, Math.PI, 500);
    arcSegment.fill = "blue";
}

function path(two){
    const path = two.makePath(500, 400, 600, 450, 550, 475, 550, 595);
    path.fill = "orange";
}

function curve(two){
    const curve = two.makeCurve(650, 500, 675, 450, 700, 550, 725, 450, 750, 500, true);
    curve.fill = "orange";
}



function createAxes(two){
    //Create a coordinate system with origin (20,20) and a width of 500 and a height of 500, with a step size of 50, X-Axis is the horizontal axis, Y-Axis is the vertical axis
    const xaxis = two.makeLine(20, 20, 720, 20);
    const yaxis = two.makeLine(20, 20, 20, 520);
    xaxis.stroke = "black";
    yaxis.stroke = "black";

    //label horizontal axis x and vertical y
    const xlabel = two.makeText("X", 730, 20);
    const ylabel = two.makeText("Y", 20, 530);
    //Create a label for the origin with the text "0" and place it at (10, 10)
    const originLabel = two.makeText("0", 10, 10);
    //Create a label for the point (500,500) with the text "500,500" and place it at (500, 500)
    const pointLabel = two.makeText("700,500", 700, 500);
    //Create a label for the point (500,0) with the text "500,0" and place it at (500, 10)

    //Create arrows in both directions at the end of both lines

    const xarrow = two.makeLine(720, 20, 710, 30);
    const xarrow1 = two.makeLine(720, 20, 710, 10);
    const yarrow = two.makeLine(20, 520, 30, 510);
    const yarrow1 = two.makeLine(20, 520, 10, 510);


}

function mapData(two){
    const data = getDataForExercise1();
    //Map the data to the coordinate system
    for (let i = 0; i < data.length; i++) {
        //draw each point as scatterplot
         const point = two.makeCircle(data[i].x, data[i].y, 2);
         point.fill = "black";
         }
    //log to console the max value of x and y in the dataset
    let maxX = 0;
    let maxY = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].x > maxX) {
            maxX = data[i].x;
        }
        if (data[i].y > maxY) {
            maxY = data[i].y;
        }
    }
    console.log("Max X: " + maxX + " Max Y: " + maxY);
}
