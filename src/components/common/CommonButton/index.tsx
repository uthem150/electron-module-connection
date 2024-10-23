import React from 'react';
import { StyledCommonButton } from './CommonButton.style';

interface CommonButtonProps {
	children?: React.ReactNode;
	icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; // SVG Icon 직접 표시
	iconPosition?: 'left' | 'right' | 'top' | 'bottom';
	imgSrc?: string; // img src로 icon 처럼 사용
	onClick?: () => void;
	color?: string;
	gap?: string;
	style?: React.CSSProperties;
}

const CommonButton = (props: CommonButtonProps) => {
	const { children, icon: Icon, iconPosition, imgSrc, onClick, color, gap, style } = props;
	return (
		<StyledCommonButton onClick={onClick} color={color} gap={gap} iconPosition={iconPosition} style={style}>
			{Icon && <Icon />}
			{imgSrc && <img src={imgSrc} />}
			{children}
		</StyledCommonButton>
	);
};
export default CommonButton;
