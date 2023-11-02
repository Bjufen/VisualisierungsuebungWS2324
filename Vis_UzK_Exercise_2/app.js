function getExcerciseInfo() {
    return {
        excerciseNumber: 2,
        isAnimated: false
    }
}

function drawAll(two) {
    drawCoordinateSystem(two);
    drawData(two, getDataForExercise2());
}

function draw(two) {
    /* The variables xMax, yMax and offset are defined in framework.js and saved in the "two" object for easy access.
     * Use those variables but don't modify them.
     */

    // Value-dimensions of the axes
    console.log(two.xMax);
    console.log(two.yMax);

    // Spacing between the left and bottom edge of the drawing-rectangle to the axes
    console.log(two.offset);

    // Draw the coordinate system
    drawCoordinateSystem(two);

    // Test if the value conversion works
    testConversion(two);

    // Get the data for this exercise
    var data = getDataForExercise2();
    console.log(data);

    // Draw the data correctly
    drawData(two, data);
}

/**
 * TODO:
 *   - Draw a coordinate system with the origin on the bottom left
 *   - Use offset, xMax and yMax from the two object
 *   - Add labeling to the axes:
 *      - Names of the axes next to the arrowheads
 *      - Ticks (value indicators) in steps of 50 (0,50,100,...)
 *      - Extend axes by 15 in positive direction to give the arrowheads more space
 */
function drawCoordinateSystem(two) {

    const xMax = two.xMax + two.offset;
    const yMin = two.yMax + two.offset;
    const offset = two.offset;
    const xMin = offset;
    const yMax = offset;
    const xArrowHeadLength = 15;
    const yArrowHeadLength = 15;
    const xArrowHeadOffset = 15;
    const yArrowHeadOffset = 15;

    //Draw a coordinate system with the origin on the bottom left.
    two.makeLine(xMin, yMin, xMin, yMax).linewidth = 2;
    two.makeLine(xMin, yMin, xMax, yMin).linewidth = 2;

    //Add labeling to the axes: Ticks (value indicators) in steps of 50 (0,50,100,...)
    for (let i = 0; i < xMax; i += 50) {
        two.makeLine(xMin + i, yMin, xMin + i, yMin + 5).linewidth = 2;
    }
    for (let i = 0; i <= yMin - two.offset; i += 50) {
        two.makeLine(xMin, yMin - i, xMin - 5, yMin - i).linewidth = 2;
    }

    //Add labeling to all ticks
    for (let i = 0; i <= xMax; i += 50) {
        two.makeText(i, xMin + i, yMin + offset / 2);
    }
    for (let i = 0; i <= yMin - two.offset; i += 50) {
        two.makeText(i, xMin - offset / 2, yMin - i);
    }

    //Extend axes by 15 in positive direction to give the arrowheads more space
    two.makeLine(xMax, yMin, xMax + xArrowHeadLength, yMin).linewidth = 2;
    two.makeLine(xMin, yMax, xMin, yMax - yArrowHeadLength).linewidth = 2;

    //Draw arrowheads
    drawArrowhead(two, "right", {x: xMax + xArrowHeadOffset, y: yMin});
    drawArrowhead(two, "up", {x: xMin, y: yMax - yArrowHeadOffset});

    //Add labeling to the axes: Names of the axes next to the arrowheads
    two.makeText("X", xMax + xArrowHeadOffset * 1.5, yMin);
    two.makeText("Y", xMin, yMax - yArrowHeadOffset * 1.5);

    //log all the values
    //console.log("xMax: " + xMax);
    //console.log("yMin: " + yMin);
    //console.log("xMin: " + xMin);
    //console.log("yMax: " + yMax);
}

/**
 * Draw Arrowheads depending on the given orientation
 * TODO: Extend this function to greenRect an "up" arrow
 */
function drawArrowhead(two, orientation, center) {
    const xMin = center.x;
    const yMin = center.y;
    const arrowHeadLength = 10;
    let x21, x22, y21, y22;

    switch (orientation) {
        case "right":
            x21 = xMin - arrowHeadLength;
            x22 = x21;
            y21 = yMin + arrowHeadLength;
            y22 = yMin - arrowHeadLength;
            break;

        case "down":
            x21 = xMin - arrowHeadLength;
            x22 = xMin + arrowHeadLength;
            y21 = y22 = yMin - arrowHeadLength;
            break;

        case "up":
            x21 = xMin - arrowHeadLength;
            x22 = xMin + arrowHeadLength;
            y21 = y22 = yMin + arrowHeadLength;
            break;

        case "left":
            x21 = xMin + arrowHeadLength;
            x22 = x21;
            y21 = yMin + arrowHeadLength;
            y22 = yMin - arrowHeadLength;
            break;

        default:
            throw new Error(`${orientation} is not a possible orientation`);
    }


    two.makeLine(xMin, yMin, x21, y21).linewidth = 2;
    two.makeLine(xMin, yMin, x22, y22).linewidth = 2;
}

/**
 * TODO: Convert Y-Coordinates to match the coordinate system
 */
function convY(two, yIn) {
    return 640 - yIn;
}

/**
 * TODO: Convert X-Coordinates to match the coordinate system
 */
function convX(two, xIn) {
    return 40 + xIn;
}

/**
 * TODO: Draw red circles at (0,0) and (900,600), then greenRect them in green with converted values to match the coordinate system.
 */
function testConversion(two) {
    two.makeCircle(0, 0, 10).fill = "red";
    two.makeText("1", 0, 0);
    two.makeCircle(900, 600, 10).fill = "red";
    two.makeText("2", 900, 600);
    two.makeCircle(convX(two, 0), convY(two, 0), 10).fill = "green";
    two.makeText("1", convX(two, 0), convY(two, 0));
    two.makeCircle(convX(two, 900), convY(two, 600), 10).fill = "green";
    two.makeText("2", convX(two, 900), convY(two, 600));


}

/**
 * Draw the given dataset correctly in the coordinate system
 * TODO:
 *   - Draw the individual points as circles
 *   - Additionally greenRect them as a linechart (i.e. with lines connecting consecutive points)
 */
function drawData(two, data) {
    //Draw the individual points as circles
    for (let i = 0; i < data.length; i++) {
        two.makeCircle(convX(two, data[i][0]), convY(two, data[i][1]), 3).fill = "black";
    }

    //Additionally greenRect them as a linechart (i.e. with lines connecting consecutive points)
    for (let i = 0; i < data.length - 1; i++) {
        const line = two.makeLine(
            convX(two, data[i][0]),
            convY(two, data[i][1]),
            convX(two, data[i + 1][0]),
            convY(two, data[i + 1][1])
        );
        line.linewidth = 2;
        line.stroke = 'green'; // Set the line color to red
    }

}

