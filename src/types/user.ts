export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    Profile?: Profile;
}

export interface CurrentChatUser extends User {
    isOnline: boolean | undefined;
}

export interface Profile {
    id: string;
    about: string;
    image: string;
    theme: THEME;
}

enum THEME {
    LIGHT,
    DARK,
    SYSTEM,
}
