// modules
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
//  custom
import useDarkMode from '../hooks/useDarkMode';
import { Segment } from 'semantic-ui-react';
import { makeClassName } from '../functions';

const Wysiwyg = ({ defaultValue, handleChange, disabled = false, className }) => {
	const darkMode = useDarkMode();
	const editorRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [height, setHeight] = useState(window.innerHeight - 52 - 42); // - header height - padding

	return (
		<Segment basic className={makeClassName('p-0', className)} loading={loading}>
			<Editor
				apiKey="o573yhhnwulhygskzy14u3gic8yzvzzi3h2ofbtivev4qgmt"
				onInit={(evt, editor) => {
					setLoading(false);
					editorRef.current = editor;
				}}
				initialValue={defaultValue}
				onEditorChange={(value, editor) => handleChange(value)}
				disabled={disabled}
				init={{
					language: 'fr_FR',
					height: height,
					menubar: false,
					toolbar_sticky: true,
					toolbar_sticky_offset: 52,
					toolbar_mode: 'wrap',
					contextmenu: 'paste link',
					relative_urls: false,
					convert_urls: false,
					remove_script_host: false,
					plugins: [
						// 'print',
						// 'preview',
						'paste',
						'importcss',
						'searchreplace',
						'autolink',
						// 'autosave',
						// 'save',
						// 'directionality',
						'code',
						'visualblocks',
						'visualchars',
						'fullscreen',
						'image',
						'link',
						'codesample',
						'table',
						'charmap',
						// 'hr',
						'pagebreak',
						'nonbreaking',
						// 'anchor',
						// 'toc',
						'insertdatetime',
						'advlist',
						'lists',
						// 'imagetools',
						// 'textpattern',
						'noneditable',
						'help',
						'charmap',
						'quickbars',
						// 'emoticons',
						// 'wordcount',
					],
					toolbar:
						'undo redo variables fontfamily fontsize blocks | bold italic underline strikethrough forecolor backcolor removeformat | divided alignleft aligncenter alignright alignjustify | blockquote outdent indent numlist bullist | pagebreak | link charmap image table | code fullscreen',
					quickbars_selection_toolbar:
						'bold italic quicklink h1 h2 h3 | alignleft aligncenter alignright alignjustify',
					quickbars_insert_toolbar: 'variables link divided quicktable',
					content_style:
						'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } table td p{ margin: 0px } p + p { margin-top: 0px}',
					skin: darkMode ? 'oxide-dark' : 'oxide',
					content_css: darkMode ? 'dark' : 'default',
				}}
			/>
		</Segment>
	);
};

export default Wysiwyg;
