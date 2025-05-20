function extractEmails() {
    const inputText = document.getElementById('textInput').value;
    const regex = /(?:\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/g;
    let matches = inputText.match(regex);
    if (matches) {
        // Remove duplicates
        const uniqueMatches = [...new Set(matches.map(email => email.toLowerCase()))];
        document.getElementById('output').textContent = uniqueMatches.join('; ');
    } else {
        document.getElementById('output').textContent = "No email addresses found.";
    }
}

function clearInput() {
    document.getElementById('textInput').value = "";
    document.getElementById('output').textContent = "";
}