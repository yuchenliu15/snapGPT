import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: 'org-QG7cGZTlZ117MUPirGO6D5m1',
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'What is your role?' },
  ],
});

console.log(completion.data.choices[0].message.content);
