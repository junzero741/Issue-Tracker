import styled from "styled-components";
import { TabButton } from "styles/StyledButtons";
import { ReactComponent as ArrowIcon } from "images/arrow_down.svg";
import theme from "styles/theme";
import { clickedFilterState, filterClickFlagState } from "RecoilStore/Atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import FilterModal from "components/common/FilterModal";
const DropDownButton = ({ text, clickEvent, width, border, radius }) => {
	const clickedFilter = useRecoilValue(clickedFilterState);
	const [isFilterClicked, setIsFilterClicked] =
		useRecoilState(filterClickFlagState);
	return (
		<>
			<TabButton
				onClick={clickEvent}
				_width={width}
				_border={border}
				_radius={radius}
				value={text}
			>
				<ButtonText>{text}</ButtonText>
				<ArrowIcon stroke={theme.grayScale.label} />
			</TabButton>
			{isFilterClicked && clickedFilter === text && <FilterModal />}
		</>
	);
};

const ButtonText = styled.div`
	padding-right: 30%;
`;
export default DropDownButton;
