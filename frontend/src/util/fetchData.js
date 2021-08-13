const fetchData = async (url, method, reqData = undefined) => {
	let option;
	if ((method === "GET") | (method === "DELETE")) {
		if (reqData) {
			option = {
				method: method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
				body: JSON.stringify(reqData),
			};
		} else {
			option = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			};
		}
	} else {
		option = {
			method: method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
			body: JSON.stringify(reqData),
		};
	}

	try {
		const res = await fetch(url, option);
		const resData = await res.json();
		if (!res.ok) throw new Error(res.status);
		else {
			return await resData;
		}
	} catch (error) {
		console.error("error occurred");
	}
};

export default fetchData;
