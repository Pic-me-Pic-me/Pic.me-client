import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { EndedVoteInfo } from '../../types/library';
import { picmeGetFetcher } from '../axios';

export const useGetAllVoteInfo = (prevLastDate: number) => {
  const { data, error } = useSWR<AxiosResponse<EndedVoteInfo[]>>(`/vote/all?flag=${prevLastDate}`, picmeGetFetcher, {
    errorRetryCount: 3,
  });

  return {
    allVoteInfo: data?.data,
    isLoading: !error && !data?.data,
    isError: error,
  };
};