import { User } from "../types/user";

export const filterCurrentUser = (
    participants: User[],
    userInfo: User | null
): User => {
    return participants[0].id == userInfo?.id
        ? participants[1]
        : participants[0];
};

export const getBase64 = (file: Blob) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
    });