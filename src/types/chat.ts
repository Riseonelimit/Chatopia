import { Profile, User } from "./user";

export interface Chat {
    id: string;
    isGroup: boolean;
    groupName: string;
    chatIcon: string;
    lastMessageId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isTyping?: boolean | false;
    participants: Omit<User[], "createdAt" | "updatedAt" | "Profile"> & {
        Profile: Pick<Profile, "image">;
    };
}

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
    sender: Pick<User, "name"> & { Profile: Pick<Profile, "image"> };
};

export type AddMessage = Omit<ChatMessage, "id" | "isSeen" | "isDeleted">;

export enum MessageType {
    TEXT,
    IMAGE,
}

export enum BoxType {
    ADD_FRIEND = "ADD_FRIEND",
    REMOVE_FRIEND = "REMOVE_FRIEND",
    CREATE_GROUP = "CREATE_GROUP",
}
