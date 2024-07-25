export interface User {
    id: string;
    name: string | null | undefined;
    email: string | undefined;
    createdAt?: Date;
    updatedAt?: Date;

    Profile: Profile;
}

export interface Profile {
    id: string;
    about?: string;
    image?: string | undefined;
    theme: THEME;
}
export type InsertUser = Omit<User, "id" | "Profile"> & {
    Profile: Omit<Profile, "id">;
};
export type UserFriends = {
    friend: User;
};
export type UserSearchList = Pick<User, "name" | "id" | "Profile"> & {
    Profile: Pick<Profile, "image">;
};

export interface CurrentChatUser extends User {
    isOnline: boolean | undefined;
}

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

export enum THEME {
    DEFAULT = "DEFAULT",
    EMERALD = "EMERALD",
    PINK = "PINK",
    MOCHA = "MOCHA",
    DARK = "DARK",
}
