import {GetProposal} from "../../Store/db/proposals.js";
import {SetProposalOrder} from "./SetProposalOrder.js";
import {CE, emptyArray_forLoading, NN} from "js-vextensions";
import {GetAsync, GetDocs, Command, AssertV, dbp, DBHelper, CommandMeta, SimpleSchema} from "mobx-graphlink";
import {graph} from "../../Utils/Database/MobXGraphlink.js";

//@UserEdit
@CommandMeta({
	payloadSchema: ()=>SimpleSchema({
		$id: {$ref: "UUID"},
	}),
})
export class DeleteProposal extends Command<{id: string}> {
	//posts: Post[];
	sub_removalsFromUserOrderings: SetProposalOrder[];
	Validate() {
		let {id} = this.payload;
		let proposal = NN(GetProposal(id));
		//this.posts = await GetAsync(()=>GetProposalPosts(proposal));

		let userDatas = GetDocs({graph}, a=>a.feedback_userData);
		this.sub_removalsFromUserOrderings = [];
		//let userDatasWithOrderingContainingProposal = userDatas.filter(userData=>CE(CE(userData.proposalIndexes).VValues(true)).Contains(id));
		let userDatasWithOrderingContainingProposal = userDatas.filter(userData=>CE(userData.proposalsOrder).Contains(id));
		for (let userID of userDatasWithOrderingContainingProposal.map(userData=>userData["_key"])) {
			let subcommand = new SetProposalOrder({graph}, {proposalID: id, userID, index: -1});
			subcommand.Validate();
			this.sub_removalsFromUserOrderings.push(subcommand);
		}

		/*if (this.posts.filter(a=>a.creator != this.userInfo.id && a.text).length) {
			throw new Error(`Proposals with responses by other people cannot be deleted.`);
		}*/
	}

	DeclareDBUpdates(db: DBHelper) {
		let {id} = this.payload;
		db.set(dbp`feedback_proposals/${id}`, null);
		/*for (let post of this.posts) {
			updates[`posts/${post._id}`] = null;
		}*/

		for (const subcommand of this.sub_removalsFromUserOrderings) {
			db.add(subcommand.GetDBUpdates());
		}
	}
}