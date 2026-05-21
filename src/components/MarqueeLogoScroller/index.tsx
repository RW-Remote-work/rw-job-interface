import React from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { marqueeContainerStyle, marqueeTrackStyle, logoItemStyle } from "./styles";

export interface LogoItem {
  id: string;
  src: string;
  alt: string;
}

export interface MarqueeLogoScrollerProps {
  items?: LogoItem[];
  speed?: number;
  className?: string;
}

const DEFAULT_ITEMS: LogoItem[] = [
  { id: "freshteam", src: "/svg/logo-freshteam.svg", alt: "Freshteam" },
  { id: "jobvite", src: "/svg/logo-jobvite.svg", alt: "Jobvite" },
  { id: "linkedin", src: "/svg/logo-linkedin.svg", alt: "LinkedIn" },
  { id: "personio", src: "/svg/logo-personio.svg", alt: "Personio" },
  { id: "smartrecruiters", src: "/svg/logo-smartrecruiters.svg", alt: "SmartRecruiters" },
  { id: "tellentrecruitee", src: "/svg/logo-tellentrecruitee.svg", alt: "Tellent Recruitee" },
  { id: "workday", src: "/svg/logo-workday.svg", alt: "Workday" },
];

const MarqueeLogoScroller: React.FC<MarqueeLogoScrollerProps> = ({
  items = DEFAULT_ITEMS,
  speed = 20,
  className,
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  // 使用三份内容重复实现无缝循环
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <Box
      css={marqueeContainerStyle}
      className={className}
      role="marquee"
      aria-label="Company logos scrolling"
      style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
    >
      <Box css={marqueeTrackStyle}>
        {duplicatedItems.map((item, index) => (
          <Box key={`${item.id}-${index}`} css={logoItemStyle}>
            <Image
              src={item.src}
              alt={item.alt}
              width={200}
              height={32}
              style={{ height: "32px", width: "auto" }}
              priority={index < items.length}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MarqueeLogoScroller;
