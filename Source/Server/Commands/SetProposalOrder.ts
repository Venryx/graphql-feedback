import {CE} from "js-vextensions";
import {GetAsync, GetDoc, Command, AssertV, WrapDBValue, DBHelper, dbp, SimpleSchema, CommandMeta} from "mobx-graphlink";
import {GetProposalsOrder} from "../../Store/db/userInfos.js";

@CommandMeta({
	payloadSchema: ()=>SimpleSchema({
		$proposalID: {$ref: "UUID"},
		$index: {type: "number"},
	}),
})
export class SetProposalOrder extends Command<{proposalID: string, index: number}> {
	// from parent command
	userOverride: string;
	get userID() { return this.userOverride ?? this.userInfo.id; }
	
	newOrder: string[];
	Validate() {
		let {proposalID, index} = this.payload;

		//let oldIndexes = (await GetAsync(()=>GetDoc(a=>a.userData.get(userID))))?.proposalOrder || {};
		let oldOrder = GetProposalsOrder(this.userID);
		//let idsOrdered = CE(oldIndexes).VValues(true);
		//let newOrder = oldOrder.slice();
		this.newOrder = oldOrder.slice();
		
		//let oldIndex = oldOrder.indexOf(proposalID);
		if (index != -1) {
			CE(this.newOrder).Move(proposalID, index, "relative-slot"); // todo: ensure the new-index option is correct
		} else {
			CE(this.newOrder).Remove(proposalID);
		}
		//this.newOrder = newOrder; //.ToMap();
		//AssertValidate(`BookEvent`, event, `Book-event invalid`);*/
	}
	
	DeclareDBUpdates(db: DBHelper) {
		let {proposalID} = this.payload;
		//updates[`userData/${userID}/.proposalsOrder`] = WrapDBValue(this.newOrder, {merge: true});
		//db.set(dbp`feedback_userData/${userID}/.proposalsOrder`, this.newOrder);
		db.set(dbp`feedback_userInfos/${this.userID}`, {
			id: this.userID,
			proposalsOrder: this.newOrder,
		});
	}
}