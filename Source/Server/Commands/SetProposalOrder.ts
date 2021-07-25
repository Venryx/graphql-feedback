import {CE} from "js-vextensions";
import {GetAsync, GetDoc, Command, AssertV, WrapDBValue, DBHelper, dbp, SimpleSchema, CommandMeta} from "mobx-graphlink";
import {GetProposalsOrder} from "../../Store/db/userInfos.js";

@CommandMeta({
	payloadSchema: ()=>SimpleSchema({
		$proposalID: {$ref: "UUID"},
		$userID: {$ref: "UUID"},
		$index: {type: "number"},
	}),
})
export class SetProposalOrder extends Command<{proposalID: string, userID: string, index: number}> {
	newOrder: string[];
	Validate() {
		let {proposalID, userID, index} = this.payload;

		//let oldIndexes = (await GetAsync(()=>GetDoc(a=>a.userData.get(userID))))?.proposalOrder || {};
		let oldOrder = GetProposalsOrder(userID);
		//let idsOrdered = CE(oldIndexes).VValues(true);
		//let newOrder = oldOrder.slice();
		this.newOrder = oldOrder.slice();
		
		//let oldIndex = oldOrder.indexOf(proposalID);
		if (index != -1) {
			CE(this.newOrder).Move(proposalID, index, true);
		} else {
			CE(this.newOrder).Remove(proposalID);
		}
		//this.newOrder = newOrder; //.ToMap();
		//AssertValidate(`BookEvent`, event, `Book-event invalid`);*/
	}
	
	DeclareDBUpdates(db: DBHelper) {
		let {userID, proposalID} = this.payload;
		//updates[`userData/${userID}/.proposalsOrder`] = WrapDBValue(this.newOrder, {merge: true});
		//db.set(dbp`feedback_userData/${userID}/.proposalsOrder`, this.newOrder);
		db.set(dbp`feedback_userInfos/${userID}`, {
			id: this.userInfo.id,
			proposalsOrder: this.newOrder,
		});
	}
}