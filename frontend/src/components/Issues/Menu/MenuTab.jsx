import styled from "styled-components";
import ButtonGroup from "components/common/Button/ButtonGroup";
import AddButton from "components/common/Button/BlueButtons";
import { Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
	labelButtonFlagState,
	milestoneButtonFlagState,
	labelCountState,
	milestoneCountState,
} from "RecoilStore/Atoms";
const MenuTab = () => {
	const setMilestoneFlag = useSetRecoilState(milestoneButtonFlagState);
	const setLabelFlag = useSetRecoilState(labelButtonFlagState);
	const labelCount = useRecoilValue(labelCountState);
	const milestoneCount = useRecoilValue(milestoneCountState);

	const handleMilestoneClick = () => {
		setMilestoneFlag(true);
		setLabelFlag(false);
	};
	const handleLabelClick = () => {
		setMilestoneFlag(false);
		setLabelFlag(true);
	};
	return (
		<Wrapper>
			<ButtonGroup
				milestoneCount={milestoneCount}
				labelCount={labelCount}
				milestoneClickEvent={handleMilestoneClick}
				labelClickEvent={handleLabelClick}
				ismainpage="true"
			/>
			<Link to="main/new">
				<AddButton text={"이슈 작성"} icon={"plus"} size={"m"} />
			</Link>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
`;

export default MenuTab;
