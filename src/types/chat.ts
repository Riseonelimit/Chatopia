export type ChatMessage = {
    chatId: string;
    senderId: string;
    receiverId: string;
    userName: string;
    type: MessageType;
    content: string;
    isGroup: boolean;
};

export enum MessageType {
    TEXT,
    IMAGE,
}
  