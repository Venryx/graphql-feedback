var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DB, Field, MGLClass } from "mobx-graphlink";
let UserInfo = class UserInfo {
    constructor() {
        //proposalIndexes: ProposalIndexSet;
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // user-id
        Object.defineProperty(this, "proposalsOrder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
};
__decorate([
    DB((t, n) => t.text(n).primary()),
    Field({ $ref: "UUID" }, { opt: true })
], UserInfo.prototype, "id", void 0);
__decorate([
    DB((t, n) => t.text(n)),
    Field({ items: { $ref: "UUID" } })
], UserInfo.prototype, "proposalsOrder", void 0);
UserInfo = __decorate([
    MGLClass({ table: "feedback_userInfos" })
], UserInfo);
export { UserInfo };
