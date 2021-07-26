import { useState } from "react";
import styled from "styled-components";
import { StyledGridTitleCard } from "styles/StyledCards";
import theme from "styles/theme";

const MilestonesHeader = ({ milestone }) => {
	const [showOpenedOnes, setShowOpendOnes] = useState(true);
	console.log("milestones:", milestone);

	const getColor = () => {
		return showOpenedOnes ? "#000000" : `${theme.grayScale.label}`;
	};

	return (
		<StyledGridTitleCard gridRate={[1]}>
			<Contents>
				<Title>{milestone && milestone.length}개의 마일스톤</Title>
			</Contents>
		</StyledGridTitleCard>
	);
};

export default MilestonesHeader;

const Contents = styled.div`
	display: flex;
	justify-content: space-between;
	width: 20%;
	align-items: center;
`;

const Title = styled.div`
	padding: ${({ theme }) => `0 ${theme.paddings.xxxl}`};
	color: ${({ theme }) => theme.grayScale.label};
`;
