import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] }, // ESLint가 적용될 파일 형식을
	{ languageOptions: { globals: globals.browser } }, // 브라우저 환경에서 사용되는 전역 변수를 지정

	pluginJs.configs.recommended, // JavaScript에 대한 ESLint의 권장 규칙을 가져옴
	...tseslint.configs.recommended, // TypeScript에 대한 권장 규칙을 확장
	pluginReact.configs.flat.recommended, // React에 대한 권장 규칙을 가져옴

	{
		plugins: ['prettier'], // Prettier 플러그인을 추가하여 코드 포맷팅 규칙을 ESLint와 통합
		extends: ['plugin:prettier/recommended'], // Prettier와 관련된 ESLint 규칙을 적용
		rules: {
			'prettier/prettier': 'error', // Prettier 규칙을 위반할 경우 오류를 발생시킴
		},
	},
];
