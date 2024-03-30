// modules

// components
import CircuitTourContainer from '@/containers/CircuitTourContainer';
import CircuitTourFormPage from '@/pages/entity/circuit-tours/create';

const CircuitTourUpdatePage = () => (
	<CircuitTourContainer Component={CircuitTourFormPage} update />
);

export default CircuitTourUpdatePage;
