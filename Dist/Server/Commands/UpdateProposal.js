var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CE, NN } from "js-vextensions";
import { AssertValidate, Command, CommandMeta, dbp, GetSchemaJSON, NewSchema, SimpleSchema } from "mobx-graphlink";
import { GetProposal } from "../../Store/db/proposals.js";
let MTName = "Proposal";
//@UserEdit
let UpdateProposal = class UpdateProposal extends Command {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "oldData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "newData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    Validate() {
        let { id, updates } = this.payload;
        this.oldData = NN(GetProposal(id));
        this.newData = { ...this.oldData, ...updates };
        AssertValidate(MTName, this.newData, `New ${MTName.toLowerCase()}-data invalid`);
    }
    DeclareDBUpdates(db) {
        let { id } = this.payload;
        db.set(dbp `feedback_proposals/${id}`, this.newData);
    }
};
UpdateProposal = __decorate([
    CommandMeta({
        payloadSchema: () => SimpleSchema({
            $id: { type: "string" },
            $updates: NewSchema({
                properties: CE(GetSchemaJSON(MTName).properties).IncludeKeys("title", "text", "completedAt"),
            }),
        }),
    })
], UpdateProposal);
export { UpdateProposal };
