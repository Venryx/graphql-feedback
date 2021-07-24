var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { GetProposal } from "../db/proposals.js";
import { makeObservable, observable } from "mobx";
import { CreateAccessor } from "mobx-graphlink";
import { graph } from "../../Utils/Database/MobXGraphlink.js";
export class ProposalsState {
    constructor() {
        Object.defineProperty(this, "selectedProposalID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "features_showCompleted", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "issues_showCompleted", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        makeObservable(this);
    }
}
__decorate([
    observable
], ProposalsState.prototype, "selectedProposalID", void 0);
__decorate([
    observable
], ProposalsState.prototype, "features_showCompleted", void 0);
__decorate([
    observable
], ProposalsState.prototype, "issues_showCompleted", void 0);
export const GetSelectedProposalID = CreateAccessor({ graph }, function () {
    return this["store"].main.proposals.selectedProposalID;
});
export const GetSelectedProposal = CreateAccessor({ graph }, () => {
    let selectedID = GetSelectedProposalID();
    return GetProposal(selectedID);
});
