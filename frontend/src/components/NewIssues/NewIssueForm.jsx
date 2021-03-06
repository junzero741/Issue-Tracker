import { Link } from "react-router-dom";
import styled from "styled-components";
import IssueCategoryList from "components/common/IssueCategory/IssueCategoryList";
import CommentInput from "components/common/CommentInput";
import SubmitBtn from "components/common/Button/BlueButtons";
import { ReactComponent as Xsquare } from "images/x-square.svg";
import getUserInfo from "util/getUserInfo";
import {
	commentInputState,
	categoryIdSelectorState,
	categorySelectorState,
} from "RecoilStore/Atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";
import fetchData from "util/fetchData";
import API from "util/API";

const NewIssueForm = () => {
	const userInfo = getUserInfo();
	const resetCategory = useSetRecoilState(categorySelectorState);
	const [issueTitle, setIssueTitle] = useState("");
	const commentValue = useRecoilValue(commentInputState);
	const categoryId = useRecoilValue(categoryIdSelectorState);
	const handleTitleInput = e => {
		setIssueTitle(e.target.value);
	};

	const handleSubmit = async () => {
		const { assignee, label, milestone } = categoryId;
		const requestBody = {
			title: issueTitle,
			comment: commentValue.content,
			assigneeIds: assignee,
			labelIds: label,
			milestoneId: milestone,
		};
		await fetchData(API.issues(), "POST", requestBody);
		resetCategory();
	};

	return (
		<>
			<Wrapper>
				<ImgWrapper>
					<img src={userInfo.imageUrl} alt={userInfo.gitHubId} />
				</ImgWrapper>
				<ContentsWrapper>
					<InputTitleWrapper>
						<Input
							type="text"
							placeholder="제목"
							value={issueTitle}
							onChange={handleTitleInput}
						/>
					</InputTitleWrapper>
					<CommentInput isNewIssueMode={true} />
				</ContentsWrapper>
				<IssueCategoryList />
			</Wrapper>
			<ButtonWrapper>
				<CancelBtn>
					<Link to="/main">
						<CancelBtn>
							<Xsquare stroke="#000000" />
							작성 취소
						</CancelBtn>
					</Link>
				</CancelBtn>
				<Link to="/main">
					<SubmitBtn
						text="완료"
						size="l"
						icon={"none"}
						clickHandler={handleSubmit}
					/>
				</Link>
			</ButtonWrapper>
		</>
	);
};

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 0.15fr 3fr 1fr;
	padding: ${({ theme }) => `${theme.fontSizes.xxxl} 0`};
	border-bottom: 1px solid ${({ theme }) => theme.grayScale.line};
`;

const ImgWrapper = styled.div`
	width: 44px;
	height: 44px;
	border: 1px solid ${({ theme }) => theme.grayScale.line};
	border-radius: 50%;
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
	}
`;

const ContentsWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: ${({ theme }) => `${theme.fontSizes.titleSize} 0`};
`;

const InputTitleWrapper = styled.div`
	padding: 1%;
	margin-bottom: ${({ theme }) => theme.paddings.xxl};
	border-radius: 14px;
	background-color: ${({ theme }) => theme.grayScale.input_background};
`;
const Input = styled.input`
	border: none;
	width: 100%;
	background-color: ${({ theme }) => theme.grayScale.input_background};
`;

const CancelBtn = styled.div`
	align-self: center;
	margin-right: 1rem;
`;

export default NewIssueForm;
