// Elements
const startBtn = document.querySelector("#start");
const endBtn = document.querySelector("#stop");
let speakBtn = document.querySelector("#speak");


const speechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new speechRecognition();
// recognition.lang = 'hi-IN';

recognition.onstart = function () {
    readOut("Hii Sir,tell me what can i do for you");
    console.log("Recognition Activated");
}

// speaking out users input 
recognition.onresult = (event) => {
    // console.log(event);
    // let current=event.resultIndex;
    let transcript = event.results[0][0].transcript;
    // readOut(transcript);
    var userInput = transcript.toLowerCase();
    console.log(transcript);
    var stringsToCheckGreetings = ["hii", "hello", "hey", "friday", "good", "hi"];
    // var stringsToOpenWebs = ["open", "youtube"];
    if (stringsToCheckGreetings.some(substring => userInput.includes(substring))) {
        readOut("Hellow Sir, tell me what can i do for you ");
    }

    // Open Youtube 
    if (userInput.includes("open youtube") || userInput.includes("start youtube")) {
        readOut("Opening youtube, sir");
        window.open("https://www.youtube.com/");
    }
    // play song in youtube
    if (userInput.includes("play music") || userInput.includes("start music ") || userInput.includes("play song ") || userInput.includes("start song ")) {
        readOut("Playing music on youtube, sir ");
        window.open("https://www.youtube.com/watch?v=1cjh7Gpwgzc");
        console.log("opened");
        recognition.stop();
    }
    // Youtube Search
    // if (userInput.includes("search youtube")) {
    //     let userSearch = findQuery(userInput);
    //     readOut(`Searching ${userSearch} on youtube`);
    //     // setTimeout(() => {
    //     window.open(`https://www.google.com/search?q=${userSearch}`);
    // }

    // Open Google
    if (userInput.includes("open google")) {
        readOut("Opening Google, sir");
        window.open("https://www.google.com/");
    }
    // Google Search 
    if (userInput.includes("search")) {
        let userSearch = findQuery(userInput);
        readOut(`Searching ${userSearch} on google`);
        // setTimeout(() => {
        window.open(`https://www.google.com/search?q=${userSearch}`);
        // }, 1000);
    }



}

recognition.onend = () => {
    console.log("Recognition Deactivated");
}

recognition.continuous = true;

startBtn.addEventListener("click", () => {
    recognition.start();
})
endBtn.addEventListener("click", () => {
    recognition.stop();
});


// Assistant Speech
var readOut = (message) => {
    const speech = new SpeechSynthesisUtterance();
    // different sound
    const allVoices = speechSynthesis.getVoices();
    speech.text = message;
    speech.rate = 0.9;
    // speech.voice=
    speech.voice = allVoices[7];
    // speech.volume = 1;
    speech.pitch = 1.2;
    window.speechSynthesis.speak(speech);
    console.log("Speaking out");
}

// speakBtn.addEventListener("click", () => {
//     readOut("Heyyy ,jimmy ,tell me what can i do for you");
// });

window.onload = function () {
    readOut(" ");
}



// UserDefined Functions 
var findQuery = (input) => {
    let result = input.replace(/search|google|youtube|in|on/gi, "");
    console.log(result);
    return result;
}




// Elements
// const startBtn = document.querySelector("#start");
// const endBtn = document.querySelector("#stop");

// const speechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
// const recognition = new speechRecognition();

// // Recognition settings
// recognition.continuous = true; // Keeps recognition active for multiple commands
// recognition.interimResults = false;

// recognition.onstart = () => {
//     console.log("Recognition Activated");
// };

// recognition.onresult = (event) => {
//     let transcript = event.results[0][0].transcript.toLowerCase();
//     console.log("User said:", transcript);

//     // Pause recognition while processing command
//     recognition.stop();

//     processCommand(transcript);
// };

// // Restart recognition when it stops
// recognition.onend = () => {
//     console.log("Recognition Deactivated");
//     // Automatically restart unless explicitly stopped
//     if (!manualStop) {
//         recognition.start();
//     }
// };

// let manualStop = false;

// startBtn.addEventListener("click", () => {
//     manualStop = false;
//     recognition.start();
//     console.log("Started Listening");
// });

// endBtn.addEventListener("click", () => {
//     manualStop = true;
//     recognition.stop();
//     console.log("Stopped Listening");
// });

// // Assistant Speech
// const readOut = (message, callback) => {
//     const speech = new SpeechSynthesisUtterance(message);
//     const allVoices = window.speechSynthesis.getVoices();

//     if (allVoices.length > 0) {
//         speech.voice = allVoices[0]; // Use the first voice as a fallback
//     }

//     speech.rate = 0.9;
//     speech.pitch = 1.2;

//     speech.onend = () => {
//         console.log("Finished speaking:", message);
//         if (callback) callback();
//     };

//     window.speechSynthesis.speak(speech);
//     console.log("Speaking:", message);
// };

// // Process Commands
// const processCommand = (transcript) => {
//     const greetings = ["hii", "hello", "hey", "friday", "good", "hi"];
//     if (greetings.some((word) => transcript.includes(word))) {
//         readOut("Hello Sir, tell me what I can do for you.", () => {
//             recognition.start(); // Resume listening
//         });
//         return;
//     }

//     if (transcript.includes("open youtube") || transcript.includes("start youtube")) {
//         readOut("Opening YouTube, Sir.", () => {
//             window.open("https://www.youtube.com/");
//             recognition.start();
//         });
//         return;
//     }

//     if (
//         transcript.includes("play music") ||
//         transcript.includes("start music") ||
//         transcript.includes("play song") ||
//         transcript.includes("start song")
//     ) {
//         readOut("Playing music on YouTube, Sir.", () => {
//             window.open("https://www.youtube.com/watch?v=1cjh7Gpwgzc");
//             recognition.start();
//         });
//         return;
//     }

//     if (transcript.includes("open google")) {
//         readOut("Opening Google, Sir.", () => {
//             window.open("https://www.google.com/");
//             recognition.start();
//         });
//         return;
//     }

//     if (transcript.includes("search")) {
//         let userSearch = findQuery(transcript);
//         readOut(`Searching ${userSearch} on Google.`, () => {
//             window.open(`https://www.google.com/search?q=${userSearch}`);
//             recognition.start();
//         });
//         return;
//     }

//     // Fallback response
//     readOut("I didn't understand that. Could you please repeat?", () => {
//         recognition.start();
//     });
// };

// // Helper Functions
// const findQuery = (input) => {
//     return input.replace(/search|google|youtube|in|on/gi, "").trim();
// };

// // Ensure voices are loaded
// window.speechSynthesis.onvoiceschanged = () => {
//     console.log("Voices Loaded");
// };

// window.onload = () => {
//     readOut("Hey, I am ready to assist you!");
// };
