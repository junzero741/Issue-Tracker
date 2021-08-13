import styled from "styled-components";
import { ReactComponent as SearchIcon } from "images/search.svg";
import DropDownButton from "components/common/Button/DropDownButton";
import theme from "styles/theme";
import { useEffect } from "react";
import {
	clickedFilterState,
	filterBarInputState,
	filterClickFlagState,
} from "RecoilStore/Atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
const MenuFilterBar = () => {
	const [isFilterClicked, setIsFilterClicked] =
		useRecoilState(filterClickFlagState);
	const setClickedFilterState = useSetRecoilState(clickedFilterState);
	const filterBarInput = useRecoilValue(filterBarInputState);
	const getFilterBarString = () => {
		return Object.entries(filterBarInput).reduce((acc, [key, value]) => {
			if (value) {
				if (key === "placeholder") acc += `${value} `;
				else if (key !== "openClose") acc += `${key}:${value} `;
			}
			return acc;
		}, "");
	};

	const handleClick = (e) => {
		isFilterClicked === false
			? setIsFilterClicked(true)
			: setIsFilterClicked(false);
		setClickedFilterState(e.currentTarget.value);
	};

	useEffect(() => {
		window.addEventListener("click", closeFilterModal);
		return function cleanup() {
			window.removeEventListener("click", closeFilterModal);
		};
	}, [isFilterClicked]);

	const closeFilterModal = (e) => {
		const target = e.target;
		if (isFilterClicked && !target.closest(".filter-modal"))
			setIsFilterClicked(false);
	};

	return (
		<>
			<MenuFilterLayout>
				<DropDownButton
					text={"필터"}
					clickEvent={handleClick}
					width={({ theme }) => theme.buttonWidths.base}
					radius={"left"}
				/>

				<FilterInputContainer>
					<FilterInputIconContainer>
						<SearchIcon stroke={theme.grayScale.placeholder} />
					</FilterInputIconContainer>
					<FilterInput>{getFilterBarString(filterBarInput)}</FilterInput>
				</FilterInputContainer>
			</MenuFilterLayout>
		</>
	);
};

const MenuFilterLayout = styled.div`
	display: flex;
	width: 700px;
	height: 40px;
	position: relative;
	margin-bottom: 24px;
`;

const FilterInputContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	padding: 11px;
	border: 1px solid ${theme.grayScale.line};
	background-color: ${theme.grayScale.input_background};
	border-radius: ${theme.border_radius_mix.right};
`;
const FilterInputIconContainer = styled.div``;
const FilterInput = styled.div`
	width: 100%;
	padding-left: 10px;
	border: none;
	background-color: ${theme.grayScale.input_background};
	color: ${theme.grayScale.placeholder};
	border-radius: ${theme.border_radius_mix.right};
`;

export default MenuFilterBar;
