import React from "react";
import { Button, CheckBox, Column, Row, Span, Text } from "react-vcomponents";
import { BaseComponent, GetInnerComp, BaseComponentWithConnector, BaseComponentPlus } from "react-vextensions";
import { ShowMessageBox } from "react-vmessagebox";
import { ScrollView } from "react-vscrollview";
import { IsUserAdmin, IsUserCreatorOrMod } from "../../General.js";
import { Manager, manager, OnPopulated } from "../../Manager.js";
import { DeleteProposal } from "../../Server/Commands/DeleteProposal.js";
import { UpdateProposal } from "../../Server/Commands/UpdateProposal.js";
import { GetUpdates } from "../../Utils/Database/DatabaseHelpers.js";
import { colors } from "../GlobalStyles.js";
import { Proposal } from "../../Store/db/proposals/@Proposal.js";
import { ProposalDetailsUI } from "./Proposal/ProposalDetailsUI.js";
import {store} from "../../Store/index.js";
import {runInAction} from "mobx";
import {Link} from "../../Utils/ReactComponents/Link.js";
import {observer} from "mobx-react";
import {MGLObserver} from "mobx-graphlink";

export type ProposalUI_Props = {proposal: Proposal, subNavBarWidth?: number};
@MGLObserver
export class ProposalUI extends BaseComponent<ProposalUI_Props, {}> {
	static defaultProps = {subNavBarWidth: 0};
	render() {
		let {proposal, subNavBarWidth} = this.props;
		let userID = manager.GetUserID();
		
		if (proposal == null) {
			return <div style={ES({display: "flex", alignItems: "center", justifyContent: "center", flex: 1, fontSize: "25px"})}>Loading proposal...</div>;
		}

		//let firstPostWritten = posts.length > 1 || posts[0].text != firstPostPlaceholderText;

		return (
			<Column style={ES({
				flex: 1, borderRadius: 10,
				//marginTop: 30, height: "calc(100% - 30px)",
				height: "100%", // scroll-bar overlays action-bar-right, but I guess that's better than sub-nav-bar not showing text behind it
			})}>
				<ActionBar_Left proposal={proposal} subNavBarWidth={subNavBarWidth}/>
				<ActionBar_Right proposal={proposal} subNavBarWidth={subNavBarWidth}/>
				<ScrollView ref="scrollView" scrollVBarStyle={{width: 10}} style={ES({flex: 1}/*styles.fillParent_abs*/)}>
					<Column style={{width: 960, margin: "50px auto 20px auto", filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)"}}>
						<ProposalUI_Inner proposal={proposal}/>
						<Column>
							{/*posts.map((post, index)=> {
								return <PostUI key={index} index={index} proposal={proposal} post={post}/>;
							})}
							{firstPostWritten &&
								<ReplyBox proposal={proposal}/>*/}
						</Column>
					</Column>
				</ScrollView>
			</Column>
		);
	}
}

@MGLObserver
export class ProposalUI_Inner extends BaseComponentPlus({} as {proposal: Proposal}, {editing: false, dataError: null as string}) {
	editorUI: ProposalDetailsUI;
	render() {
		let {proposal} = this.props;
		const creator = manager.GetUser(proposal.creator);
		let {editing, dataError} = this.state;

		if (editing) {
			return (
				<Column sel style={{flexShrink: 0, background: "rgba(0,0,0,.7)", borderRadius: 10, padding: 10, alignItems: "flex-start", cursor: "auto"}}>
					<ProposalDetailsUI ref={c=>this.editorUI = c} baseData={proposal} forNew={false}
						onChange={(newData, comp)=> {
							this.SetState({dataError: comp.GetValidationError()});
						}}/>
					<Row mt={5}>
						<Button text="Save" enabled={dataError == null} onLeftClick={async ()=> {
							let postUpdates = GetUpdates(proposal, this.editorUI.GetNewData());
							await new UpdateProposal({id: proposal.id, updates: postUpdates}).RunOnServer();
							this.SetState({editing: false, dataError: null});
						}}/>
						<Button ml={5} text="Cancel" onLeftClick={async ()=> {
							this.SetState({editing: false, dataError: null});
						}}/>
					</Row>
				</Column>
			)
		}

		let creatorOrMod = IsUserCreatorOrMod(manager.GetUserID(), proposal);
		return (
			<Row sel style={{flexShrink: 0, background: "rgba(0,0,0,.7)", borderRadius: 10, alignItems: "initial", cursor: "auto"}}>
				<Column p={10} style={ES({flex: 1})}>
					<Text style={{fontSize: "18px", /*width: "100%", textAlign: "center"*/}}>
						{proposal.title}
					</Text>
					<Row mt={10} style={{width: "100%"}}>
						<manager.MarkdownRenderer source={proposal.text}/>
					</Row>
					<Row mt={5}>
						<Text style={{color: "rgba(255,255,255,.5)"}}>{creator ? creator.displayName : "..."}, at {manager.FormatTime(proposal.createdAt, "YYYY-MM-DD HH:mm:ss")}</Text>
						{creatorOrMod &&
							<Button ml={5} text="Edit" onClick={()=> {
								this.SetState({editing: true});
							}}/>}
						{creatorOrMod &&
							<Button ml={5} text="Delete" onClick={()=> {
								ShowMessageBox({
									title: `Delete proposal`, cancelButton: true,
									message: `Delete this proposal?`,
									onOK: async ()=> {
										await new DeleteProposal({id: proposal.id}).RunOnServer();
									}
								});
							}}/>}
						{proposal.editedAt && <Span ml="auto" style={{color: "rgba(255,255,255,.5)"}}>
							{proposal.text != null ? "edited" : "deleted"} at {manager.FormatTime(proposal.editedAt, "YYYY-MM-DD HH:mm:ss")}
						</Span>}
						<CheckBox ml="auto" mr={5} text="Completed" value={proposal.completedAt != null} enabled={IsUserAdmin(manager.GetUserID())} onChange={val=>{
							new UpdateProposal({id: proposal.id, updates: {completedAt: proposal.completedAt == null ? Date.now() : null}}).RunOnServer();
						}}/>
					</Row>
				</Column>
			</Row>
		);
	}
}

type ActionBar_LeftProps = {proposal: Proposal, subNavBarWidth: number};
class ActionBar_Left extends BaseComponent<ActionBar_LeftProps, {}> {
	render() {
		let {proposal, subNavBarWidth} = this.props;

		return (
			<nav style={{
				position: "absolute", zIndex: manager.actionBarZIndex, left: 0, width: `calc(50% - ${subNavBarWidth / 2}px)`, top: 0, textAlign: "center",
				//background: "rgba(0,0,0,.5)", boxShadow: "3px 3px 7px rgba(0,0,0,.07)",
			}}>
				<Row style={{
					justifyContent: "flex-start", background: "rgba(0,0,0,.7)", boxShadow: colors.navBarBoxShadow,
					width: "100%", height: 30, borderRadius: "0 0 10px 0",
				}}>
					{/*<Button text="Back" onClick={()=> {
						runInAction("ActionBar_Left.Back.onClick", ()=>store.main.proposals.selectedProposalID = null);
					}}/>*/}
					<Link actionFunc={s=> {
						//runInAction("ActionBar_Left.Back.onClick", ()=>store.main.proposals.selectedProposalID = null);
						s.main.proposals.selectedProposalID = null;
					}}>
						<Button text="Back"/>
					</Link>
					{/*<DetailsDropdown proposal={proposal}/>*/}
				</Row>
			</nav>
		);
	}
}

/*type DetailsDropdownProps = {proposal: Proposal} & Partial<{posts: Post[]}>;
@Connect((state, {proposal}: DetailsDropdownProps)=> ({
	posts: GetProposalPosts(proposal),
}))
class DetailsDropdown extends BaseComponent<DetailsDropdownProps, {dataError: string}> {
	detailsUI: ProposalDetailsUI;
	render() {
		let {proposal, posts} = this.props;
		let {dataError} = this.state;
		
		let creatorOrMod = IsUserCreatorOrMod(manager.GetUserID(), proposal);
		return (
			<DropDown>
				<DropDownTrigger>
					<Button ml={5} text="Details"/>
				</DropDownTrigger>
				<DropDownContent style={{left: 0}}>
					<Column>
						<ProposalDetailsUI ref={c=>this.detailsUI = c} baseData={proposal}
							forNew={false} enabled={creatorOrMod}
							onChange={newData=> {
								this.SetState({dataError: this.detailsUI.GetValidationError()});
							}}/>
						{creatorOrMod &&
							<Row>
								<Button mt={5} text="Save" enabled={dataError == null} onLeftClick={async ()=> {
									let proposalUpdates = GetUpdates(proposal, this.detailsUI.GetNewData()).Excluding("posts");
									await new UpdateProposalDetails({proposalID: proposal._key, proposalUpdates}).Run();
								}}/>
							</Row>}
						{creatorOrMod &&
							<Column mt={10}>
								<Row style={{fontWeight: "bold"}}>Advanced:</Row>
								<Row mt={5}>
									<Button text="Delete" enabled={posts.filter(a=>a.creator != manager.GetUserID() && a.text).length <= 1} onLeftClick={async ()=> {
										/*let posts = await GetAsync(()=>GetProposalPosts(proposal));
										if (posts.length > 1) {
											return void ShowMessageBox({title: `Still has posts`,
												message: `Cannot delete this proposal until all its posts have been deleted.`});
										}*#/

										ShowMessageBox({
											title: `Delete "${proposal.title}"`, cancelButton: true,
											message: `Delete the proposal "${proposal.title}"?`,
											onOK: async ()=> {
												await new DeleteProposal({proposalID: proposal._key}).Run();
												store.dispatch(new ACTProposalSelect({id: null}));
											}
										});
									}}/>
									<Pre ml={10} style={{opacity: .7}}>(note: proposals with responses by others cannot be deleted)</Pre>
								</Row>
							</Column>}
					</Column>
				</DropDownContent>
			</DropDown>
		)
	}
}*/

class ActionBar_Right extends BaseComponent<{proposal: Proposal, subNavBarWidth: number}, {}> {
	render() {
		let {proposal, subNavBarWidth} = this.props;
		return (
			<nav style={{
				position: "absolute", zIndex: manager.actionBarZIndex, left: `calc(50% + ${subNavBarWidth / 2}px)`, right: 0, top: 0, textAlign: "center",
				//background: "rgba(0,0,0,.5)", boxShadow: "3px 3px 7px rgba(0,0,0,.07)",
			}}>
				<Row style={{
					justifyContent: "flex-end", background: "rgba(0,0,0,.7)", boxShadow: colors.navBarBoxShadow,
					width: "100%", height: 30, borderRadius: "0 0 0 10px",
				}}>
					{/*<DropDown>
						<DropDownTrigger>
							<Button text="Layout"/>
						</DropDownTrigger>
						<DropDownContent style={{right: 0}}>
							<Column>
								<Row>
									<Pre>Initial child limit: </Pre>
									<Spinner min={1} value={initialChildLimit} onChange={val=>store.dispatch(new ACTSetInitialChildLimit({value: val}))}/>
								</Row>
							</Column>
						</DropDownContent>
					</DropDown>*/}
				</Row>
			</nav>
		);
	}
}