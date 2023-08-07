//Need to fix globa variable keyPressed, if test section added in here will need to use class based, object
//literal may only be possible for user authentication
//will work on authentication portion and login page now and come back to fix this
//for now correct word is tracker  and you are able to type.
let keysPressed = "";
//This is an async funcion that fetches JSON data from a URL
async function fetchWordTypeJson() {
    try {
        const response = await fetch('/assets/WordTypes.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Word Type Fetch Error: ', error);
        return null;
    }
}
//This is a function that returns a random value from a JSON file
function getRandomJsonType(type) {
    return fetchWordTypeJson().then((data) => {
        if (data && data[type] && data[type].length > 0) {
            const randomIndex = Math.floor(Math.random() * data[type].length);
            const randomType = data[type][randomIndex];
            console.log('Random noun:', randomType);
            return randomType;
        } else {
            console.error('Invalid wordtype data format or no nouns found');
        }
    });
}
//This function creates a long sentence from JSON data
async function create_sentence() {
    let new_sentence = "";
    const w_type = ["nouns", "determiners", "verbs", "adjectives", "adverbs", "prepositions"];
    for (let i = 0; i < 25; i++) {
        const new_word = await getRandomJsonType(w_type[Math.floor(Math.random() * w_type.length)]);
        new_sentence += new_word + " ";
    }
    return new_sentence;
}
//This function clears the textarea on reload/load of page
function clearTextArea() {
    const text_area = document.getElementById('typing-area');
    text_area.value = "";
  }
//This function handles key events accordingly
function handleKeyEvent(e) {
    if (e.ctrlKey && e.key =='a') {
        e.preventDefault();
    } else {
        const keyName = e.key;
        keysPressed += keyName
    }
    const keyName = e.key;
    keysPressed += keyName;
}
//This function handles user input in the textarea
function handleKeyInput() {
    state = true;
    const t_area = document.getElementById('typing-area');
    const custom_text = document.getElementById("custom-text");
    const userInput = t_area.value;
    const expectedInput = custom_text.innerText;
    let resultHTML = "";
    for (let i = 0; i < expectedInput.length; i++) {
        if(i >= userInput.length) {
            resultHTML += `<span style="color: black">${expectedInput[i]}</span>`;
        } else if (expectedInput[i] === userInput[i]) {
            resultHTML += `<span style="color: green">${expectedInput[i]}</span>`;
        } else {
            resultHTML += `<span style="color: red">${expectedInput[i]}</span>`;
        }
    }
    custom_text.innerHTML = resultHTML;
    updateTime();
}
function updateTime() {
    t_span = document.getElementsByClassName('time');
    a_span = document.getElementsByClassName('accuracy');
    let seconds = 45;
    const timeInterval = setInterval(() => {
        seconds--;
        if (seconds >= 0) {
            t_span.textContent = "Time: " + seconds.toString();
        }
    }, 1000);
}
//This is the main function where the code is executed
async function main() {
    clearTextArea();
    const words_to_type = await create_sentence();
    const t_area = document.getElementById('typing-area');
    const t_content = words_to_type.substring(0, 120);
    const custom_text = document.getElementById("custom-text");
    custom_text.textContent = t_content;
    t_area.addEventListener('keydown', handleKeyEvent);
    t_area.addEventListener('input', handleKeyInput);
}
main();
