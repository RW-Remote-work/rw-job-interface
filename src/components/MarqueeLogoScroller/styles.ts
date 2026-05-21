import { css, keyframes } from "@emotion/react";

const scrollAnimation = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-66.66%, 0, 0);
  }
`;

export const marqueeContainerStyle = css`
  width: 100%;
  height: 32px;
  opacity: 0.3;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  background-color: transparent;
  margin-bottom: 48px;
`;

export const marqueeTrackStyle = css`
  display: flex;
  align-items: center;
  gap: 90px;
  animation: ${scrollAnimation} var(--marquee-speed, 120s) linear infinite;
  width: max-content;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const logoItemStyle = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: none;
    height: 32px;
    width: auto;
    object-fit: contain;
  }
`;

export const marqueeWrapperStyle = css`
  width: 100%;
  overflow: hidden;
  display: flex;
`;
