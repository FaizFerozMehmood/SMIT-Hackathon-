import { v4 as uuidv4 } from "uuid";

export const generateToken = (department) => {
    return `${department}-${uuidv4().slice(0, 8)}`;
};
