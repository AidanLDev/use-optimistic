import { useOptimistic, useRef } from "react";
import { IMessage } from "../types/types";
import { IoCheckmarkDone, IoCheckmark } from "react-icons/io5";

interface IMessengerContainer {
  messages: IMessage[];
  sendMessage: (formData: FormData) => Promise<void>;
}

export default function MessengerContainer({
  messages,
  sendMessage,
}: IMessengerContainer) {
  const formRef = useRef<HTMLFormElement>(null);

  async function formAction(formData: FormData) {
    addOptimisticMessage(formData.get("message") as string);
    if (formRef.current) {
      formRef.current.reset();
    }
    await sendMessage(formData);
  }

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  return (
    <>
      {optimisticMessages.map((message: IMessage, idx: number) => (
        <div key={idx}>
          {message.text}
          {!!message.sending && idx === optimisticMessages.length - 1 && (
            <IoCheckmark size={20} />
          )}
          {!!message.sent && idx === optimisticMessages.length - 1 && (
            <IoCheckmarkDone size={20} />
          )}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="new message..." />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
