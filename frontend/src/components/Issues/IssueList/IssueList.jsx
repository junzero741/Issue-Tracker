import { useState, useEffect } from "react";
import styled from "styled-components";
import IssuesHeader from "./IssuesHeader";
import IssueCard from "./IssueCard";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	selectedCardsState,
	issueListUpdateState,
	issuesDataState,
	openIssueFlagState,
	filterBarInputState,
} from "RecoilStore/Atoms";
import API from "util/API";
import fetchData from "util/fetchData";

const IssueList = ({ filter }) => {
	const [isAnyIssueSelected, setIsAnyIssueSelected] = useState(false);
	const [isAllIssueSelected, setIsAllIssueSelected] = useState(false);
	const [selectedCards, setSelectedCards] = useRecoilState(selectedCardsState);
	const [issuesData, setIssues] = useRecoilState(issuesDataState);
	const update = useRecoilValue(issueListUpdateState);
	const openIssueFlag = useRecoilValue(openIssueFlagState);
	const filterState = useRecoilValue(filterBarInputState);

	const fetchIssueData = async () => {
		const { issues } = await fetchData(API.issues(), "GET");
		setIssues(issues);
	};

	useEffect(() => {
		fetchIssueData();
	}, [update]);

	const filteredIssueList = issuesData
		?.filter(issue => issue.open === openIssueFlag)
		.filter(issue => {
			if (issue.assignees.length && filterState.assignee) {
				for (let i = 0; i < issue.assignees.length; i++) {
					if (issue.assignees[i].githubId === filterState.assignee) return true;
				}
			} else return true;
		})
		.filter(issue => {
			if (issue.labels.length && filterState.label) {
				for (let i = 0; i < issue.labels.length; i++) {
					if (issue.labels[i].name === filterState.label) return true;
				}
			} else return true;
		})
		.filter(issue => {
			if (filterState.milestone)
				return issue.milestone.title === filterState.milestone;
			else return true;
		})
		.filter(issue => {
			if (filterState.author)
				return issue.author.githubId === filterState.author;
			else return true;
		})
		.map(issue => (
			<IssueCard
				key={issue.id}
				issue={issue}
				setIsAnyIssueSelected={setIsAnyIssueSelected}
				isAllIssueSelected={isAllIssueSelected}
				setIsAllIssueSelected={setIsAllIssueSelected}
			/>
		));

	return (
		<>
			{filteredIssueList && (
				<StyledIssueList>
					<IssuesHeader
						filteredIssueList={filteredIssueList}
						issuesData={issuesData}
						isAnyIssueSelected={isAnyIssueSelected}
						setIsAnyIssueSelected={setIsAnyIssueSelected}
						isAllIssueSelected={isAllIssueSelected}
						setIsAllIssueSelected={setIsAllIssueSelected}
						selectedCards={selectedCards}
					/>
					{filteredIssueList.length ? (
						filteredIssueList
					) : (
						<ErrorCard>검색과 일치하는 결과가 없습니다</ErrorCard>
					)}
				</StyledIssueList>
			)}
		</>
	);
};

export default IssueList;

const StyledIssueList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const ErrorCard = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.grayScale.off_white};
	border: 1px solid ${({ theme }) => theme.grayScale.line};
	height: 100px;
`;
