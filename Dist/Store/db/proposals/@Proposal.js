var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CE } from "js-vextensions";
import { DB, Field, MGLClass } from "mobx-graphlink";
let Proposal = class Proposal {
    constructor(initialData) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "creator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "createdAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "editedAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "completedAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        CE(this).Extend(initialData);
    }
};
__decorate([
    DB((t, n) => t.text(n).primary()),
    Field({ $ref: "UUID" }, { opt: true })
], Proposal.prototype, "id", void 0);
__decorate([
    DB((t, n) => t.text(n)),
    Field({ type: "string" })
], Proposal.prototype, "type", void 0);
__decorate([
    DB((t, n) => t.text(n)),
    Field({ type: "string" })
], Proposal.prototype, "title", void 0);
__decorate([
    DB((t, n) => t.text(n)),
    Field({ type: "string" })
], Proposal.prototype, "text", void 0);
__decorate([
    DB((t, n) => t.text(n).references("id").inTable(`users`).DeferRef()),
    Field({ type: "string" }, { opt: true })
], Proposal.prototype, "creator", void 0);
__decorate([
    DB((t, n) => t.bigInteger(n)),
    Field({ type: "number" }, { opt: true })
], Proposal.prototype, "createdAt", void 0);
__decorate([
    DB((t, n) => t.bigInteger(n).nullable()),
    Field({ type: "number" }, { opt: true })
], Proposal.prototype, "editedAt", void 0);
__decorate([
    DB((t, n) => t.bigInteger(n).nullable()),
    Field({ type: "number" }, { opt: true })
], Proposal.prototype, "completedAt", void 0);
Proposal = __decorate([
    MGLClass({ table: "feedback_proposals" })
], Proposal);
export { Proposal };
