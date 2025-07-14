async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (!message) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class='user'><strong>You:</strong> ${message}</div>`;

    const response = await fetch("https://indian-buddy.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    });

    const data = await response.json();
    chatBox.innerHTML += `<div class='bot'><strong>Indian Buddy:</strong> ${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = "";
}

function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function(event) {
        document.getElementById("userInput").value = event.results[0][0].transcript;
        sendMessage();
    }

    recognition.onerror = function(event) {
        alert('Speech recognition error: ' + event.error);
    }

    recognition.start();
}