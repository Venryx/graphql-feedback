import {CE} from "js-vextensions";
import {DB, Field, MGLClass} from "mobx-graphlink";

@MGLClass({table: "feedback_proposals"})
export class Proposal {
	constructor(initialData: Partial<Proposal>) {
		CE(this).Extend(initialData);
	}

	@DB((t, n)=>t.text(n).primary())
	@Field({$ref: "UUID"}, {opt: true})
	id: string;

	@DB((t, n)=>t.text(n))
	@Field({type: "string"})
	type: string;

	@DB((t, n)=>t.text(n))
	@Field({type: "string"})
	title = "";

	@DB((t, n)=>t.text(n))
	@Field({type: "string"})
	text = "";

	@DB((t, n)=>t.text(n).references("id").inTable(`users`).DeferRef())
	@Field({type: "string"}, {opt: true})
	creator: string;

	@DB((t, n)=>t.bigInteger(n))
	@Field({type: "number"}, {opt: true})
	createdAt: number;
	
	@DB((t, n)=>t.bigInteger(n).nullable())
	@Field({type: "number"}, {opt: true})
	editedAt?: number;
	
	@DB((t, n)=>t.bigInteger(n).nullable())
	@Field({type: "number"}, {opt: true})
	completedAt?: number;
}