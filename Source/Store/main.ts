import {makeObservable, observable} from "mobx";
import {Proposals} from "./main/proposals.js";

export class MainState {
	constructor() { makeObservable(this); }
	@observable proposals = new Proposals();
}