function getExcerciseInfo() {
    return {
        excerciseNumber: 3,
        isAnimated: true,
    };
}



function draw(two) {
    axesWithD3();
    // POSITION 1: TODO: Calculate 5 random values between 20 and 90 and store them in an array.
    const values = [];
    for (let i = 0; i < 5; i++) {
        values.push(randomNumberBetweenMinAndMax(20, 90));
    }
    // If you want to pick different min and max values you need to alter the scaleY in the framework, otherwise the bars might not fit into the canvas.
    const values2 = values.slice();
    let index = randomNumberBetweenMinAndMax(0, 4);
    values2[index] = values[index] + 3;

    console.log(values);

    // this code is executed approximately 60 times a second
    // the frameCount is incremented with every execution
    two.bind("update",
        framecount => {
            if (framecount % 500 == 0) { //% is the module operation. Every 500 frames (~10 seconds) this function alls.
                makeBarChart(two, values, 172); // POSITION 2
            } else if (framecount % 500 == 230 || framecount % 500 == 490) {
                two.clear(); //We remove what we drawed so we can draw new things
            } else if (framecount % 500 == 240) {
                makeBarChart(two, values2, 172); // POSITION 3
            }
        })
}

/**
 * Returns a whole number between [min,max] uniformly at random.
 * @param {Minimum value to return} min 
 * @param {Maximum value to return} max 
 */
function randomNumberBetweenMinAndMax(min, max) {
    // TODO: this method should take a min and max value as arguments and return one random value between those two
    return Math.floor(Math.random() * (max - min + 1) + min);

}

/**
 * Draws a barchart with exactly 5 bars with the given width.
 * Note: Magic numbers present to determine x-positions for convenience of exercise.
 * @param {Two.js object} two 
 * @param {An array with the 5 values of the bar chart} values 
 * @param {Total width of the bar chart} width 
 */
function makeBarChart(two, values, width) {
    const xCenterValues = getCenterXValuesForExercise3();//Get the center-x coordinates for the 5 bars.
    const scaleY = getScaleY(); //gets a function that transforms a value from [0,100] to the correct y-height for the bar to draw.

    // TODO: this method should draw the bar chart, meaning five rectangles, the centerX values are given

    for(let i = 0; i < values.length; i++) {
        const x = xCenterValues[i];
        const y = values[i];
        const rect = two.makeRectangle(x, scaleY(100 - (y/2)), width, scaleY(100) - scaleY(100-y));
        rect.fill = '#3498db';
        two.add(rect);
    }

}

//The following section is only for your information about axis programming using D3.
//You do not need to change anything in the code (and might break things if you do)

function getScaleY() {
    /**
     * maps a value between 0 and 100 to a value between 0 and 560
     * this is necessary to match the bars' height to the scaled y-axis
     */
    const scaleY = d3.scaleLinear()
        .range([20, 580]) // 560 = ymax - ymin (see scaleY in axesWithD3())
        .domain([0, 100]);
    return scaleY;
}

/**
 * Draws the axes using d3.js which takes care of some of the finicky stuff for us.
 */
function axesWithD3() {
    const svg = d3.select("svg"); // select the "canvas" svg created by two.js to manipulate it

    const labels = ["A", "B", "C", "D", "E"]; // labels for the bars

    //canvas element has height of 600, and width of 900
    //We will draw the axes 20 pixels offset on all sides in the canvas so there is space for labels.


    //domain and range are standard function descriptions of "f(x) = y". x is the domain, y is the range. 

    // create the scales for the axes
    const scaleY = d3
        .scaleLinear() //Use a linear scale. 
        .domain([0, 100]) //our bars have values between 0 and 100.
        .range([580, 20]); //range reversed so f(0) is at the bottom. Remove 20 from both side to not cut of any labels

    const scaleX = d3
        .scaleBand() // scale that divides the range into n samesized bands, n being the size of the given array
        .domain(labels) //Domain of the function are our labels
        .range([20, 880]); //We plot the x-values of our bars between 20 and 880.



    // create the axes
    const x_axis = d3.axisBottom(scaleX);

    const y_axis = d3.axisLeft(scaleY);

    svg.append("g") //append a "group" element to the svg for organisation
        .attr("transform", "translate(10, 580)") // move axis to the bottom. Starting at 10 to leave space for labels.
        .call(x_axis); //actually add the axis. Note: d3.axisBottom(scaleX) is a function for this reason so that it can be called in this way.

    svg.append("g")
        .attr("transform", "translate(30, 0)") //move axis to the left side. Starting at 30 to leave space for labels
        .call(y_axis);
}