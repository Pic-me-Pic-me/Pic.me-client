// 서버에서 pictures라고 지정해서,,우리는 복수명 안되는데! 어쩔수 없었오!
export interface VotingInfo {
  vote_id: number;
  user_id: number;
  vote_status: boolean;
  vote_title: string;
  pictures: string[];
  current_vote: number;
  maximum_vote: number;
  created_date: Date;
}

export interface PictureInfo {
  picture_id: number;
  vote_id: number;
  url: string;
  count: number;
}

export interface StickerInfo {
  sticker_id: number;
  picture_id: number;
  location: string;
  emoji: number;
}

export interface CurrentVoteInfo {
  voteId: number;
  voteStatus: boolean;
  voteTitle: string;
  currentVote: number;
  createdDate: Date;
  Picture: CurrentPictureInfo[];
}

export interface CurrentPictureInfo {
  pictureId?: number;
  url: string;
  count: number;
  Sticker: GetStickerResultInfo[];
}

export interface StickerResultInfo {
  stickerLocation: StickerLocation[];
  emoji: number;
  count: number;
}
export interface GetStickerResultInfo {
  stickerLocation: string;
  emoji: number;
  count: number;
}

export interface StickerLocation {
  x: number;
  y: number;
  degRate: number;
}
