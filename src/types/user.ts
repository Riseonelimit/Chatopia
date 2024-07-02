export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    Profile?: Profile;
}

export interface Profile {
    id: string;
    about: string;
    image: string;
    theme: THEME;
}
export interface CurrentChatUser extends User {
    isOnline: boolean | undefined;
}


enum THEME {
    LIGHT,
    DARK,
    SYSTEM,
}
