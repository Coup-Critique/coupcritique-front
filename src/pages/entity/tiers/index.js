import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Loader, Card } from 'semantic-ui-react';
//
import Tier from '@/components/elements/Tier';
import ScrollReveal from '@/components/ScrollReveal';
import SectionAds from '@/components/sections/SectionAds';
import PageWrapper from '@/components/PageWrapper';
import GenSelector from '@/components/GenSelector';
import { ART_ITM } from '@/constants/img';
import useFetch from '@/hooks/useFetch';

const TierList = () => {
	const gen = useSelector(state => state.gen);
	const [result, load, loading] = useFetch();
	const [tiers, setTiers] = useState([]);

	useEffect(() => {
		load({ url: `tiers?gen=${gen}` });
	}, [gen]);

	useEffect(() => {
		if (result?.tiers) {
			setTiers(result.tiers);
		}
	}, [result]);

	return (
		<PageWrapper
			title="Liste des Tiers"
			more
			metatitle="Tiers Smogon et des formats officiels Pokémon | Coup Critique Stratégie Pokémon"
			description="Liste des tiers Smogon et des formats officiels de Pokémon. Retrouvez-y la liste des Pokémon viables dans chaque tier ainsi que des ressources associées."
		>
			<GenSelector />
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader active inline="centered" />
				) : tiers && tiers.length ? (
					<div className="list-tier">
						{tiers.map(tier => (
							<ScrollReveal
								key={tier.id}
								className="ui card tier-art"
								animation="zoomIn"
							>
								<Link className="image" href={`/entity/tiers/${tier.id}`}>
									<img
										src={`/images/tiers/${tier.gen}-${
											tier.shortName || tier.name
										}.png`}
										alt={tier.name}
										width={ART_ITM}
										height={ART_ITM}
									/>
									<span className="sr-only">{tier.name}</span>
								</Link>
								<Card.Content>
									<Link href={`/entity/tiers/${tier.id}`}>
										<Tier
											tier={tier}
											displayGen={false}
											className="mr-2"
											noLink
										/>{' '}
										<span>{tier.name}</span>
									</Link>
								</Card.Content>
							</ScrollReveal>
						))}
					</div>
				) : (
					<p>Aucun tier trouvé.</p>
				)}
				<SectionAds className="mt-4" />
			</div>
		</PageWrapper>
	);
};

export default TierList;
