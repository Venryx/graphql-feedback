import { manager } from "../../Manager";
export class LogTypes {
    constructor() {
        this.commands = false;
    }
}
export function ShouldLog(shouldLogFunc) {
    return shouldLogFunc(manager.logTypes || {});
}
export function MaybeLog(shouldLogFunc, logMessageGetter) {
    if (!ShouldLog(shouldLogFunc))
        return;
    console.log(logMessageGetter());
}
