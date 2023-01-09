import { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { STICKER_LIST } from '../../../constant/StickerIconList';
import { stickerInfoState } from '../../../recoil/player/atom';
import { pictureSelector } from '../../../recoil/player/selector';
import { StickerLocation } from '../../../types/voting';

interface StickerVotingProps {
  isStickerGuide: boolean;
}
const StickerVoting = (props: StickerVotingProps) => {
  const { isStickerGuide } = props;
  const [stickerVotingInfo, setStickerVotingInfo] = useRecoilState(stickerInfoState);
  const { location: stickerList, emoji } = stickerVotingInfo;
  const pictureInfo = useRecoilValue(pictureSelector(stickerVotingInfo.pictureId));
  const stickerImgRef = useRef<HTMLImageElement>(null);

  // const u = useResetRecoilState(stickerInfoState);
  // u();
  const handleAttachSticker = (e: React.MouseEvent<HTMLImageElement>) => {
    if (stickerImgRef.current && stickerList.length < 3) {
      const { offsetX, offsetY } = e.nativeEvent;

      const newSticker: StickerLocation = {
        x: Math.round((offsetX / 10 - 1) * 100) / 100,
        y: Math.round((offsetY / 10 - 1) * 100) / 100,
        degRate: Math.random() * 270 - 135,
      };
      setStickerVotingInfo((prev) => ({ ...prev, location: [...prev.location, newSticker], emoji }));
    }
  };

  return (
    <StStickerVotingWrapper>
      <StStickerImg src={pictureInfo?.url} ref={stickerImgRef} alt="selected_img" onClick={handleAttachSticker} />
      {!isStickerGuide &&
        stickerList.map((sticker, idx) => (
          <StEmojiIcon key={`sticker.x${idx}`} location={sticker} degRate={sticker.degRate}>
            {STICKER_LIST[emoji].icon()}
          </StEmojiIcon>
        ))}
    </StStickerVotingWrapper>
  );
};

export default StickerVoting;

const StStickerVotingWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-bottom: 2.6rem;

  position: relative;
`;

const StStickerImg = styled.img`
  width: 90%;
  height: 52rem;
  margin-top: 1.7rem;

  border-radius: 1rem;

  object-fit: cover;
`;
const StEmojiIcon = styled.div<{ location: StickerLocation; degRate: number }>`
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

    transform-origin: 50% 50%;
    transform: ${({ degRate }) => `rotate(${degRate}deg)`};
  }
`;