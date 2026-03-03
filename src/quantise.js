export default function quantise(note, scale) {
    // pitch quantiser 
    let scaleArray = []
    let scales = {
        minor: [0, 2, 3, 5, 7, 8, 10],
        major: [0, 2, 4, 5, 7, 9, 11],
        dorian: [0, 2, 3, 5, 7, 9, 10],
        mixolydian: [0, 2, 4, 5, 7, 9, 10],
        lydian: [0, 2, 4, 6, 7, 9, 11],
        minorpentatonic: [0, 2, 3, 7, 8],
        majorpentatonic: [0, 2, 4, 5, 7, 9, 11],
    }
    // load correct array up
    scaleArray = scales[scale]
    // if the note is in the scale pass direct to output
    if (scaleArray.includes(note)) {
        return note;
    } else {

    let octave = Math.floor(note / 12)
    let ratio =  12 / scaleArray.length
    note %= 12
    let pitch = scaleArray[Math.floor(note / ratio)]
    return pitch + octave * 12
    }
}