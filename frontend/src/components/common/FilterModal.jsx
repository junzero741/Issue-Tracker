import { useState, useEffect } from "react";
import {
	filterBarInputState,
	clickedFilterState,
	selectedCardsState,
	issueListUpdateState,
	queryStringState,
} from "RecoilStore/Atoms";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { CATEGORY_KOR } from "data";
import getEngKey from "util/getEngKey";
import styled from "styled-components";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import API from "util/API";
import fetchData from "util/fetchData";
import getQueryString from "util/getQueryString";
import {
	getUserList,
	getLabelList,
	getMilestoneList,
} from "util/getFilterList";

const FilterModal = () => {
	const [clickedFilter, setClickedFilterState] = useState("");
	const filterType = useRecoilValue(clickedFilterState);
	const [filterBarInput, setFilterBarInputState] =
		useRecoilState(filterBarInputState);
	const [selectedCards, setSelectedCards] = useRecoilState(selectedCardsState);
	const forceUpdate = useSetRecoilState(issueListUpdateState);
	const [queryString, setQueryString] = useRecoilState(queryStringState);
	const handleChange = event => {
		setClickedFilterState(event.target.value);
		setFilterStateByType(event.target.value);
		onFilterValueClicked(event.target.value);
	};
	const [filterData, setFilterData] = useState({
		issue: [
			"열린 이슈",
			"내가 작성한 이슈",
			"나에게 할당된 이슈",
			"내가 댓글을 남긴 이슈",
			"닫힌 이슈",
		],
		assignee: getUserList(API.users()),
		label: getLabelList(API.labels()),
		milestone: getMilestoneList(API.milestones()),
		author: getUserList(API.users()),
		openClose: ["선택된 이슈 열기", "선택된 이슈 닫기"],
	});

	const onFilterValueClicked = value => {
		switch (value) {
			case "선택된 이슈 열기":
				openCloseIssues("open");
				break;
			case "선택된 이슈 닫기":
				openCloseIssues("close");
				break;
			default:
				console.error("unhandled filter value");
		}
	};

	const openCloseIssues = async openClose => {
		selectedCards.forEach(async cardId => {
			const { issue } = await fetchData(API.issue(cardId), "GET");
			await fetchData(API.issue(issue.id), "PUT", {
				title: issue.title,
				open: openClose === "open" ? true : false,
			});
			await forceUpdate(x => !x);
		});
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
			case CATEGORY_KOR.OPENCLOSE: {
				setFilterBarInputState({
					...filterBarInput,
					openClose: updatedValue,
				});
				break;
			}
			default: {
				console.error("setFilterStateByType unhandled type");
			}
		}
	};

	const [list, setList] = useState([]);

	const filterDataByType = async () => {
		const res = await filterData[getEngKey(filterType)];
		setList(res);
	};

	useEffect(() => {
		filterDataByType();
	}, []);

	useEffect(() => {
		setQueryString(getQueryString(filterBarInput));
	}, [filterBarInput]);

	return (
		<FilterModalLayout
			className="filter-modal"
			isLeftFilter={filterType === CATEGORY_KOR.FILTER}
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
					{list.length &&
						list.map((text, idx) => (
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
