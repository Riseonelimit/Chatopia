export interface User {
    id: string;
    name: string | null | undefined;
    email: string | undefined;
    createdAt?: Date;
    updatedAt?: Date;

    Profile: Profile;
}

export interface Profile {
    id?: string;
    about?: string;
    image: string | undefined;
    theme: THEME;
}
export type UserSearchList = Pick<User, "name" | "id"> & {
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
    participants: Omit<User[], "createdAt" | "updatedAt" | "Profile"> & {
        Profile: Pick<Profile, "image">;
    };
}

export enum THEME {
    LIGHT,
    DARK,
    SYSTEM,
}
