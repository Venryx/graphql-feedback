import {CE, NN} from "js-vextensions";
import {AssertValidate, Command, CommandMeta, DBHelper, dbp, GetSchemaJSON, NewSchema, SimpleSchema} from "mobx-graphlink";
import {GetProposal} from "../../Store/db/proposals.js";
import {Proposal} from "../../Store/db/proposals/@Proposal.js";

type MainType = Proposal;
let MTName = "Proposal";

//@UserEdit
@CommandMeta({
	payloadSchema: ()=>SimpleSchema({
		$id: {type: "string"},
		$updates: NewSchema({
			properties: CE(GetSchemaJSON(MTName).properties!).IncludeKeys("title", "text", "completedAt"),
		}),
	}),
})
export class UpdateProposal extends Command<{id: string, updates: Partial<MainType>}> {
	oldData: MainType;
	newData: MainType;
	Validate() {
		let {id, updates} = this.payload;
		this.oldData = NN(GetProposal(id));
		this.newData = {...this.oldData, ...updates};
		AssertValidate(MTName, this.newData, `New ${MTName.toLowerCase()}-data invalid`);
	}
	
	DeclareDBUpdates(db: DBHelper) {
		let {id} = this.payload;
		db.set(dbp`feedback_proposals/${id}`, this.newData);
	}
}