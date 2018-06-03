import {promisify} from "actions";

export const TYPE = "MESSENGER";
export const MESSENGER = {
    ALLOC: `${TYPE}_ALLOC`,
    DEALLOC: `${TYPE}_DEALLOC`,
    SAID: `${TYPE}_SAID`,
    HEARD: `${TYPE}_HEARD`,
    BYE: `${TYPE}_BYE`
};

export const alloc = promisify(MESSENGER.ALLOC);
export const dealloc = promisify(MESSENGER.DEALLOC);
export const said = promisify(MESSENGER.SAID);
export const heard = promisify(MESSENGER.HEARD);
export const bye = promisify(MESSENGER.BYE);