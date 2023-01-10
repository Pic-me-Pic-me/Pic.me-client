import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

import { EmptyIcon } from '../../asset/image';
import { getUserInfo } from '../../lib/api/auth';
import { getCurrentVoteData } from '../../lib/api/voting';
import { VoteInfo } from '../../types/voting';
import VoteCard from './VoteCard';

const VoteList = () => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const [dataList, setDataList] = useState<VoteInfo[]>();
  const [CursorId, setCursorId] = useState(0);
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    getUserName();
    getMoreItem();
  }, []);

  useEffect(() => {
    if (dataList?.length !== 0 && inView) {
      getMoreItem();
    }
  }, [inView]);

  const getUserName = async () => {
    const name = await getUserInfo();
    setUserName(name?.data.userName);
  };

  const getMoreItem = async () => {
    const newData = await getCurrentVoteData(Number(CursorId));

    if (!dataList) {
      setDataList(newData?.result);
    }
    if (newData) {
      if (dataList) {
        setDataList(dataList.concat(newData.result));
        setCursorId(newData.resCursorId);
      }
    }
  };

  return (
    <>
      <StCurrentVote>현재 진행중인 투표</StCurrentVote>
      {dataList ? (
        <StVoteListWrapper>
          {dataList?.map((data, i) => (
            <VoteCard voteData={data} key={i} />
          ))}
          <div ref={ref} />
        </StVoteListWrapper>
      ) : (
        <StEmptyView>
          <img src={EmptyIcon} alt="현재 진행중인 투표 없음" />
          <p>{userName}님 만의 투표를</p>
          <p>만들어보세요!</p>
        </StEmptyView>
      )}
    </>
  );
};

export default VoteList;

const StCurrentVote = styled.h1`
  padding: 0rem 2rem;
  margin: 5.1rem 0rem 1.3rem 0rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_Bold_20};
`;

const StVoteListWrapper = styled.main`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;

  padding-bottom: 19.3rem;
  height: 15.4rem;

  cursor: pointer;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StEmptyView = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 5.1rem;
  padding-bottom: 19.3rem;

  > img {
    width: 13.8rem;
    height: 11rem;
    margin-bottom: 1.8rem;
  }
  > p {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  }
`;