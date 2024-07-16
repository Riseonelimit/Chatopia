import { User } from "../types/user";

export const filterCurrentUser = (
    participants: User[],
    userInfo: User | null
): User => {
    return participants[0].id == userInfo?.id
        ? participants[1]
        : participants[0];
};
