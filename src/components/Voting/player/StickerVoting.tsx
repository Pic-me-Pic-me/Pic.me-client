import { useRef, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { StickerTest } from '../../../asset/image';
import { STICKER_LIST } from '../../../constant/StickerIconList';
import { stickerInfoState } from '../../../recoil/player/atom';
import { StickerLocation } from '../../../types/voting';

const StickerVoting = () => {
  const [stickerVotingInfo, setStickerVotingInfo] = useRecoilState(stickerInfoState);
  // const tickerVotingInf = useResetRecoilState(stickerInfoState);
  // tickerVotingInf();
  const { location: stickerList } = stickerVotingInfo;
  const emoji = stickerVotingInfo.emoji;

  const stickerImgRef = useRef<HTMLImageElement>(null);

  const handleAttachSticker = (e: React.MouseEvent<HTMLImageElement>) => {
    if (stickerImgRef.current) {
      const { offsetX, offsetY } = e.nativeEvent;

      const newSticker: StickerLocation = {
        x: Math.round((offsetX / 10 - 2.65) * 100) / 100,
        y: Math.round((offsetY / 10 - 2.65) * 100) / 100,
      };
      setStickerVotingInfo((prev) => ({ ...prev, location: [...prev.location, newSticker], emoji }));
    }
  };

  return (
    <StStickerVotingWrapper>
      <StStickerImg src={StickerTest} ref={stickerImgRef} alt="selected_img" onClick={handleAttachSticker} />
      {stickerList.map((sticker) => (
        <StEmojiIcon key={sticker.x} location={sticker}>
          {STICKER_LIST[emoji - 1].icon()}
        </StEmojiIcon>
      ))}
    </StStickerVotingWrapper>
  );
};

export default StickerVoting;

const StStickerVotingWrapper = styled.section`
  position: relative;

  margin-top: 2.3rem;
  margin-bottom: 2.4rem;

  z-index: 0;
`;

const StStickerImg = styled.img`
  width: 39rem;
  height: 52rem;

  border-radius: 1rem;

  object-fit: cover;
`;
const StEmojiIcon = styled.div<{ location: StickerLocation }>`
  position: absolute;
  left: ${({ location }) => location.x}rem;
  top: ${({ location }) => location.y}rem;

  & > svg {
    position: absolute;
    left: 0;
    top: 0;

    width: 5.3rem;
    height: 5.3rem;

    z-index: 3;
  }
`;
