document.addEventListener('DOMContentLoaded', function () {
  const pasteImageBox = document.getElementById('pasteImageBox');
  const extractedText = document.getElementById('extractedText');
  let pasteImageBoxFocused = false;
  const userInput = document.getElementById('userInput');
  const chatLog = document.getElementById('chatLog');

  // Placeholder logic for the pasteImageBox
  pasteImageBox.addEventListener('focus', function () {
    if (pasteImageBox.innerHTML === pasteImageBox.dataset.placeholder) {
      pasteImageBox.innerHTML = '';
      pasteImageBox.style.color = '#000';
    }
    pasteImageBox.style.borderColor = '#777';
  });

  pasteImageBox.addEventListener('blur', function () {
    if (pasteImageBox.innerHTML.trim() === '') {
      pasteImageBox.innerHTML = pasteImageBox.dataset.placeholder;
      pasteImageBox.style.color = '#aaa';
    }
    pasteImageBox.style.borderColor = '#555';
  });

  // Handle the mousedown event to highlight the box
  pasteImageBox.addEventListener('mousedown', function () {
    if (!pasteImageBoxFocused) {
      pasteImageBox.style.borderColor = '#777';
      pasteImageBoxFocused = true;
    }
  });

  // Handle the mouseup event to unhighlight the box
  window.addEventListener('mouseup', function () {
    if (pasteImageBoxFocused) {
      pasteImageBox.style.borderColor = '#555';
      pasteImageBoxFocused = false;
    }
  });

  // Initialize the placeholder
  pasteImageBox.innerHTML = pasteImageBox.dataset.placeholder;
  pasteImageBox.style.color = '#aaa';

  // Handle paste event and display the image as a thumbnail

  pasteImageBox.addEventListener('paste', function (event) {
    let items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    for (let index in items) {
      let item = items[index];
      if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
        let blob = item.getAsFile();
        let reader = new FileReader();
        reader.onload = function (event) {
          let pastedImage = new Image();
          pastedImage.src = event.target.result;
          pastedImage.style.maxWidth = '100%';
          pastedImage.style.maxHeight = '100%';

          pastedImage.addEventListener('load', function () {
            pasteImageBox.innerHTML = '';
            pasteImageBox.appendChild(pastedImage);
            updateExtractedTextHeight();

            // Send the pasted image to the server
            sendImageToServer(event.target.result);
          });
        };
        reader.readAsDataURL(blob);
      }
    }
  });

  // Function to update the height of the extractedText box
  function updateExtractedTextHeight() {
    extractedText.style.height = `${pasteImageBox.offsetHeight}px`;
  }

  // Initial height adjustment
  updateExtractedTextHeight();

  // Update the height of the extractedText box when the window is resized
  window.addEventListener('resize', updateExtractedTextHeight);

  function sendImageToServer(imageDataURL) {
    const imageBlob = dataURLToBlob(imageDataURL);
    const formData = new FormData();
    formData.append('file', imageBlob);

    // Display "Loading..." in the extracted text box
    const extractedTextBox = document.getElementById('extractedText');
    extractedTextBox.value = 'Loading...';

    fetch('', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        // Update the extracted text box with the response data
        extractedTextBox.value = data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Helper function to convert a data URL to a Blob
  function dataURLToBlob(dataURL) {
    const binary = atob(dataURL.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/png' });
  }

  function updateChat(sender, message) {
    const chatLog = document.getElementById('chatLog');
    chatLog.innerHTML += `<div class="${
      sender === 'user' ? 'user-message' : 'gpt-message'
    }">${sender.toUpperCase()}: ${message}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  let isFirstMessage = true;
  let messageHistory = [];

  function sendMessage() {
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value.trim();

    if (!userMessage) {
      return;
    }

    if (isFirstMessage) {
      const extractedText = document.getElementById('extractedText').value;
      const messageContent = `Extracted text: "${extractedText}". ${userMessage}.`;
      messageHistory.push({ role: 'user', content: messageContent });
      isFirstMessage = false;
    } else {
      messageHistory.push({ role: 'user', content: userMessage });
    }

    updateChat('user', userMessage);
    updateChat('chatgpt', 'Thinking...');

    let thinkingMessage = document.querySelector('.gpt-message:last-child');

    chrome.runtime.sendMessage(
      {
        type: 'openaiRequest',
        body: messageHistory,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }

        thinkingMessage.remove();
        updateChat('chatgpt', response);
        messageHistory.push({ role: 'assistant', content: response });
      }
    );

    userInput.value = '';
  }

  userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });

  sendButton.addEventListener('click', () => {
    sendMessage();
  });

  // ...
});
