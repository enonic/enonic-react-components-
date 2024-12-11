import type {Region as RegionType} from '@enonic-types/core';

// import * as PropTypes from 'prop-types';
import * as React from 'react';
import ComponentTag from './ComponentTag';

/**
 * @param {string} name - Region name, as defined in a part's/page's/layout's XML definition
 * @param {Object} regionData - data object for this specific region, from part or page or layout data
 *     (e.g. for the 'main' region in a page, regionData could be: content.page.regions.main)
 * @param {string} [tag] - Sets the HTML tag for the region. If omitted, "div" is the default.
 * @param {string} [addClass] - Adds an HTML class for the region, after "xp-region".
 * @returns A react4xp-representation (react component) of an XP region. Must be SERVER-SIDE-rendered by react4xp!
 */
const Region = ({
	name,
	regionData,
	tag,
	addClass
}: {
	name: string
	regionData: RegionType
	tag?: string
	addClass?: string
}): React.JSX.Element => {
	if (!((name || '').trim())) {
		console.error(`<Region NO_NAME> name: ${JSON.stringify(name)}`);
		throw Error(`Can't render <Region> without a 'name' prop.`);
	}

	if (
		!regionData ||
		typeof regionData !== 'object' ||
		!Object.keys(regionData).length
	) {
		console.error(`<Region "${name}"> regionData: ${JSON.stringify(regionData)}`);
		throw Error(`Can't render <Region "${name}"> without a 'regionData' prop.`);
	}

	const TAG = (tag || "div") as keyof JSX.IntrinsicElements;
	return <TAG
		data-portal-region={name}
		className={"xp-region" + (addClass ? ` ${addClass}` : '')}
		dangerouslySetInnerHTML={{
			__html: `\t\t\t\t\t${
				regionData.components && regionData.components.length > 0 ?
					regionData.components
						.map(component => ComponentTag(component))
						.join('\n') :
					''
			}\t\t\t\t\t\n`,
		}}
	></TAG> // as React.JSX.Element;
};
// Region.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	regionData: PropTypes.shape({
// 		components: PropTypes.arrayOf(PropTypes.shape({
// 			path: PropTypes.string.isRequired,
// 		})),
// 	}).isRequired,
// 	tag: PropTypes.string,
// 	addClass: PropTypes.string,
// };

export default Region;
