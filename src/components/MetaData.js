import Head from 'next/head';

const defaultTitle = 'Coup Critique | Votre référence en stratégie Pokémon';
const defaultDescription =
	"Le site de référence en stratégie Pokémon française. Vous pourrez y trouver et partager des équipes efficaces en combat classé sur des tiers Smogon comme l'OverUsed ou sur console avec le VGC et le BSS.";
const defaultImage = 'keldeo-landorus.png';

const MetaData = ({
	title = defaultTitle,
	description = defaultDescription,
	image = defaultImage,
	nofollow = false,
}) => (
	<Head>
		<title>{title}</title>
		<meta name="title" content={title} />
		<meta name="og:title" content={title} />
		{!!description && (
			<>
				<meta name="description" content={description} />
				<meta name="og:description" content={description} />
			</>
		)}
		{!!image && (
			<meta
				property="og:image"
				content={'https://www.coupcritique.fr/images/' + image}
			/>
		)}
		{nofollow ? (
			<meta name="robots" content="noindex, nofollow" />
		) : (
			<meta name="robots" content="index, follow" />
		)}
	</Head>
);
export default MetaData;
