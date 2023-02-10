import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { VoteInfo } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

export const useGetVotingInfo = (vote_id: string | undefined) => {
  const { data, error } = useSWR<AxiosResponse<VoteInfo>>(`/vote/common/pictures/${vote_id}`, picmeGetFetcher, {
    // 실패시 재요청 3번
    errorRetryCount: 3,
  });
  return {
    votingInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
};
