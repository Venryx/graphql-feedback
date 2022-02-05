import {Timer, VURL, E, CE} from "js-vextensions";
import React from "react";
import {Button, Column, Row} from "react-vcomponents";
import {BaseComponent, GetDOM, GetInnerComp, BaseComponentPlus, cssHelper} from "react-vextensions";
import {Manager, manager, OnPopulated, User} from "../../Manager.js";
import {SetProposalOrder} from "../../Server/Commands/SetProposalOrder.js";
import {GetRankingScoreToAddForUserRankingIndex} from "../Proposals.js";
import {Proposal} from "../../Store/db/proposals/@Proposal.js";
import {MakeDraggable, DragInfo} from "../../Utils/UI/DNDHelpers.js";
import {DraggableInfo} from "../../Utils/UI/DNDStructures.js";
import ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {Link} from "../../Utils/ReactComponents/Link.js";
import {MGLObserver} from "mobx-graphlink";
import {n} from "../../Utils/@Internal/Types.js";
import {mwhTo0} from "../GlobalStyles.js";

let portal: HTMLElement;
OnPopulated(()=> {
	portal = document.createElement('div');
	document.body.appendChild(portal);
});

export type ProposalEntryUI_Props = {index: number, last: boolean, proposal: Proposal, orderIndex?: number, rankingScore?: number, columnType: string, style?} & {dragInfo?: DragInfo};

OnPopulated(()=> {
	(ProposalEntryUI as any) = MakeDraggable((props: ProposalEntryUI_Props)=>{
		const {columnType, proposal, index} = props;
		return {
			type: "Proposal",
			draggableInfo: new DraggableInfo({columnType, proposalID: proposal.id}),
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
@MGLObserver
export class ProposalEntryUI extends BaseComponentPlus({} as ProposalEntryUI_Props, {}) {
	innerRoot: Column|n;
	render() {
		let {index, last, proposal, orderIndex, rankingScore, columnType, style, dragInfo} = this.props;
		const creator = proposal && manager.GetUser(proposal.creator);
		//posts: proposal && GetProposalPosts(proposal),
		const asDragPreview = dragInfo && dragInfo.snapshot.isDragging;

		const {css} = cssHelper(this);
		let result = (
			<div {...(dragInfo && dragInfo.provided.draggableProps)} {...(dragInfo && dragInfo.provided.dragHandleProps)}>
				<Row ref={c=>this.innerRoot = c}
						p="7px 10px" style={css(
							{background: index % 2 == 0 ? "rgba(30,30,30,.7)" : "rgba(0,0,0,.7)"},
							last && {borderRadius: "0 0 10px 10px"},
							style,
						)}>
					<Link text={proposal.title} actionFunc={s=>s.main.proposals.selectedProposalID = proposal.id} style={css({fontSize: "15px", flex: 1, ...mwhTo0})}/>
					<span style={css({float: "right"})}>
						{columnType == "userRanking"
							? "#" + (index + 1) + (proposal.completedAt ? " (✔️)" : ` (+${CE(GetRankingScoreToAddForUserRankingIndex(orderIndex!)).RoundTo_Str(.001, undefined, false)})`)
							: (proposal.completedAt ? "✔️" : rankingScore ? CE(rankingScore).RoundTo_Str(.001, undefined, false) : "")}
					</span>
					{columnType == "userRanking" && !asDragPreview &&
						<Button text="X" style={css({margin: "-3px 0 -3px 5px", padding: "3px 5px"})} onClick={()=> {
							new SetProposalOrder({proposalID: proposal.id, index: -1}).RunOnServer();
						}}/>}
				</Row>
			</div>
		);

		// if drag preview, we have to put in portal, since otherwise the "filter" effect of ancestors causes the {position:fixed} style to not be relative-to-page
		if (asDragPreview) {
    		return ReactDOM.createPortal(result, portal);
		}

		return result;
	}
}