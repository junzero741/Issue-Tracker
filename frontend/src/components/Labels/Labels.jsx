import styled from "styled-components";
import LabelCard from "./LabelCard";
import LabelInput from "./LabelInput";
import { StyledGridTitleCard } from "styles/StyledCards";
import { useState, useEffect } from "react";
import API from "util/API";
import fetchData from "util/fetchData";
import {
	labelInitialData,
	labelAddButtonFlagState,
	labelEditButtonFlagState,
} from "RecoilStore/Atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";

const Labels = () => {
	const [initialData, setLabelInitialData] = useRecoilState(labelInitialData);
	const labelAddBtnFlag = useRecoilValue(labelAddButtonFlagState);
	const labelEditBtnFlag = useRecoilValue(labelEditButtonFlagState);

	const getLabelData = async () => {
		const { labels } = await fetchData(API.labels(), "GET");
		setLabelInitialData(labels);
	};

	useEffect(() => {
		getLabelData();
	}, []);

	return (
		<>
			{labelAddBtnFlag ? <LabelInput isEditor={false} /> : null}
			<StyledGridTitleCard gridRate={[1]}>
				<HeaderTitle>N개의 레이블</HeaderTitle>
			</StyledGridTitleCard>
			{labelEditBtnFlag ? (
				<LabelInput isEditor={true} />
			) : (
				initialData &&
				initialData.map(data => (
					<LabelCard id={data.id} key={data.id} initialData={data} />
				))
			)}
		</>
	);
};

const HeaderTitle = styled.div`
	font-weight: bold;
	color: ${({ theme }) => theme.grayScale.label};
	align-items: center;
	padding: 0 6%;
`;
export default Labels;
