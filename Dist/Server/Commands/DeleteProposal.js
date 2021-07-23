import { GetProposal } from "../../Store/db/proposals";
import { SetProposalOrder } from "./SetProposalOrder";
import { CE, emptyArray_forLoading } from "js-vextensions";
import { GetDocs, Command, AssertV, dbp } from "mobx-graphlink";
import { graph } from "../../Utils/Database/MobXGraphlink";
//@UserEdit
export class DeleteProposal extends Command {
    Validate() {
        let { id } = this.payload;
        let proposal = GetProposal(id);
        AssertV(proposal, "proposal is null.");
        //this.posts = await GetAsync(()=>GetProposalPosts(proposal));
        let userDatas = GetDocs({ graph }, a => a.userData);
        AssertV(userDatas != emptyArray_forLoading, "userDatas is still loading.");
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
        db.set(dbp `proposals/${id}`, null);
        /*for (let post of this.posts) {
            updates[`posts/${post._id}`] = null;
        }*/
        for (const subcommand of this.sub_removalsFromUserOrderings) {
            db.add(subcommand.GetDBUpdates());
        }
    }
}
