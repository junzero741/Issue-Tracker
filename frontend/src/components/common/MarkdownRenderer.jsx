import MDEditor from "@uiw/react-md-editor";

const markdown = `
## 헤딩
**굵게**

일반 텍스트

\`\`\`
	코드 블럭
\`\`\`

*기울이기*
> 인용문
`;

const MarkdownRenderer = ({ content }) => {
	return (
		<>
			<MDEditor.Markdown source={content} />
		</>
	);
};

export default MarkdownRenderer;
