var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { makeObservable, observable } from "mobx";
import { Proposals } from "./main/proposals.js";
export class MainState {
    constructor() {
        Object.defineProperty(this, "proposals", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Proposals()
        });
        makeObservable(this);
    }
}
__decorate([
    observable
], MainState.prototype, "proposals", void 0);
