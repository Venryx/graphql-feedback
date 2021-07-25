import {Proposal} from "./db/proposals/@Proposal.js";
import {Collection} from "mobx-graphlink";
import {UserInfo} from "./db/userInfos/@UserInfo.js";

declare module "mobx-graphlink/Dist/UserTypes" {
	// extend field-by-field (only one "interface UT_DBShape extends X" can exist, and that's best to reserve for user project)
	interface UT_DBShape {
		feedback_proposals: Collection<Proposal>;
		feedback_userInfos: Collection<UserInfo>;
	}
}

export interface Lib_DBShape {
	feedback_proposals: Collection<Proposal>;
	feedback_userInfos: Collection<UserInfo>;
}