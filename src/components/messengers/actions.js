import {promisify} from "actions";

export const TYPE = "MESSENGER";
export const MESSENGER = {
    ALLOC: `${TYPE}_ALLOC`,
    DEALLOC: `${TYPE}_DEALLOC`,
    SPEAK: `${TYPE}_SPEAK`,
    HEAR: `${TYPE}_HEAR`
};

export const alloc = promisify(MESSENGER.ALLOC);
export const dealloc = promisify(MESSENGER.DEALLOC);
export const speak = promisify(MESSENGER.SPEAK);
export const hear = promisify(MESSENGER.HEAR);