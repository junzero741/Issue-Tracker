import fetchData from "util/fetchData";

export const getUserList = async API => {
	const { users } = await fetchData(API, "GET");
	const idList = users.map(el => el.githubId);
	return idList;
};

export const getMilestoneList = async API => {
	const { milestones } = await fetchData(API, "GET");
	const milestoneList = milestones.map(el => el.title);
	return milestoneList;
};

export const getLabelList = async API => {
	const { labels } = await fetchData(API, "GET");
	const labelList = labels.map(el => el.name);
	return labelList;
};
