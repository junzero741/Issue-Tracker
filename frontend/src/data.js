export const filterData = {
	issue: [
		"열린 이슈",
		"내가 작성한 이슈",
		"나에게 할당된 이슈",
		"내가 댓글을 남긴 이슈",
		"닫힌 이슈",
	],
	assignee: ["daisy", "goody"],
	label: ["bug", "document"],
	milestone: ["마일스톤이 없는 필터", "마스터즈 코스"],
	author: ["daisy", "goody"],
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
