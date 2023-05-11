# SnapGPT Browser Extension

SnapGPT is a browser extension that allows users to extract text from images using Optical Character Recognition (OCR) technology and communicate with an AI model (GPT-3.5-turbo) using a chat interface.

## Table of Contents

- [SnapGPT Browser Extension](#snapgpt-browser-extension)
  - [Table of Contents](#table-of-contents)
  - [Technical Overview](#technical-overview)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Code Structure](#code-structure)
    - [Prerequisites](#prerequisites)
    - [Local Express Server](#local-express-server)
  - [Example Commands](#example-commands)
  - [Observations](#observations)

## Technical Overview

This browser extension allows users to paste an image containing text into a small box within the extension's popup. It then sends the image to a backend server, which extracts the text from the image using Optical Character Recognition (OCR) technology. The extracted text is displayed in a separate text box within the extension's popup.

Additionally, the extension features a chat interface that enables users to communicate with an AI model (GPT-3.5-turbo). When users enter a message, the extension sends the message, along with any extracted text from the image, to the AI model via a local Express server. The server makes API calls to OpenAI to receive AI-generated responses. The chat interface displays both the user's messages and the AI's responses.

The extension also maintains a message history to provide context to the AI model, ensuring more accurate and relevant responses. The AI's first response includes the extracted text from the image, while subsequent responses are based on the ongoing conversation.

## Features

- Paste images containing text into the extension's popup
- Extract text from images using OCR technology
- Communicate with an AI model via a chat interface
- Display user messages and AI responses in the chat interface
- Maintain a message history for contextual AI responses

## Installation

1. Clone this repository to your local machine.

```
git clone https://github.com/yuchenliu15/SnapGPT.git
```

2. Open your browser's extension management page:

- For Google Chrome, go to `chrome://extensions/`.

1. Enable "Developer mode" (for Chrome).

2. Click on "Load unpacked" (for Chrome) and select the repository folder you cloned in step 1.

3. The SnapGPT extension should now be installed and visible in your browser's toolbar.

4. Add your OpenAI API key to `chatgpt/server.js`.

## Usage

1. Click on the SnapGPT extension icon in your browser's toolbar to open the popup.

2. Paste an image containing text into the "Paste Image" box. The extracted text will appear in the "Extracted Text" box.

3. Use the chat interface at the bottom of the popup to ask the AI questions or provide additional information. The AI will generate responses based on the extracted text and the ongoing conversation.

4. To start a new conversation, simply refresh the popup or close and reopen it.

## Code Structure

The repository is organized as follows:

- `backend`: Contains backend code for the extension.
- `ocr`: Contains OCR-related code for text extraction.
- `js`: Contains JavaScript files for the extension.
  - `popup.js`: The JavaScript logic for the extension's popup, including OCR, chat functionality, and communication with the background script.
  - `background.js`: The background script that sends requests to the Express server.
- `chatgpt`: Contains the code for the local Express server.
  - `server.js`: The Express server that handles communication with the OpenAI API.
- `popup.html`: The extension's popup layout.
- `manifest.json`: The manifest file that defines the extension's configuration, permissions, and resources.


### Prerequisites

- Node.js
- npm
- Express

### Local Express Server

To set up the local Express server, navigate to the `chatgpt` folder and install the required dependencies:

```
cd chatgpt
npm install
```

Then, start the server by running:

```
npm start
```

The server should now be running at `http://localhost:3000`.

## Example Commands

To execute the code, follow the [Installation](#installation) and [Usage](#usage) instructions. After installing the extension, click on the SnapGPT extension icon to open the popup, paste an image, and interact with the AI using the chat interface.

## Observations

We opted to use the express server for sending api requests and AWS Textract for OCR.
![image](https://github.com/yuchenliu15/snapGPT/assets/57072903/3f43d939-a21c-429e-bbe9-d32688a022a6)

