import { useEffect, useState } from "react";
import styled from "styled-components";
import IssueDetailHeader from "components/IssueDetail/IssueDetailHeader";
import IssueDetailComments from "components/IssueDetail/IssueDetailComments";
import IssueCategoryList from "components/common/IssueCategory/IssueCategoryList";
import { useParams } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
	issueDetailUpdateState,
	assigneeCategoryState,
	labelCategoryState,
	milestoneCategoryState,
	currentIssueId,
} from "RecoilStore/Atoms";
import fetchData from "util/fetchData";
import API from "util/API";

const IssueDetailPage = props => {
	const params = useParams();
	const issueId = params.id;
	const setCurrentIssueId = useSetRecoilState(currentIssueId);
	const [issueData, setIssueData] = useState();
	const [isTitleEditMode, setIsTitleEditMode] = useState(false);
	const [openState, setOpenState] = useState(false);
	const [update, forceUpdate] = useRecoilState(issueDetailUpdateState);
	const setAssigneeData = useSetRecoilState(assigneeCategoryState);
	const setLabelData = useSetRecoilState(labelCategoryState);
	const setMilestoneData = useSetRecoilState(milestoneCategoryState);

	setCurrentIssueId(issueId);
	const getIssueData = async () => {
		const { issue } = await fetchData(API.issue(issueId), "GET");
		const { assignees, labels, milestone } = issue;
		setIssueData(issue);
		setAssigneeData(assignees);
		setLabelData(labels);
		setMilestoneData(milestone);
	};

	useEffect(() => {
		getIssueData();
	}, [update, isTitleEditMode, openState]);

	const handleTitleEdit = () => {
		setIsTitleEditMode(x => !x);
	};

	return (
		<>
			{issueData && (
				<IssueWrapper>
					<IssueDetailHeader
						issueData={issueData}
						handleTitleEdit={handleTitleEdit}
						isTitleEditMode={isTitleEditMode}
						issueId={issueId}
						setOpenState={setOpenState}
					/>
					<ContentsWrapper>
						<IssueDetailComments issueData={issueData} />
						<IssueCategoryList />
					</ContentsWrapper>
				</IssueWrapper>
			)}
		</>
	);
};

export default IssueDetailPage;

const IssueWrapper = styled.div``;
const ContentsWrapper = styled.div`
	display: grid;
	grid-template-columns: 3fr 1fr;
`;
