import { useState } from "react";
import { filterBarInputState, clickedFilterState } from "RecoilStore/Atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { filterData, CATEGORY_KOR } from "data";
import getEngKey from "util/getEngKey";
import styled from "styled-components";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const FilterModal = () => {
	const [clickedFilter, setClickedFilterState] = useState("");
	const filterType = useRecoilValue(clickedFilterState);
	const [filterBarInput, setFilterBarInputState] = useRecoilState(
		filterBarInputState
	);

	const handleChange = event => {
		setClickedFilterState(event.target.value);
		setFilterStateByType(event.target.value);
	};

	const setFilterStateByType = clickedValue => {
		const updatedValue =
			clickedValue === filterBarInput[getEngKey(filterType)]
				? null
				: clickedValue;

		switch (filterType) {
			case CATEGORY_KOR.ASSIGNEE: {
				setFilterBarInputState({
					...filterBarInput,
					assignee: updatedValue,
				});
				break;
			}
			case CATEGORY_KOR.LABEL: {
				setFilterBarInputState({
					...filterBarInput,
					label: updatedValue,
				});
				break;
			}
			case CATEGORY_KOR.MILESTONE: {
				setFilterBarInputState({
					...filterBarInput,
					milestone: updatedValue,
				});
				break;
			}
			case CATEGORY_KOR.AUTHOR: {
				setFilterBarInputState({
					...filterBarInput,
					author: updatedValue,
				});
				break;
			}
			case CATEGORY_KOR.FILTER: {
				setFilterBarInputState({
					...filterBarInput,
					issue: updatedValue,
				});
				break;
			}
			default: {
				console.error("setFilterStateByType unhandled type");
			}
		}
	};

	const filterDataByType = filterData[getEngKey(filterType)];

	return (
		<FilterModalLayout
			className="filter-modal"
			isLeftFilter={filterType === CATEGORY_KOR.FILTER ? true : false}
		>
			<FormControl component="fieldset">
				<FilterTitle component="legend">
					{filterType === CATEGORY_KOR.FILTER ? "" : filterType} 필터
				</FilterTitle>
				<RadioGroup
					aria-label="issue"
					name="issue"
					value={clickedFilter}
					onClick={handleChange}
				>
					{filterDataByType &&
						filterDataByType.map((text, idx) => (
							<FilterControlLabel
								value={text}
								control={<Radio color="default" />}
								label={text}
								labelPlacement="start"
								key={`filter-control-label-${idx}`}
								checked={filterBarInput[`${getEngKey(filterType)}`] === text}
							/>
						))}
				</RadioGroup>
			</FormControl>
		</FilterModalLayout>
	);
};

const FilterModalLayout = styled.div`
	position: absolute;
	top: 110%;
	right: ${props => (props.isLeftFilter ? "" : "0")};
	width: 242px;
	background-color: white;
	text-align: left;
	border-radius: 16px;
	border: 1px solid ${({ theme }) => theme.grayScale.line};
`;

const FilterControlLabel = styled(FormControlLabel)`
	display: flex;
	justify-content: space-between;
	margin: 0;
	padding-left: 16px;
`;

const FilterTitle = styled(FormLabel)`
	width: 240px;
	background-color: ${({ theme }) => theme.grayScale.background};
	border-bottom: 1px solid ${({ theme }) => theme.grayScale.line};
	border-radius: 16px 16px 0px 0px;
	padding: 8px 16px;
	color: ${({ theme }) => theme.grayScale.title_active};
	line-height: 32px;
`;

export default FilterModal;
