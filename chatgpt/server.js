import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  organization: '',
  apiKey: '',
});

const openai = new OpenAIApi(configuration);

app.post('/', async (req, res) => {
  const { messages } = req.body;
  console.log(messages);
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are SnapGPT - a helpful assistant. You receive text from OCR of an image provided by the user. The first message you receive will follow the format: Extracted text: {extracted text}. {user input}. If the extracted text reads "Extracted text will appear here", then the user has not uploaded an image yet.',
      },
      ...messages,
    ],
  });

  res.json({
    completion: completion.data.choices[0].message.content,
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
