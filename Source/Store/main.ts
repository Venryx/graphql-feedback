import {makeObservable, observable} from "mobx";
import {ProposalsState} from "./main/proposals.js";

export class MainState {
	constructor() { makeObservable(this); }
	@observable proposals = new ProposalsState();
}