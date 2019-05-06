require("babel-core/register");
require("babel-polyfill");
const speechCommands = require('@tensorflow-models/speech-commands');

let recognizer;

function calculateNewPosition(positionx, positiony, direction)
{
    return {
        'up' : [positionx, positiony - 10],
        'down': [positionx, positiony + 10],
        'left' : [positionx - 10, positiony],
        'right' : [positionx + 10, positiony],
        'default': [positionx, positiony]
    }[direction];
}

function predict(context, positionx, positiony) {
    const words = recognizer.wordLabels();
    recognizer.listen(({scores}) => {
        scores = Array.from(scores).map(
            (s, i) => ({score: s, word: words[i]})
        );
        console.log(scores);
        // sort in order to the greatness...
        scores.sort((score1, score2) => score2.score - score1.score);

        // the biggest score is on the top, so get the first item
        let direction = scores[0].word;
        let [x1, y1] = calculateNewPosition(positionx, positiony, direction);

        // context update
        context.moveTo(positionx,positiony);
        context.lineTo(x1, y1);
        context.closePath();
        context.stroke();
        positionx = x1;
        positiony = y1;
    }, {probabilityThreshold: 0.99});
}

const run = async () => {
    recognizer = speechCommands.create('BROWSER_FFT', 'directional4w');
    await recognizer.ensureModelLoaded();

    // Create canvas for drawing and center the drawer
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let positionx = 400; // Since canvas width set to 800px
    let positiony = 300; // Since canvas height set to 600px

    context.lineWidth = 10;
    context.lineJoin = 'round';
    predict(context, positionx, positiony);
};


// kick off
run();