import styled from 'styled-components';
import TimeAgo from 'timeago-react';

interface CurrentVoteInfoLayoutProps {
  voteTitle: string;
  createdAt: string;
  totalVoteCount: string;
  currentVoteCount: string;
}

const CurrentVoteInfoLayout = (props: CurrentVoteInfoLayoutProps) => {
  const { voteTitle, createdAt, totalVoteCount, currentVoteCount } = props;

  const createdDate = createdAt.slice(0, 10) + ' ' + createdAt.slice(11, 19);

  return (
    <>
      <StVoteTitle>
        <h1>{voteTitle}</h1>
        <span>
          <TimeAgo datetime={createdDate} locale="ko" />
        </span>
      </StVoteTitle>
      <StVoteStatus>
        <span>{totalVoteCount}</span>
        <span>{currentVoteCount}</span>
      </StVoteStatus>
    </>
  );
};

export default CurrentVoteInfoLayout;

const StVoteTitle = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_2};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  }

  & > h1 {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0.6rem 0 0.285rem 0;

    width: 34.6rem;
    // height: 5.6rem;

    ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1};
  }
`;

const StVoteStatus = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 15.1rem;
  height: 2.7rem;

  margin: 0.8rem 0 1.677rem 0;
  padding-left: 2.2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_6};
  border-radius: 3.3rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};

  ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_2};

  & > span:last-of-type {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 5.6rem;
    height: 2.7rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    border-radius: 3.3rem;
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  }
`;
