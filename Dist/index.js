import "js-vextensions";
// commented, since causes error when lib imported from server; should be fine, since this is called by user project anyway
//import "codemirror/addon/scroll/simplescrollbars.js";
//export * from "./Manager";
export { Manager as Feedback_Manager, manager as feedback_manager } from "./Manager.js";
export * from "./Server/Commands/AddProposal.js";
export * from "./Server/Commands/DeleteProposal.js";
export * from "./Server/Commands/SetProposalOrder.js";
export * from "./Server/Commands/UpdateProposal.js";
export { Lib_RootState as Feedback_RootState, store as Feedback_store } from "./Store/index.js";
export { MainState as Feedback_MainState } from "./Store/main.js";
export * from "./Store/main/proposals.js";
export * from "./Store/db/proposals.js";
export * from "./Store/db/proposals/@Proposal.js";
export * from "./Store/db/userInfos.js";
export { UserInfo as Feedback_UserInfo } from "./Store/db/userInfos/@UserInfo.js";
export * from "./UI/Proposals.js";
// we expose these, to make it easier for people to add css-helper hooks
export * from "./UI/Feedback/ProposalUI.js";
export * from "./UI/Feedback/ProposalEntryUI.js";
