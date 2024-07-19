export type ChatMessage = {
    id: string;
    chatId: string;
    senderId: string;
    receiverId: string;
    type: MessageType;
    content: string;
    isSeen: boolean;
    isGroup: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt?: Date;
};

export type AddMessage = Omit<ChatMessage, "id" | "isSeen" | "isDeleted">; 
export enum MessageType {
    TEXT,
    IMAGE,
}
  