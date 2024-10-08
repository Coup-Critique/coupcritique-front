// modules
import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
//  custom
import { FormTextArea, Loader, Message, Segment } from 'semantic-ui-react';
import { makeClassName } from '@/functions';
import { useSelector } from 'react-redux';

// dynamic load Wysiwyg if not on the page by default

const Wysiwyg = ({ defaultValue, handleChange, disabled = false, className }) => {
	const darkMode = useSelector(state => state.darkMode);
	const editorRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [readOnly, setReadOnly] = useState(false);
	const [height, setHeight] = useState(window.innerHeight - 52 - 42); // - header height - padding
	const [cssPath, setCssPath] = useState(null);

	useEffect(() => {
		const stylesheet = document.querySelector('head link[rel="stylesheet"]');
		if (stylesheet) {
			setCssPath(stylesheet.href);
		} else {
			setCssPath('dark');
		}
	}, []);

	if (readOnly) {
		return (
			<>
				<FormTextArea
					value={defaultValue}
					onChange={e => handleChange(e.target.value)}
					style={{ height }}
				/>
				<Message warning>
					L'éditeur est arrivé au bout de son crédit d'utilisation, veuillez
					pinguer Azeralt sur Discord.
				</Message>
			</>
		);
	}
	// if (!cssPath) return <Loader active inline="centered" />;
	return (
		<Segment basic className={makeClassName('p-0', className)} loading={loading}>
			<Editor
				apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
				onInit={(evt, editor) => {
					setLoading(false);
					editorRef.current = editor;
					setReadOnly(editor.readonly);
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
					skin: darkMode ? 'oxide-dark' : 'oxide',
					content_css: cssPath,
					// content_css: darkMode ? 'dark' : 'default',
					body_class: makeClassName(
						'app m-0 description framed wysiwyg-result overflow-auto',
						darkMode && 'dark-mode'
					),
					block_formats: 'Paragraphe=p; Titre 2=h2; Titre 3=h3; Titre 4=h4;',
					plugins: [
						// 'print',
						// 'preview',
						// 'paste',
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
						// 'charmap',
						// 'hr',
						// 'pagebreak',
						'nonbreaking',
						// 'anchor',
						// 'toc',
						'insertdatetime',
						'advlist',
						'lists',
						// 'imagetools',
						// 'textpattern',
						// 'noneditable',
						'help',
						'quickbars',
						// 'emoticons',
						// 'wordcount'',
						'accordion',
					],
					toolbar:
						'undo redo blocks | bold italic underline strikethrough forecolor backcolor removeformat | divided alignleft aligncenter alignright alignjustify | blockquote outdent indent numlist bullist | link image accordion table | code fullscreen',
					quickbars_selection_toolbar:
						'bold italic quicklink h2 h3 h4 | alignleft aligncenter alignright alignjustify',
					quickbars_insert_toolbar: 'link divided quicktable',
					setup: editor => {
						editor.ui.registry.addButton('divided', {
							tooltip: 'Insérer 2 bloques horizontaux',
							icon: 'flip-horizontally',
							onAction: () => {
								editor.execCommand(
									'mceInsertContent',
									false,
									`<table style="border: 0px solid white; width: 100%">
										<tbody>
											<tr>
												<td style="border: 0px solid white; text-align: left; padding: 0;">Écrire à gauche</td>
												<td style="border: 0px solid white; text-align: right; padding: 0;">Écrire à droite</td>
											</tr>
										</tobdy>
									</table>`
								);
							},
						});
					},
				}}
			/>
		</Segment>
	);
};

export default Wysiwyg;
