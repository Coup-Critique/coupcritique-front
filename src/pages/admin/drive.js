// modules
import React, { useEffect, useState } from 'react';
import { Icon, Loader, Popup, Segment } from 'semantic-ui-react';
import { DELETE, POST } from '@/constants/methods';
import { copyToClipboard } from '@/functions';
import useFetch, { FILE_TYPE } from '@/hooks/useFetch';
import usePager from '@/hooks/usePager';
import useStoreQuery from '@/hooks/useStoreQuery';
import MultiImageField from '@/components/fields/MultiImageField';
import PageWrapper from '../../PageWrapper';
import PaginationPrettier from '../../PaginationPrettier';
// components

const AdminDrive = () => {
	const [files, setFiles] = useState([]);
	const [table, page, nbPages, handlePage] = usePager(50, files, query, setQueryParam);
	const [result, load, loading] = useFetch();
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery();
	const [resultImages, uploadImages, loadingImages] = useFetch();

	useEffect(() => {
		load({ url: 'drive' });
	}, []);

	useEffect(() => {
		if (result) {
			if (result.success) {
				setFiles(result.files);
			} else {
				setFiles([]);
			}
		}
	}, [result]);

	useEffect(() => {
		if (resultImages && resultImages.success) {
			load({ url: 'drive' });
		}
	}, [resultImages]);

	const handleImages = (name, files) => {
		uploadImages({
			url: `drive`,
			method: POST,
			body: files,
			contentType: FILE_TYPE,
		});
	};

	const handleRemove = i => {
		const basePage = (page - 1) * 50;
		const newFiles = files.slice();
		newFiles.splice(basePage + i, 1);
		setFiles(newFiles);
	};

	return (
		<PageWrapper title="Drive" more nofollow>
			<MultiImageField
				files={files}
				dirName="/images/drive/"
				btnColor="orange"
				handleChange={handleImages}
				nbMax={20}
				nopreview
			/>
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader active={loading} inline="centered" />
				) : (
					<div className="row">
						{table.map((file, i) => (
							<div
								className="col-12 cols-6 col-md-4 col-lg-3 col-custom-xl-5 d-flex mb-4"
								key={file.id}
							>
								<ImageCopy
									file={file}
									handleRemove={() => handleRemove(i)}
								/>
							</div>
						))}
					</div>
				)}
			</div>
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
		</PageWrapper>
	);
};

const ImageCopy = ({ file, handleRemove }) => {
	const [open, setOpen] = useState(false);
	const [timer, setTimer] = useState(null);
	const [resultDelete, loadDelete, loadingDelete] = useFetch();

	useEffect(() => {
		if (resultDelete && resultDelete.success) {
			handleRemove(file.id);
		}
	}, [resultDelete]);

	const handleOpen = () => {
		setOpen(true);

		setTimer(
			setTimeout(() => {
				handleClose();
			}, 1000)
		);
	};

	const handleClose = () => {
		setOpen(false);
		if (timer) {
			clearTimeout(timer);
			setTimer(null);
		}
	};

	const copyPath = e => {
		copyToClipboard(`https://www.coupcritique.fr/images/drive/${file.filename}`);
	};

	const handleDelete = e => {
		e.preventDefault();
		e.stopPropagation();
		loadDelete({ url: `drive/${file.id}`, method: DELETE });
		handleClose();
	};

	return (
		<Popup
			trigger={
				<Segment
					className="image-copy grow d-flex justify-content-center align-items-center"
					onClick={copyPath}
					loading={loadingDelete}
				>
					<Icon
						name="remove circle"
						color="red"
						size="large"
						link
						className="position-absolute m-0"
						style={{ top: 0, right: '-2px' }}
						onClick={handleDelete}
					/>
					<img
						src={`/images/drive/${file.filename}`}
						className="img-fluid"
						alt={file.filename}
					/>
				</Segment>
			}
			inverted
			size="small"
			content="Copié !"
			on="click"
			open={open}
			onOpen={handleOpen}
			onClose={handleClose}
			position="bottom center"
		/>
	);
};

export default AdminDrive;
