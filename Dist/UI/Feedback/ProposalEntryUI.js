var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CE } from "js-vextensions";
import React from "react";
import { Button, Row } from "react-vcomponents";
import { BaseComponentPlus, cssHelper } from "react-vextensions";
import { manager, OnPopulated } from "../../Manager.js";
import { SetProposalOrder } from "../../Server/Commands/SetProposalOrder.js";
import { GetRankingScoreToAddForUserRankingIndex } from "../Proposals.js";
import { MakeDraggable } from "../../Utils/UI/DNDHelpers.js";
import { DraggableInfo } from "../../Utils/UI/DNDStructures.js";
import ReactDOM from "react-dom";
import { Link } from "../../Utils/ReactComponents/Link.js";
import { MGLObserver } from "mobx-graphlink";
import { mwhTo0 } from "../GlobalStyles.js";
let portal;
OnPopulated(() => {
    portal = document.createElement('div');
    document.body.appendChild(portal);
});
OnPopulated(() => {
    ProposalEntryUI = MakeDraggable((props) => {
        const { columnType, proposal, index } = props;
        return {
            type: "Proposal",
            draggableInfo: new DraggableInfo({ columnType, proposalID: proposal.id }),
            index,
        };
    })(ProposalEntryUI);
});
/*@MakeDraggable((props: ProposalEntryUI_Props)=>{
    const {proposal, index} = props;
    return {
        type: "Proposal",
        draggableInfo: new DraggableInfo({proposalID: proposal._key}),
        index,
    };
})*/
let ProposalEntryUI = class ProposalEntryUI extends BaseComponentPlus({}, {}) {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "innerRoot", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    render() {
        let { index, last, proposal, orderIndex, rankingScore, columnType, style, dragInfo } = this.props;
        const creator = proposal && manager.GetUser(proposal.creator);
        //posts: proposal && GetProposalPosts(proposal),
        const asDragPreview = dragInfo && dragInfo.snapshot.isDragging;
        const { css } = cssHelper(this);
        let result = (React.createElement("div", { ...(dragInfo && dragInfo.provided.draggableProps), ...(dragInfo && dragInfo.provided.dragHandleProps) },
            React.createElement(Row, { ref: c => this.innerRoot = c, p: "7px 10px", style: css({ background: index % 2 == 0 ? "rgba(30,30,30,.7)" : "rgba(0,0,0,.7)" }, last && { borderRadius: "0 0 10px 10px" }, style) },
                React.createElement(Link, { text: proposal.title, actionFunc: s => s.main.proposals.selectedProposalID = proposal.id, style: css({ fontSize: "15px", flex: 1, ...mwhTo0 }) }),
                React.createElement("span", { style: css({ float: "right" }) }, columnType == "userRanking"
                    ? "#" + (index + 1) + (proposal.completedAt ? " (✔️)" : ` (+${CE(GetRankingScoreToAddForUserRankingIndex(orderIndex)).RoundTo_Str(.001, undefined, false)})`)
                    : (proposal.completedAt ? "✔️" : rankingScore ? CE(rankingScore).RoundTo_Str(.001, undefined, false) : "")),
                columnType == "userRanking" && !asDragPreview &&
                    React.createElement(Button, { text: "X", style: css({ margin: "-3px 0 -3px 5px", padding: "3px 5px" }), onClick: () => {
                            new SetProposalOrder({ proposalID: proposal.id, index: -1 }).RunOnServer();
                        } }))));
        // if drag preview, we have to put in portal, since otherwise the "filter" effect of ancestors causes the {position:fixed} style to not be relative-to-page
        if (asDragPreview) {
            return ReactDOM.createPortal(result, portal);
        }
        return result;
    }
};
ProposalEntryUI = __decorate([
    MGLObserver
], ProposalEntryUI);
export { ProposalEntryUI };
