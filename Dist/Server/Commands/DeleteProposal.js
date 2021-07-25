var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { GetProposal } from "../../Store/db/proposals.js";
import { SetProposalOrder } from "./SetProposalOrder.js";
import { CE, NN } from "js-vextensions";
import { GetDocs, Command, dbp, CommandMeta, SimpleSchema } from "mobx-graphlink";
import { graph } from "../../Utils/Database/MobXGraphlink.js";
//@UserEdit
let DeleteProposal = class DeleteProposal extends Command {
    constructor() {
        super(...arguments);
        //posts: Post[];
        Object.defineProperty(this, "sub_removalsFromUserOrderings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    Validate() {
        let { id } = this.payload;
        let proposal = NN(GetProposal(id));
        //this.posts = await GetAsync(()=>GetProposalPosts(proposal));
        let userDatas = GetDocs({ graph }, a => a.feedback_userDatas);
        this.sub_removalsFromUserOrderings = [];
        //let userDatasWithOrderingContainingProposal = userDatas.filter(userData=>CE(CE(userData.proposalIndexes).VValues(true)).Contains(id));
        let userDatasWithOrderingContainingProposal = userDatas.filter(userData => CE(userData.proposalsOrder).Contains(id));
        for (let userID of userDatasWithOrderingContainingProposal.map(userData => userData["_key"])) {
            let subcommand = new SetProposalOrder({ graph }, { proposalID: id, userID, index: -1 });
            subcommand.Validate();
            this.sub_removalsFromUserOrderings.push(subcommand);
        }
        /*if (this.posts.filter(a=>a.creator != this.userInfo.id && a.text).length) {
            throw new Error(`Proposals with responses by other people cannot be deleted.`);
        }*/
    }
    DeclareDBUpdates(db) {
        let { id } = this.payload;
        db.set(dbp `feedback_proposals/${id}`, null);
        /*for (let post of this.posts) {
            updates[`posts/${post._id}`] = null;
        }*/
        for (const subcommand of this.sub_removalsFromUserOrderings) {
            db.add(subcommand.GetDBUpdates());
        }
    }
};
DeleteProposal = __decorate([
    CommandMeta({
        payloadSchema: () => SimpleSchema({
            $id: { $ref: "UUID" },
        }),
    })
], DeleteProposal);
export { DeleteProposal };
