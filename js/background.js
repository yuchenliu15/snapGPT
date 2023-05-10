chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'openaiRequest') {
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: request.body }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.completion);
        sendResponse(data.completion);
      })
      .catch((error) => {
        console.error('Error:', error);
        sendResponse('An error occurred.');
      });

    return true; // Keeps the message channel open for async response
  }
});
