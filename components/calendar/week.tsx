import styled from '@emotion/styled';

const Week = ({ week }: { week: string[] }) => {
	return (
		<>
			<hr />
			<MainDiv>
				{week.map((elm: string, i: number) =>
					i === 0 || i === 6 ? <div style={{ color: '#e84045' }}>{elm}</div> : <div>{elm}</div>,
				)}
			</MainDiv>
		</>
	);
};

export default Week;

const MainDiv = styled.div`
	width: 100%;
	display: inline-flex;
	font-size: 18px;
	div {
		width: 140px;
		height: 70px;
		padding: 10px 15px;
	}
`;
