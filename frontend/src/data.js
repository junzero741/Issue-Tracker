import fetchData from "util/fetchData";
import API from "util/API";

const getUserList = async (API) => {
	const { users } = await fetchData(API, "GET");
	const idList = users.map((el) => el.githubId);
	return idList;
};

const getMilestoneList = async (API) => {
	const { milestones } = await fetchData(API, "GET");
	const milestoneList = milestones.map((el) => el.title);
	return milestoneList;
};

const getLabelList = async (API) => {
	const { labels } = await fetchData(API, "GET");
	const labelList = labels.map((el) => el.name);
	return labelList;
};

export const filterData = {
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
};

export const labelData = {
	creatorTitle: "새로운 레이블 추가",
	editorTitle: "레이블 편집",
	nameTitle: "레이블 이름",
	descriptionTitle: "설명(선택)",
	backgroundColorTitle: "배경 색상",
	textColorTitles: "텍스트 색상",
	buttons: {
		cancel: "취소",
		submit: "완료",
		radio: [
			{ value: "#FEFEFE", text: "밝은 색" },
			{ value: "#000000", text: "어두운 색" },
		],
	},
};

export const CATEGORY_ENG = {
	ASSIGNEE: "assignee",
	LABEL: "label",
	MILESTONE: "milestone",
	AUTHOR: "author",
	FILTER: "issue",
};

export const CATEGORY_KOR = {
	ASSIGNEE: "담당자",
	LABEL: "레이블",
	MILESTONE: "마일스톤",
	AUTHOR: "작성자",
	FILTER: "필터",
	OPENCLOSE: "상태 수정",
};
