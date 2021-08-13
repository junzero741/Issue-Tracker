import styled from "styled-components";
import ButtonGroup from "./Button/ButtonGroup";
import AddButton from "./Button/BlueButtons";
import CancelButton from "components/common/Button/WhiteButtons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
	labelButtonFlagState,
	milestoneButtonFlagState,
	milestoneAddButtonFlagState,
	labelAddButtonFlagState,
	navigatorAddButtonFlagState,
	labelCountState,
} from "RecoilStore/Atoms";

import { milestoneCountState } from "RecoilStore/Atoms";

const Navigator = () => {
	const [addButtonFlag, setAddButtonFlag] = useRecoilState(
		navigatorAddButtonFlagState
	);
	const [milestoneFlag, setMilestoneFlag] = useRecoilState(
		milestoneButtonFlagState
	);
	const setLabelFlag = useSetRecoilState(labelButtonFlagState);
	const [milestoneAddBtnFlag, setMilestoneAddBtnFlag] = useRecoilState(
		milestoneAddButtonFlagState
	);
	const [labelAddBtnFlag, setLabelAddBtnFlag] = useRecoilState(
		labelAddButtonFlagState
	);
	const labelCount = useRecoilValue(labelCountState);
	const milestoneCountValue = useRecoilValue(milestoneCountState);

	const handleMilestoneClick = () => {
		setMilestoneFlag(true);
		setLabelFlag(false);
	};
	const handleLabelClick = () => {
		setMilestoneFlag(false);
		setLabelFlag(true);
	};

	const handleClick = () => {
		if (milestoneFlag) {
			setMilestoneAddBtnFlag(!milestoneAddBtnFlag);
			setLabelAddBtnFlag(false);
			setAddButtonFlag(!addButtonFlag);
		} else {
			setLabelAddBtnFlag(!labelAddBtnFlag);
			setMilestoneAddBtnFlag(false);
			setAddButtonFlag(!addButtonFlag);
		}
	};

	return (
		<NavigatorLayout>
			<ButtonGroup
				milestoneCount={milestoneCountValue}
				milestoneClickEvent={handleMilestoneClick}
				labelCount={labelCount}
				labelClickEvent={handleLabelClick}
				ismainpage="false"
			/>

			{addButtonFlag ? (
				<CancelButton
					text="취소"
					icon="cancel"
					size="m"
					clickHandler={handleClick}
				/>
			) : (
				<AddButton
					text="추가"
					icon="plus"
					size="m"
					clickHandler={handleClick}
				/>
			)}
		</NavigatorLayout>
	);
};

const NavigatorLayout = styled.div`
	display: flex;
	justify-content: space-between;
`;

export default Navigator;
