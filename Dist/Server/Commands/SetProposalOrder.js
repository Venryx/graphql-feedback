import { CE } from "js-vextensions";
import { Command, AssertV, dbp } from "mobx-graphlink";
import { GetProposalsOrder } from "../../Store/db/userData";
export class SetProposalOrder extends Command {
    Validate() {
        let { proposalID, userID, index } = this.payload;
        //let oldIndexes = (await GetAsync(()=>GetDoc({graph}, a=>a.userData.get(userID))))?.proposalOrder || {};
        let oldOrder = GetProposalsOrder(userID, true);
        AssertV(oldOrder !== undefined, "oldOrder is still loading.");
        //let idsOrdered = CE(oldIndexes).VValues(true);
        //let newOrder = oldOrder.slice();
        this.newOrder = oldOrder.slice();
        //let oldIndex = oldOrder.indexOf(proposalID);
        if (index != -1) {
            CE(this.newOrder).Move(proposalID, index, true);
        }
        else {
            CE(this.newOrder).Remove(proposalID);
        }
        //this.newOrder = newOrder; //.ToMap();
        //AssertValidate(`BookEvent`, event, `Book-event invalid`);*/
    }
    DeclareDBUpdates(db) {
        let { userID, proposalID } = this.payload;
        //updates[`userData/${userID}/.proposalsOrder`] = WrapDBValue(this.newOrder, {merge: true});
        db.set(dbp `userData/${userID}/.proposalsOrder`, this.newOrder);
    }
}
