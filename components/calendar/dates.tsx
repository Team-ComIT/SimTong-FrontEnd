import styled from '@emotion/styled';
import * as GetDay from './func';

const Dates = ({ month, year }: any) => {
	return (
		<>
			<hr />
			<MainDiv>
				<Slide scale={1} onClick={() => month.setState(month.state - 1)} />
				<span>
					{GetDay.getYear(month.state, year)}년 {GetDay.getMonth(month.state)}월
				</span>
				<Slide scale={-1} onClick={() => month.setState(month.state + 1)} />
			</MainDiv>
		</>
	);
};

export default Dates;

const MainDiv = styled.div`
	width: 100%;
	height: 60px;
	display: inline-flex;
	justify-content: space-between;
	padding: 0px 14px;
	align-items: center;
	font-size: 18px;
	font-weight: bold;
`;

const Slide = styled.div<{ scale: number }>`
	cursor: pointer;
	width: 12.35px;
	height: 20px;
	background-image: url("data:image/svg+xml,%3Csvg width='13' height='21' viewBox='0 0 13 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.3997 18.25L4.76632 10.6L12.3997 2.94998L10.0497 0.599976L0.0496578 10.6L10.0497 20.6L12.3997 18.25Z' fill='%237C7C7C'/%3E%3C/svg%3E%0A");
	transition: all 0.2s ease;
	transform: translateY(0%) scale(${props => props.scale}, 1);
	&:active {
		transform: translateY(20%) scale(${props => props.scale}, 1);
	}
`;
