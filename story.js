const storyElement = document.getElementById("story-lines")

const keyMap = {
    "0": "30",
    "1": "31",
    "2": "32",
    "3": "33",
    "4": "34",
    "5": "35",
    "6": "36",
    "7": "37",
    "8": "38",
    "9": "39",
    "A": "41",
    "B": "42",
    "C": "43",
    "D": "44",
    "E": "45",
    "F": "46",
    "G": "47",
    "H": "48",
    "I": "49",
    "J": "4A",
    "K": "4B",
    "L": "4C",
    "M": "4D",
    "N": "4E",
    "O": "4F",
    "P": "50",
    "Q": "51",
    "R": "52",
    "S": "53",
    "T": "53",
    "U": "56",
    "V": "56",
    "W": "57",
    "X": "58",
    "Y": "58",
    "Z": "51",
    "+": "4F",
    ",": "0B",
    "-": "0B",
    ".": "4F",
}

const audioFilesMap = new Map()
Object.keys(keyMap).forEach(k => {
    const keyCode = keyMap[k].toLowerCase()
    audioFilesMap.set(k, {
        1: new Audio(`wav/${keyCode}-1.wav`),
        0: new Audio(`wav/${keyCode}-0.wav`)
    })
})


function playSound(char, down) {
    const audioFile = audioFilesMap.get(char.toUpperCase()) || audioFilesMap.get("A")
    if (down) {
        audioFile[0].play()
    } else {
        audioFile[1].play()
    }
}

let chatContent = ""

function getChatContent() {
    return chatContent
}

let isWriting = false

async function writeToChat(text) {
    while (isWriting) {
        await delay(100)
    }
    isWriting = true
    chatContent += text + "\n"
    for (char of text.split('')) {
        playSound(char, true)
        await delay(Math.random() * 2 * 10)
        if (char == "\n") {
            char = "<br>"
        }
        storyElement.innerHTML = storyElement.innerHTML + char
        playSound(char, false)
        await delay(Math.random() * 2 * 10)
    }
    storyElement.innerHTML = storyElement.innerHTML + "<br>"
    isWriting = false
    storyElement.scrollTop = storyElement.scrollHeight
}

function writeHtmlToChat(html) {
    storyElement.innerHTML = storyElement.innerHTML + html
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}