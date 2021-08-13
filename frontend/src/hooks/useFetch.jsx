import { useState, useEffect } from "react";

import fetchData from "util/fetchData";

const useFetch = (url, method, callback, reqData = null) => {
	const [status, setStatus] = useState("대기 중");
	const [error, setError] = useState(null);

	const option =
		method === "GET"
			? {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
			  }
			: {
					method: method,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
					body: JSON.stringify(reqData),
			  };

	const fetchData = async () => {
		try {
			setStatus(`fetch start from ${url}`);
			const res = await fetch(url, option);
			const resData = await res.json();
			if (!res.ok) throw new Error(res.status);
			else {
				callback(resData);
				setStatus(`fetch complete from ${url}`);
				return { resData, status };
			}
		} catch (error) {
			setStatus(`fetch failed from ${url} due to ${error}`);
			setError(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [url]);

	return { status, fetchData };
};

export default useFetch;
