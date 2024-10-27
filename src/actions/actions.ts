export async function deliverMessage(message: string) {
  await new Promise((res) => setTimeout(res, 1500));
  return message;
}
