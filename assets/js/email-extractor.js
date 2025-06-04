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

function copyOutput() {
    const output = document.getElementById('output').textContent;
    const message = document.getElementById('copyMessage');

    if (!output || output === "No email addresses found.") {
        message.textContent = "Nothing to copy.";
        message.style.color = "red";
        setTimeout(() => { message.textContent = ""; }, 2000);
        return;
    }

    navigator.clipboard.writeText(output).then(() => {
        message.textContent = "Copied!";
        message.style.color = "green";
        setTimeout(() => { message.textContent = ""; }, 2000);
    }).catch(err => {
        message.textContent = "Copy failed.";
        message.style.color = "red";
        setTimeout(() => { message.textContent = ""; }, 2000);
    });
}
