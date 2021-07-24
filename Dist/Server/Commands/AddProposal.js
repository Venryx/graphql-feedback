var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AssertValidate, Command, CommandMeta, dbp, SimpleSchema } from "mobx-graphlink";
import { Proposal } from "../../index.js";
let MTName = "Proposal";
//@UserEdit
let AddProposal = class AddProposal extends Command {
    Validate() {
        let { data } = this.payload;
        data.id = this.GenerateUUID_Once("id");
        data.creator = this.userInfo.id;
        data.createdAt = Date.now();
        //thread.editedAt = thread.createdAt;
        this.returnData = { id: data.id };
        AssertValidate(MTName, data, `${MTName} invalid`);
    }
    DeclareDBUpdates(db) {
        let { data } = this.payload;
        db.set(dbp `proposals/${data.id}`, data);
    }
};
AddProposal = __decorate([
    CommandMeta({
        payloadSchema: () => SimpleSchema({
            $data: { $ref: Proposal.name },
        }),
        returnSchema: () => SimpleSchema({ $id: { type: "string" } }),
    })
], AddProposal);
export { AddProposal };
