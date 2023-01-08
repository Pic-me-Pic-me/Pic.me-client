import qs from 'qs';

import { client } from '../axios';
import { VotingInfo } from './../../types/voting';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

export interface VoteInfo {
  voteId: number;
  title: string;
  voteThumbnail: string;
  createdAt: Date;
  totalVoteCount: number;
}

export interface Result {
  result: VoteInfo[];
}

export interface VoteListData {
  status: number;
  success: boolean;
  message: string;
  data: Result;
  resCursorId: number;
}

export const getCurrentVoteData = async (resCursorId: number) => {
  console.log('test');
  try {
    console.log('test2');
    const data = await client.get<VoteListData>(`vote/getCurrentVote/${resCursorId}`);
    console.log('ddd', data);
    return data.data.data.result;
  } catch (err) {
    console.error(err);
  }
};
