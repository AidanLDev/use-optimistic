import { useState } from 'react';
import MessengerContainer from "./components/MessengerContainer"
import { deliverMessage } from "./actions/actions"
import { IMessage } from "./types/types"

import './App.css';

function App() {
  const [messages, setMessages] = useState<IMessage[]>([
    { text: "Hello!", sending: false, key: 1 }
  ])

  async function sendMessage(formData: FormData) {
    const sentMessage = await deliverMessage(formData.get("message") as string);
    if (sentMessage) {
      setMessages(messages => [...messages, { text: sentMessage, sending: false, sent: true }])
    }
  }
  return (
    <div className="App">
      <h1>useOptimistic Example</h1>
      <MessengerContainer messages={messages} sendMessage={sendMessage} />
    </div>
  );
}

export default App;
