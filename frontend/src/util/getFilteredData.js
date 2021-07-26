const getFilteredData = (type, value, data) => {
	if (type === "assignees") {
		const result = data.forEach(x => {
			const { assignees } = x;
			const assignee = assignees.forEach(x => {
				if (x.githubId !== value) return false;
			});

			const { githubId } = assignees;
		});
	}
};

export default getFilteredData;

// [["assignee", "damilog"], ["milestone", "한라산 정상 찍기"]]
// const getFilteredData = (filters, data) => {
// 	if (!filters || !data) return;
// 	console.log("filters", filters);
// 	console.log("data", data);

// 	return filters.reduce((res, filter) => {
// 		const [type, payload] = filter;
// 		console.log("res", res);
// 		return res.filter(x => x[type] === payload);
// 	}, data);
// };

// const result = data
// 	.filterData("assignee", "damilog")
// 	.filterData("label", "red");

// const pipe = (...funcs) => v => {
// 	return funcs.reduce((res, func) => {
// 		return func(res);
// 	}, v);
// };

// pipe(
//   filter(u => u.age >= 18),
//   map(u => u.name),
// )(users) //["Jack", "Milady"]

// pipe(mapWords, reduceWords)(['foo', 'bar', 'baz']);
