import { atom, selector } from "recoil";
import { CATEGORY_ENG } from "data";
export const selectedIssueCntState = atom({
	key: "selectedIssueCntState",
	default: 0,
});

export const selectedCardsState = atom({
	key: "selectedCardsState",
	default: new Set(),
});

export const clickedFilterState = atom({
	key: "clickedFilterState",
	default: null,
});

export const filterBarInputState = atom({
	key: "filterBarInputState",
	default: {
		placeholder: "is:issue is:open",
		assignee: null,
		label: null,
		milestone: null,
		author: null,
		issue: null,
		openClose: null,
	},
});

export const labelButtonFlagState = atom({
	key: "labelButtonFlagState",
	default: true,
});

export const milestoneButtonFlagState = atom({
	key: "milestoneButtonFlag",
	default: false,
});

export const milestoneAddButtonFlagState = atom({
	key: "milestoneAddButtonFlagState",
	default: false,
});

export const issueListUpdateState = atom({
	key: "issueListUpdateState",
	default: false,
});

export const milestoneUpdateState = atom({
	key: "milestoneAddButtonFlagState",
	default: false,
});

export const issueDetailUpdateState = atom({
	key: "issueDetailUpdateState",
	default: false,
});

export const labelUpdateState = atom({
	key: "labelUpdateState",
	default: false,
});

export const labelInitialData = atom({
	key: "labelInitialData",
	default: null,
});
export const labelAddButtonFlagState = atom({
	key: "labelAddButtonFlagState",
	default: false,
});

export const labelEditButtonFlagState = atom({
	key: "labelEditButtonFlagState",
	default: false,
});

export const navigatorAddButtonFlagState = atom({
	key: "navigatorAddButtonFlagState",
	default: false,
});

export const milestoneCountState = atom({
	key: "milestoneCountState",
	default: 0,
});

export const labelCountState = atom({
	key: "labelCountState",
	default: 0,
});

export const assigneeCategoryState = atom({
	key: "assigneeCategoryState",
	default: [],
});

export const labelCategoryState = atom({
	key: "labelCategoryState",
	default: [],
});

export const milestoneCategoryState = atom({
	key: "milestoneCategoryState",
	default: {},
});
//현재 클릭된 카테고리가 담김. set을 통해 리셋 가능
export const categorySelectorState = selector({
	key: "categorySelectorState",
	get: ({ get }) => {
		const assignee = get(assigneeCategoryState);
		const label = get(labelCategoryState);
		const milestone = get(milestoneCategoryState);
		return {
			assignee: assignee,
			label: label,
			milestone: milestone,
		};
	},
	set: ({ set }) => {
		set(assigneeCategoryState, []);
		set(labelCategoryState, []);
		set(milestoneCategoryState, {});
	},
});

export const commentInputState = atom({
	key: "commentInputState",
	default: {
		issueId: "",
		content: "",
	},
});

export const categoryIdSelectorState = selector({
	key: "categoryIdSelectorState",
	get: ({ get }) => {
		const assignee = get(assigneeCategoryState).map(el => el.id);
		const label = get(labelCategoryState).map(el => el.id);
		const milestone = get(milestoneCategoryState).id;

		return {
			assignee: assignee,
			label: label,
			milestone: milestone,
		};
	},
});

export const filterClickFlagState = atom({
	key: "filterClickFlagState",
	default: false,
});

export const currentIssueId = atom({
	key: "currentIssueId",
	default: null,
});

export const queryStringState = atom({
	key: "queryStringState",
	default: "",
});

export const issuesDataState = atom({
	key: "issuesDataState",
	default: null,
});

export const openIssueFlagState = atom({
	key: "openIssueFlagState",
	default: true,
});
