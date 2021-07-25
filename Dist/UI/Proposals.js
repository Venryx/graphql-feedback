var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from "react";
import { Button, CheckBox, Column, Row } from "react-vcomponents";
import { ApplyBasicStyles, GetDOM, BaseComponentPlus } from "react-vextensions";
import { ScrollView } from "react-vscrollview";
import { manager } from "../Manager.js";
import { SetProposalOrder } from "../Server/Commands/SetProposalOrder.js";
import { GetSelectedProposal } from "../Store/main/proposals.js";
import { GetProposalsOrder, GetProposals } from "../index.js";
import { ShowAddProposalDialog } from "./Feedback/Proposal/ProposalDetailsUI.js";
import { ProposalEntryUI } from "./Feedback/ProposalEntryUI.js";
import { ProposalUI } from "./Feedback/ProposalUI.js";
import { ToJSON, FromJSON, CE } from "js-vextensions";
import { DragDropContext as DragDropContext_Beautiful, Droppable } from "react-beautiful-dnd";
import { DroppableInfo } from "../Utils/UI/DNDStructures.js";
import { store } from "../Store/index.js";
import { graph } from "../Utils/Database/MobXGraphlink.js";
import { GetDocs, MGLObserver } from "mobx-graphlink";
import { RunInAction } from "../Utils/General/General.js";
/*export class ProposalsUI_Outer extends BaseComponent<Props, {}> {
    render() {
        return <ProposalsUI
    }
}*/
let ProposalsUI = class ProposalsUI extends BaseComponentPlus({ subNavBarWidth: 0 }, {}) {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "OnDragEnd", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: result => {
                const sourceDroppableInfo = FromJSON(result.source.droppableId);
                const sourceIndex = result.source.index;
                const targetDroppableInfo = result.destination && FromJSON(result.destination.droppableId);
                let targetIndex = result.destination && result.destination.index;
                const draggableInfo = FromJSON(result.draggableId);
                if (targetDroppableInfo == null) {
                }
                else if (targetDroppableInfo.type == "ProposalsUserRankingColumn") {
                    if (manager.GetUserID() == null)
                        return void manager.ShowSignInPopup();
                    // if we're moving an item to later in the same list, increment the target-index again (since react-beautiful-dnd pre-applies target-index adjustment, unlike the rest of our code that uses SetBookEventIndex/Array.Move())
                    if (sourceDroppableInfo.type == targetDroppableInfo.type && sourceIndex < targetIndex) {
                        targetIndex++;
                    }
                    new SetProposalOrder({ graph }, { proposalID: draggableInfo.proposalID, userID: manager.GetUserID(), index: targetIndex }).RunOnServer();
                }
            }
        });
    }
    /*constructor(props) {
        super(props);
        Assert(wrapped, "ProposalsUI is being created before the class has been wrapped by Connect()!");
    }*/
    render() {
        let { subNavBarWidth } = this.props;
        const proposals = GetProposals();
        const selectedProposal = GetSelectedProposal();
        if (selectedProposal) {
            return React.createElement(ProposalUI, { proposal: selectedProposal, subNavBarWidth: subNavBarWidth });
        }
        if (proposals == null) {
            return React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "25px" } }, "Loading proposals...");
        }
        return (React.createElement(DragDropContext_Beautiful, { onDragEnd: this.OnDragEnd },
            React.createElement(Row, { style: ES({ marginTop: 10, height: "calc(100% - 10px)", flex: 1, padding: 10, filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)" }) },
                React.createElement(ProposalsColumn, { proposals: proposals, type: "feature" }),
                React.createElement(ProposalsColumn, { proposals: proposals, type: "issue", ml: 10 }),
                React.createElement(ProposalsUserRankingColumn, { proposals: proposals, ml: 10 }))));
    }
};
Object.defineProperty(ProposalsUI, "defaultProps", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { subNavBarWidth: 0 }
});
ProposalsUI = __decorate([
    MGLObserver
], ProposalsUI);
export { ProposalsUI };
export function GetRankingScoreToAddForUserRankingIndex(indexInRankingOrder) {
    let rankingScoreToAdd = 1;
    for (var i = 0; i < indexInRankingOrder; i++) {
        rankingScoreToAdd *= .9;
    }
    return rankingScoreToAdd;
}
function GetIncompleteProposalsInOrder(order, proposals) {
    return order.filter(id => {
        let proposalReferencedInOrder = proposals.find(a => a.id == id);
        // for some reason, proposalReferencedInOrder is null for a just-deleted proposal
        return proposalReferencedInOrder && !proposalReferencedInOrder.completedAt;
    });
}
let ProposalsColumn = class ProposalsColumn extends BaseComponentPlus({}, {}) {
    render() {
        let { proposals, type } = this.props;
        let userID = manager.GetUserID();
        const userData = CE(GetDocs({ graph }, a => a.feedback_userDatas)).ToMapObj(a => a["_key"], a => a);
        const showCompleted = store.main.proposals[`${type}s_showCompleted`];
        let shownProposals = proposals.filter(a => a.type == type && (!a.completedAt || showCompleted));
        //let proposalsOrder = GetProposalsOrder(userID);
        //let proposalOrders = userData ? CE(userData).VValues().map(a=>CE(a.proposalIndexes || {}).VValues(true)) : [];
        let proposalsOrders_perUser = userData ? CE(userData).VValues().map(a => a.proposalsOrder || []) : [];
        //let proposalsOrder_uncompleted = GetIncompleteProposalsInOrder(proposalsOrder, proposals);
        //let proposalOrders_uncompleted = proposalOrders.map(order=>order.filter(id=>!proposals.find(a=>a._key == id).completedAt));
        /*let deletedProposalsInOrdering = proposalOrders.filter(id=>!proposals.find(a=>a._key == id));
        Assert(deletedProposalsInOrdering <= 1, "More than one proposal in your ordering has been deleted!");
        let proposalOrders_uncompleted = proposalOrders.Except(deletedProposalsInOrdering).map(order=>order.filter(id=>!proposals.find(a=>a._key == id).completedAt));*/
        let proposalsOrder_uncompleted_perUser = proposalsOrders_perUser.map(order => GetIncompleteProposalsInOrder(order, proposals));
        let rankingScores = {};
        for (let proposal of shownProposals) {
            let rankingScore = 0;
            for (let proposalsOrder of proposalsOrder_uncompleted_perUser) {
                let indexInOrder = proposalsOrder.indexOf(proposal.id);
                if (indexInOrder == -1)
                    continue;
                rankingScore += GetRankingScoreToAddForUserRankingIndex(indexInOrder);
            }
            // show completed proposals at the top
            if (proposal.completedAt) {
                rankingScore = proposal.completedAt;
            }
            rankingScores[proposal.id] = rankingScore;
        }
        shownProposals = CE(shownProposals).OrderByDescending(a => rankingScores[a.id]);
        // calc here, so mobx sees usage
        let proposalEntryUIs = shownProposals.map((proposal, index) => {
            return React.createElement(ProposalEntryUI, { key: index, index: index, last: index == shownProposals.length - 1, proposal: proposal, rankingScore: rankingScores[proposal.id], columnType: type });
        });
        const droppableInfo = new DroppableInfo({ type: "ProposalsColumn", proposalType: type });
        return (React.createElement(Column, { style: ES({ flex: 1, height: "100%" }) },
            React.createElement(Column, { className: "clickThrough", style: { height: 40, background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0" } },
                React.createElement(Row, { style: { position: "relative", height: 40, padding: 10 } },
                    React.createElement(CheckBox, { ml: 5, text: "Show completed", value: showCompleted, onChange: val => {
                            RunInAction("ProposalsColumn.showCompleted.onChange", () => store.main.proposals[`${type}s_showCompleted`] = val);
                        } }),
                    React.createElement("span", { style: { position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: "18px" } },
                        type.replace(/^(.)/, (m, s0) => s0.toUpperCase()),
                        "s"),
                    React.createElement(Button, { text: type == "feature" ? "Propose feature" : "Report issue", ml: "auto", onClick: () => {
                            if (userID == null)
                                return manager.ShowSignInPopup();
                            ShowAddProposalDialog(userID, type);
                        } }))),
            React.createElement(Droppable, { type: "Proposal", droppableId: ToJSON(droppableInfo) }, (provided, snapshot) => (React.createElement(ScrollView, { ref: c => provided.innerRef(GetDOM(c)), scrollVBarStyle: { width: 10 }, style: ES({ flex: 1 }) },
                shownProposals.length == 0 && provided.placeholder == null &&
                    React.createElement(Row, { p: "7px 10px", style: { background: "rgba(30,30,30,.7)", borderRadius: "0 0 10px 10px" } },
                        "There are currently no ",
                        type == "feature" ? "feature proposals" : "issue reports",
                        "."),
                proposalEntryUIs,
                provided.placeholder)))));
    }
};
ProposalsColumn = __decorate([
    MGLObserver,
    ApplyBasicStyles
], ProposalsColumn);
export { ProposalsColumn };
let ProposalsUserRankingColumn = class ProposalsUserRankingColumn extends BaseComponentPlus({}, {}) {
    render() {
        let { proposals } = this.props;
        const proposalOrder = GetProposalsOrder(manager.GetUserID());
        let user = manager.GetUser(manager.GetUserID());
        let proposalOrder_uncompleted = GetIncompleteProposalsInOrder(proposalOrder, proposals);
        proposals = CE(proposals.filter(a => CE(proposalOrder).Contains(a.id))).OrderBy(a => proposalOrder.indexOf(a.id));
        // calculate it here (outside of Droppable render-func), because otherwise mobx doesn't know we're watching this data
        let proposalUIs = proposals.map((proposal, index) => {
            return React.createElement(ProposalEntryUI, { key: index, index: index, orderIndex: proposalOrder_uncompleted.indexOf(proposal.id), last: index == proposals.length - 1, proposal: proposal, columnType: "userRanking" });
        });
        const droppableInfo = new DroppableInfo({ type: "ProposalsUserRankingColumn", userID: user ? user._key : null });
        return (React.createElement(Column, { style: ES({ flex: 1, height: "100%" }) },
            React.createElement(Column, { className: "clickThrough", style: { background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0" } },
                React.createElement(Row, { style: { position: "relative", height: 40, padding: 10 } },
                    React.createElement("span", { style: { position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: "18px" } }, "Your ranking")),
                React.createElement("div", { style: { padding: 10, paddingTop: 0, alignItems: "center", fontSize: "13px", textAlign: "center" } }, "Drag proposals onto this list to \"vote\" for them. Items at the top get the highest score increase.")),
            React.createElement(Droppable, { type: "Proposal", droppableId: ToJSON(droppableInfo) }, (provided, snapshot) => (React.createElement(ScrollView, { ref: c => provided.innerRef(GetDOM(c)), scrollVBarStyle: { width: 10 }, style: ES({ flex: 1 }) },
                proposals.length == 0 && provided.placeholder == null &&
                    React.createElement(Row, { p: "7px 10px", style: { background: "rgba(30,30,30,.7)", borderRadius: "0 0 10px 10px" } }, "You have not yet added any proposals to your ranking."),
                proposalUIs,
                provided.placeholder)))));
    }
};
ProposalsUserRankingColumn = __decorate([
    MGLObserver,
    ApplyBasicStyles
], ProposalsUserRankingColumn);
export { ProposalsUserRankingColumn };
