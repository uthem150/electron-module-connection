import styled from '@emotion/styled';
import { Gray_01, Gray_05 } from '../../../utils/Colors';

interface StyledCommonButtonProps {
	color?: string;
	gap?: string;
	iconPosition?: 'left' | 'right' | 'top' | 'bottom';
}

// 스타일이 적용된 StyledCommonButton 컴포넌트를 정의
export const StyledCommonButton = styled.div<StyledCommonButtonProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${({ gap }) => gap || '1rem'};
	color: ${({ color }) => (color ? '#fff' : Gray_01)};
	border: ${({ color }) => (color ? 'none' : `1px solid ${Gray_05}`)};

	// iconPosition에 따라 flex-direction이 변경
	flex-direction: ${({ iconPosition }) => {
		switch (iconPosition) {
			case 'left':
				return 'row';
			case 'right':
				return 'row-reverse';
			case 'top':
				return 'column';
			case 'bottom':
				return 'column-reverse';
			default:
				return 'row';
		}
	}};

	cursor: pointer;
	user-select: none; // 텍스트를 선택할 수 없도록 설정(드래그 방지)
	&:hover {
		opacity: 0.8;
	}
`;
