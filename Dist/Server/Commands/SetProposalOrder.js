var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CE } from "js-vextensions";
import { Command, dbp, SimpleSchema, CommandMeta } from "mobx-graphlink";
import { GetProposalsOrder } from "../../Store/db/userInfos.js";
let SetProposalOrder = class SetProposalOrder extends Command {
    constructor() {
        super(...arguments);
        // from parent command
        Object.defineProperty(this, "userOverride", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "newOrder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get userID() { var _a; return (_a = this.userOverride) !== null && _a !== void 0 ? _a : this.userInfo.id; }
    Validate() {
        let { proposalID, index } = this.payload;
        //let oldIndexes = (await GetAsync(()=>GetDoc(a=>a.userData.get(userID))))?.proposalOrder || {};
        let oldOrder = GetProposalsOrder(this.userID);
        //let idsOrdered = CE(oldIndexes).VValues(true);
        //let newOrder = oldOrder.slice();
        this.newOrder = oldOrder.slice();
        //let oldIndex = oldOrder.indexOf(proposalID);
        if (index != -1) {
            CE(this.newOrder).Move(proposalID, index, "relative-slot"); // todo: ensure the new-index option is correct
        }
        else {
            CE(this.newOrder).Remove(proposalID);
        }
        //this.newOrder = newOrder; //.ToMap();
        //AssertValidate(`BookEvent`, event, `Book-event invalid`);*/
    }
    DeclareDBUpdates(db) {
        let { proposalID } = this.payload;
        //updates[`userData/${userID}/.proposalsOrder`] = WrapDBValue(this.newOrder, {merge: true});
        //db.set(dbp`feedback_userData/${userID}/.proposalsOrder`, this.newOrder);
        db.set(dbp `feedback_userInfos/${this.userID}`, {
            id: this.userID,
            proposalsOrder: this.newOrder,
        });
    }
};
SetProposalOrder = __decorate([
    CommandMeta({
        payloadSchema: () => SimpleSchema({
            $proposalID: { $ref: "UUID" },
            $index: { type: "number" },
        }),
    })
], SetProposalOrder);
export { SetProposalOrder };
