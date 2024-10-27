import { useOptimistic, useRef } from "react";
import { IMessage } from "../types/types";

interface IMessengerContainer {
  messages: IMessage[]
  sendMessage: (formData: FormData) => Promise<void>;
}

export default function MessengerContainer({ messages, sendMessage }: IMessengerContainer) {
  const formRef = useRef(null);

  async function formAction(formData: FormData) {
    addOptimisticMessage(formData.get("message") as string);
    formRef.current.reset();
    await sendMessage(formData);
  }

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  messages,
  (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true
      }
    ]
  );

  return (
    <>
      {optimisticMessages.map((message: IMessage, idx: number) => (
        <div key={idx}>
          {message.text}
          {!!message.sending && <small>(sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="new message..." />
        <button type="submit">Send</button>
      </form>
    </>
  )
}
