// modules
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Loader } from 'semantic-ui-react';
// hooks
import useFetch from '@/hooks/useFetch';
import ActualityTeaser from '@/components/elements/ActualityTeaser';
// components

function SectionActuality() {
	const ssrData = useSelector(state => state.ssrData);
	const [result, load, loading] = useFetch();
	const [actualities, setActualities] = useState(ssrData?.home_actualities || []);

	useEffect(() => {
		if (!actualities.length) {
			load({ url: `actualities?maxLength=3` });
		}
	}, []);

	useEffect(() => {
		if (result?.success) {
			setActualities(result.actualities);
		}
	}, [result]);

	if (!actualities.length && !loading) return null;
	return (
		<section className="section-news">
			<div className="ui container">
				<h2>
					<Link href="/entity/actualities">Actualités</Link>
				</h2>
				<div className="mb-4">
					{loading ? (
						<Loader active inline="centered" />
					) : (
						<div className="row">
							{actualities.map(actuality => (
								<div
									key={actuality.id}
									className="col-12 col-lg-4 d-flex flex-column"
								>
									<ActualityTeaser
										actuality={actuality}
										// btnProps={{ color: 'blue', inverted: true }}
									/>
								</div>
							))}
						</div>
					)}
				</div>
				<Link href="/entity/actualities" className="btn btn-light">
					Voir toutes les actualités
				</Link>
			</div>
		</section>
	);
}
export default SectionActuality;
