// Elements
const startBtn = document.querySelector("#start");
const endBtn = document.querySelector("#stop");

// 1. Initialize Speech Recognition
const speechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

// Check for support
if (!speechRecognition) {
    alert("Speech Recognition is not supported in this browser. Please use Chrome or Edge.");
}
const recognition = new speechRecognition();

// language and others
recognition.lang = 'en-US';
recognition.continuous = true; // Stay active for longer inputs
recognition.interimResults = false; // Only return the final transcript

// manual stop
let manualStop = false;


// recognition events

recognition.onstart = () => {
    console.log("Recognition Activated (Listening...)");
}

recognition.onresult = (event) => {

    // console.log(event.results);
    // console.log(event.results[event.results.length - 1][0]);
    // console.log(event.results[event.results.length - 1][0].transcript);

    let transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("User said:", transcript);

    // CRUCIAL: Stop listening temporarily to process the command and speak the response.
    recognition.stop();

    // Process the command
    processCommand(transcript);
};

recognition.onend = () => {
    console.log("Recognition Deactivated");
    // If it was a voice command (not manualStop), the readOut callback handles the restart.
    if (!manualStop) {
        console.log("Waiting for assistant speech to end before restart...");
    }
};

recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
    // Restart listening after an error, unless manually stopped
    if (!manualStop && event.error !== 'not-allowed') { // not-allowed means permission was denied
        // Use a slight delay before trying to restart
        setTimeout(() => recognition.start(), 500);
    }
}

/**
 * Function to restart recognition after the assistant finishes speaking.
 */
const restartListening = () => {
    if (!manualStop) {
        // Check recognition state to prevent the InvalidStateError
        if (recognition.recognizing) {
            console.log("Listening already active, skipping restart.");
            return;
        }
        recognition.start();
        console.log("Listening resumed.");
    }
};

/**
 * Searches for a query by removing common command words.
 */
const findQuery = (input) => {
    // Remove command phrases to isolate the search term
    return input.replace(/search|google|youtube|in|on|for|what is|tell me about/gi, "").trim();
};


/**
 * Text-to-Speech (Assistant Speech) with a callback to restart listening.
 */
const readOut = (message, callback) => {
    const speech = new SpeechSynthesisUtterance(message);
    const allVoices = window.speechSynthesis.getVoices();

    // Try to select a specific voice
    if (allVoices.length > 7) {
        speech.voice = allVoices[7];
    } else if (allVoices.length > 0) {
        speech.voice = allVoices[0]; // Fallback
    }

    speech.rate = 0.9;
    speech.pitch = 1.2;

    speech.onend = () => {
        // restart listning after the assistant finishes speaking.
        if (callback) callback();
    };
    window.speechSynthesis.speak(speech);
    console.log("Speaking:", message);
};


/**
 * Handles all recognized user commands.
 */
const processCommand = (transcript) => {

    // Check for Greetings
    const greetings = ["hii", "hello", "hey", "friday", "good", "hi"];
    if (greetings.some((word) => transcript.includes(word))) {
        readOut("Hello Sir, tell me what can I do for you.", restartListening);
        return;
    }

    // Open YouTube
    if (transcript.includes("open youtube") || transcript.includes("start youtube")) {
        readOut("Opening YouTube, Sir.", () => {
            window.open("https://www.youtube.com/");
            restartListening();
        });
        return;
    }

    // Play Song in YouTube
    if (
        transcript.includes("play music") ||
        transcript.includes("start music") ||
        transcript.includes("play song") ||
        transcript.includes("start song")
    ) {
        readOut("Playing music on YouTube, Sir", () => {
            window.open("https://www.youtube.com/watch?v=0hS7ti5PS5A&list=RDMM&start_radio=1&rv=dQw4w9WgXcQ");
            restartListening();
        });
        return;
    }

    // Open Google
    if (transcript.includes("open google")) {
        readOut("Opening Google, Sir.", () => {
            window.open("https://www.google.com/");
            restartListening();
        });
        return;
    }

    // Google Search 
    if (transcript.includes("search for") || transcript.includes("search")) {
        let userSearch = findQuery(transcript);
        if (userSearch) {
            readOut(`Searching ${userSearch} on Google.`, () => {
                window.open(`https://www.google.com/search?q=${userSearch}`);
                restartListening();
            });
            return;
        }
    }

    // Unknown Command
    readOut("I didn't recognize that command. Please try again.", restartListening);
};


// 4. Button Event Listeners

startBtn.addEventListener("click", () => {
    manualStop = false;
    //  Checking the recognition state before starting to prevent the InvalidStateError
    if (recognition.recognizing) {
        console.log("Recognition is already running.");
        return;
    }
    recognition.start();
    // greeting to avoid speaking over the microphone activation sound
    setTimeout(() => {
        readOut("I ready to help you", () => { });
    }, 100);
});

endBtn.addEventListener("click", () => {
    manualStop = true;
    recognition.stop();
    readOut("Assistant is stopped. Click Start to resume.", () => { });
    console.log("Stopped Listening Manually");
});

// Initial setup to ensure voices are loaded for speech synthesis
window.onload = function () {
   
    window.speechSynthesis.getVoices();
    //  greeting 
    readOut("Hello, ready to start.", () => { });
};