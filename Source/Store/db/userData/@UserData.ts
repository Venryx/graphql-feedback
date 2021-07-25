import {DB, Field, MGLClass} from "mobx-graphlink";

@MGLClass({table: "feedback_userDatas"})
export class UserData {
	//proposalIndexes: ProposalIndexSet;

	@DB((t, n)=>t.text(n).primary())
	@Field({$ref: "UUID"}, {opt: true})
	id: string; // user-id

	@DB((t, n)=>t.text(n))
	@Field({items: {$ref: "UUID"}})
	proposalsOrder: string[];
}