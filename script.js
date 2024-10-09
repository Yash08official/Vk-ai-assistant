
let btn = document.querySelector("#btn"); // Button to start speech recognition
let content = document.querySelector("#content"); // Area to display recognized speech
let voice = document.querySelector("#voice"); // Element to show voice feedback

// Function to convert text to speech
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text); // Create a new speech synthesis object
  text_speak.rate = 1; // Set the speech rate
  text_speak.pitch = 1; // Set the pitch of the voice
  text_speak.volume = 1; // Set the volume of the speech
  text_speak.lang = "hi-GB"; // Set the language to Hindi (British)
  window.speechSynthesis.speak(text_speak); // Speak the text
}

// Function to wish the user based on the current time
function wishMe() {
  let day = new Date(); // Get the current date and time
  let hours = day.getHours(); // Extract the current hour
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir"); // Morning greeting
  } else if (hours >= 12 && hours < 16) {
    speak("Good afternoon Sir"); // Afternoon greeting
  } else {
    speak("Good Evening Sir"); // Evening greeting
  }
}

// Uncomment the following line to wish the user on page load
// window.addEventListener('load',()=>{ wishMe() });

// Set up speech recognition
let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition; // Check for speech recognition support
let recognition = new speechRecognition(); // Create a new instance of speech recognition
recognition.onresult = (event) => { // Handle the result of speech recognition
  let currentIndex = event.resultIndex; // Get the current result index
  let transcript = event.results[currentIndex][0].transcript; // Get the recognized text
  content.innerText = transcript; // Display the recognized text
  takeCommand(transcript.toLowerCase()); // Process the recognized command
};

// Event listener for the button to start recognition
btn.addEventListener("click", () => {
  recognition.start(); // Start speech recognition
  voice.style.display = "block"; // Show voice feedback element
  btn.style.display = "none"; // Hide the button
});

// Function to process the recognized command
function takeCommand(message) {
  voice.style.display = "none"; // Hide voice feedback element
  btn.style.display = "flex"; // Show the button again
  // Check for specific commands and respond accordingly
  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")
  ) {
    speak("hello sir, what can I help you?"); // Respond to greetings
  } else if (message.includes("who are you")) {
    speak(
      "I am virtual assistant Vk, created by Yash Wasankar" // Introduce the assistant
    );
  } else if (message.includes("open youtube")) {
    speak("opening youtube..."); // Respond and open YouTube
    window.open("https://youtube.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("opening google..."); // Respond and open Google
    window.open("https://google.com/", "_blank");
  } else if (message.includes("open facebook")) {
    speak("opening facebook..."); // Respond and open Facebook
    window.open("https://facebook.com/", "_blank");
  } else if (message.includes("open instagram")) {
    speak("opening instagram..."); // Respond and open Instagram
    window.open("https://instagram.com/", "_blank");
  } else if (message.includes("open calculator")) {
    speak("opening calculator.."); // Respond and open calculator
    window.open("calculator://");
  } else if (message.includes("open whatsapp")) {
    speak("opening whatsapp.."); // Respond and open WhatsApp
    window.open("whatsapp://");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(time); // Speak the current time
  } else if (message.includes("date")) {
    let date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
    });
    speak(date); // Speak the current date
  }
  // Uncomment the following block to respond to "thank you"
  // else if (message.includes("thank you")) {
  //   speak("You're welcome! If you need anything else, feel free to ask!");
  // }

  // If the command is not recognized, search the internet
  else {
    let finalText =
      "This is what I found on the internet regarding " +
      message.replace("Vk.", "") || message.replace("Vk.", "");
    speak(finalText); // Speak a generic response
    window.open(
      `https://www.google.com/search?q=${message.replace("Vk.", "")}`,
      "_blank" // Open a Google search for the query
    );
  }
}
