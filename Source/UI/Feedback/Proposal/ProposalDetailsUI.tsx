import { GetErrorMessagesUnderElement, Clone, E } from "js-vextensions";
import React from "react";
import { Column, Pre, Row, RowLR, TextInput } from "react-vcomponents";
import { BaseComponent, GetInnerComp, GetDOM } from "react-vextensions";
//import { MarkdownEditor, MarkdownToolbar } from "react-vmarkdown";
import { BoxController, ShowMessageBox } from "react-vmessagebox";
import { AddProposal } from "../../../Server/Commands/AddProposal.js";
import { Proposal } from "../../../Store/db/proposals/@Proposal.js";
import {store} from "../../../Store/index.js";
import {runInAction} from "mobx";
import {Link} from "../../../Utils/ReactComponents/Link.js";
import {RunInAction} from "../../../Utils/General/General.js";

export type _MainType = Proposal;
let MTName = "Proposal";

// this weirdness is done so that "graphql-feedback" can be imported into NodeJS without parse-time errors (react-vmarkdown cannot easily be made NodeJS-safe, since imports from several codemirror files)
let reactVMarkdown_importCache: typeof import("react-vmarkdown");
export function GetReactVMarkdown_Safe() {
	if (reactVMarkdown_importCache == null) {
		(async()=>{
			reactVMarkdown_importCache = await import("react-vmarkdown");
		})();
	}
	return reactVMarkdown_importCache ?? {
		MarkdownToolbar: ()=><div/>,
		MarkdownEditor: ()=><div/>,
	};
}
if (typeof window != "undefined" && typeof navigator != "undefined") {
	GetReactVMarkdown_Safe(); // trigger at parse-time, if in browser
}

export type ProposalDetailsUI_Props = {baseData: _MainType, forNew: boolean, enabled?: boolean, style?, onChange?: (newData: _MainType, comp: ProposalDetailsUI)=>void};
export class ProposalDetailsUI extends BaseComponent<ProposalDetailsUI_Props, {newData: _MainType}> {
	static defaultProps = {enabled: true};
	ComponentWillMountOrReceiveProps(props, forMount) {
		if (forMount || props.baseData != this.props.baseData) { // if base-data changed
			this.SetState({newData: Clone(props.baseData)});
		}
	}

	render() {
		let {forNew, enabled, style, onChange} = this.props;
		let {newData} = this.state;
		let Change = _=> {
			if (onChange)
				onChange(this.GetNewData(), this);
			this.Update();
		};

		const {MarkdownToolbar, MarkdownEditor} = GetReactVMarkdown_Safe();

		let splitAt = 50;
		return (
			<Column style={E({width: "100%", style})}>
				<RowLR splitAt={splitAt}>
					<Pre>Title: </Pre>
					<TextInput required
						enabled={enabled} style={{width: "100%"}}
						value={newData.title} onChange={val=>Change(newData.title = val)}/>
				</RowLR>
				<Row mt={5}>Text:</Row>
				<Row mt={5} /*splitAt={splitAt} style={{width}}*/>
					<Column style={{width: "100%"}}>
						{enabled &&
							<MarkdownToolbar editor={()=>this.refs.editor} /*excludeCommands={['h1', 'h2', 'h3', 'h4', 'italic', 'quote']}*/>
								<Link to="https://guides.github.com/features/mastering-markdown" style={{marginLeft: 10}}>How to add links, images, etc.</Link>
							</MarkdownToolbar>}
						<MarkdownEditor ref="editor" toolbar={false} value={newData.text || ""} onChange={val=>Change(newData.text = val)}
							options={E({
								scrollbarStyle: "overlay",
								lineWrapping: true,
								readOnly: !enabled,
								placeholder: "Write your reply...",
							}, /*options*/)}/>
					</Column>
				</Row>
			</Column>
		);
	}
	GetValidationError() {
		return GetErrorMessagesUnderElement(GetDOM(this))[0];
	}

	GetNewData() {
		let {newData} = this.state;
		return Clone(newData) as _MainType;
	}
}

export function ShowAddProposalDialog(userID: string, type: string) {
	let newEntry = new Proposal({type});
	
	let detailsUI: ProposalDetailsUI;
	let error = null;
	let Change = (..._)=>boxController.UpdateUI();
	let boxController: BoxController = ShowMessageBox({
		title: type == "feature" ? "Propose feature" : "Report issue", cancelButton: true,
		message: ()=> {
			boxController.options.okButtonProps = {enabled: error == null, title: error};
			return (
				<Column style={{width: 600}}>
					<ProposalDetailsUI ref={c=>detailsUI = c} baseData={newEntry} forNew={true}
						onChange={val=>Change(newEntry = val, error = detailsUI.GetValidationError())}/>
					{error && error != "Please fill out this field." && <Row mt={5} style={{color: "rgba(200,70,70,1)"}}>{error}</Row>}
				</Column>
			);
		},
		onOK: async ()=> {
			let {id} = await new AddProposal({data: newEntry}).RunOnServer();
			RunInAction("ShowAddProposalDialog.onOK", ()=>store.main.proposals.selectedProposalID = id);
		}
	});
}