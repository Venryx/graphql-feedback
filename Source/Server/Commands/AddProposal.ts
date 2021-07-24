import {CE} from "js-vextensions";
import {AssertValidate, Command, CommandMeta, DBHelper, dbp, GetSchemaJSON, NewSchema, SimpleSchema} from "mobx-graphlink";
import {Proposal} from "../../index.js";

export type _MainType = Proposal;
let MTName = "Proposal";

//@UserEdit
@CommandMeta({
	payloadSchema: ()=>SimpleSchema({
		$data: {$ref: Proposal.name},
	}),
	returnSchema: ()=>SimpleSchema({$id: {type: "string"}}),
})
export class AddProposal extends Command<{data: _MainType}, {id: string}> {
	Validate() {
		let {data} = this.payload;

		data.id = this.GenerateUUID_Once("id");
		data.creator = this.userInfo.id;
		data.createdAt = Date.now();
		//thread.editedAt = thread.createdAt;

		this.returnData = {id: data.id};
		AssertValidate(MTName, data, `${MTName} invalid`);
	}
	
	DeclareDBUpdates(db: DBHelper) {
		let {data} = this.payload;
		db.set(dbp`feedback_proposals/${data.id}`, data);
	}
}