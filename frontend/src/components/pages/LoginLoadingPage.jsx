import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import API from "util/API";

const LoginLoadingPage = () => {
	const [isLogin, setIsLogin] = useState(false);
	const getToken = async () => {
		const params = new URLSearchParams(window.location.search);
		const code = params.get("code");
		const res = await fetch(API.login(code));
		const json = await res.json();
		const { accessToken, tokenType } = json;
		accessToken && localStorage.setItem("accessToken", accessToken);
		tokenType && localStorage.setItem("tokeType", tokenType);
		if (res.ok) setIsLogin(true);
		if (!res.ok) setIsLogin(false);
	};
	useEffect(() => {
		getToken();
	}, []);

	return <>{isLogin ? <Redirect to="/main" /> : <>Loading..</>}</>;
};

export default LoginLoadingPage;
