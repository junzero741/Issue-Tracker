import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const TabButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${props => props._width};
	height: ${({ theme }) => theme.buttonHeights.base};
	font-size: ${({ theme }) => theme.fontSizes.xs};
	font-weight: bold;
	color: ${({ theme }) => theme.grayScale.label};
	border: 1px solid
		${props => (props._border === "none" ? "none" : props.theme.grayScale.line)};
	border-radius: ${props =>
		props._radius === "right"
			? props.theme.border_radius_mix.right
			: props._radius === "left"
			? props.theme.border_radius_mix.left
			: props.theme.border_radius_mix.all};
	background-color: ${props =>
		props.bgColor && !props.isMainPage
			? props.theme.grayScale.line
			: props.theme.grayScale.background};
	/* background-color: ${({ theme }) =>
		theme.grayScale.background}; //str넣었는데 str넣으라고 오류뜸 */
`;

export const StyledLoginButton = styled(Button)`
	width: ${({ theme }) => theme.buttonWidths.xl};
	height: ${({ theme }) => theme.buttonHeights.lg};
	font-size: ${({ theme }) => theme.fontSizes.base};
	background-color: ${({ theme }) => theme.grayScale.title_active};
	color: ${({ theme }) => theme.grayScale.off_white};
	border-radius: ${({ theme }) => theme.border_radius.base};
	&:hover {
		background-color: ${({ theme }) => theme.grayScale.body};
	}
`;
