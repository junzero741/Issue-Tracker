import { useEffect } from "react";
import { useResetRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import MenuFilterBar from "./MenuFilterBar";
import MenuTab from "./MenuTab";
import {
	queryStringState,
	filterBarInputState,
	labelCountState,
	milestoneCountState,
} from "RecoilStore/Atoms";
import API from "util/API";
import fetchData from "util/fetchData";

const Menu = () => {
	const queryString = useRecoilValue(queryStringState);
	const resetFilterBarInputState = useResetRecoilState(filterBarInputState);
	const setLabelCount = useSetRecoilState(labelCountState);
	const setMilestoneCount = useSetRecoilState(milestoneCountState);
	const resetQueryStringState = useResetRecoilState(queryStringState);
	const handleClick = () => {
		resetFilterBarInputState();
		resetQueryStringState();
	};

	useEffect(() => {
		getLabelMilestoneData();
	}, []);

	const getLabelMilestoneData = async () => {
		const { labels } = await fetchData(API.labels(), "GET");
		const { milestones } = await fetchData(API.milestones(), "GET");
		setLabelCount(labels.length);
		setMilestoneCount(milestones.length);
	};

	return (
		<Wrapper>
			<MenuLayout>
				<MenuFilterBar />
				<MenuTab />
			</MenuLayout>
			{queryString && (
				<ClearFiltersButton onClick={handleClick}>
					X clear current filter query
				</ClearFiltersButton>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`;

const MenuLayout = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const ClearFiltersButton = styled.button`
	background-color: transparent;
	padding: 0 0 20px 0;
	font-size: ${({ theme }) => theme.fontSizes.lg};
	&:hover {
		color: ${({ theme }) => theme.colors.blue};
	}
	color: ${({ theme }) => theme.grayScale.label};
`;

export default Menu;
