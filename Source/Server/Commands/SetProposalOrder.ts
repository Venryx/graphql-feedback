import {CE} from "js-vextensions";
import {GetAsync, GetDoc, Command, AssertV, WrapDBValue, DBHelper, dbp} from "mobx-graphlink";
import {graph} from "../../Utils/Database/MobXGraphlink";
import {GetProposalsOrder} from "../../Store/db/userData";

export class SetProposalOrder extends Command<{proposalID: string, userID: string, index: number}> {
	newOrder: string[];
	Validate() {
		let {proposalID, userID, index} = this.payload;

		//let oldIndexes = (await GetAsync(()=>GetDoc({graph}, a=>a.userData.get(userID))))?.proposalOrder || {};
		let oldOrder = GetProposalsOrder(userID, true);
		AssertV(oldOrder !== undefined, "oldOrder is still loading.");
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
		db.set(dbp`userData/${userID}/.proposalsOrder`, this.newOrder);
	}
}