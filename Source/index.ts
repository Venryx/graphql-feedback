import "js-vextensions";
import "codemirror/addon/scroll/simplescrollbars.js";

//export * from "./Manager";
export {Manager as Feedback_Manager, manager as feedback_manager} from "./Manager.js";

export * from "./Server/Commands/AddProposal.js";
export * from "./Server/Commands/DeleteProposal.js";
export * from "./Server/Commands/SetProposalOrder.js";
export * from "./Server/Commands/UpdateProposal.js";

export {Lib_RootState as Feedback_RootState, store as Feedback_store} from "./Store/index.js";
export {MainState as Feedback_MainState} from "./Store/main.js";
export * from "./Store/main/proposals";
//export {FirebaseDBShape as Feedback_FirebaseDBShape} from "./Store/db.js";
export * from "./Store/db/proposals.js";
export * from "./Store/db/proposals/@Proposal.js";
export * from "./Store/db/userData.js";

export * from "./UI/Proposals.js";