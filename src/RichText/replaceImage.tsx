import type {
	LiteralUnion,
	RequestMode,
} from '@enonic-types/core';
import type {Element} from 'domhandler';
import type {ImageComponent, ImageData, ImageComponentParams} from '../types';


import {IMG_ATTR} from '../constants';
import {cssToReactStyle} from './cssToReactStyle';
import {ErrorComponent} from '../Common/ErrorComponent';
import {ErrorBoundaryWrapper} from './ErrorBoundary/ErrorBoundaryWrapper';


export function replaceImage<RestProps = Record<string, unknown>>({
	el,
	Image,
	images,
	mode,
	...restProps
}: {
	el: Element
	Image: ImageComponent<RestProps>
	images?: ImageData[]
	mode?: LiteralUnion<RequestMode>
}) {
	if (!images || !images.length) {
		return <ErrorComponent>Can't replace image, when there are no images in the data object!</ErrorComponent>
	}

	const imageRef = el.attribs[IMG_ATTR];
	if (!imageRef) {
		return <ErrorComponent>Image element has no data-image-ref attibute!</ErrorComponent>
	}

	const imageData = images.find(data => data.ref === imageRef);
	if (!imageData) {
		return <ErrorComponent>Unable to find image with ref {imageRef} in images object!</ErrorComponent>
	}

	const {
		attribs: {
			alt,
			sizes,
			src,
			srcset: srcSet,
			style: styleStr = ''
		}
	} = el;

	const style = cssToReactStyle(styleStr);

	const {
		image,
		style: imageStyle
	} = imageData;

	const imgProps = {...restProps, alt, image, imageStyle, sizes, src, srcSet, style} as ImageComponentParams<RestProps>;

	return <ErrorBoundaryWrapper mode={mode}>
		<Image {...imgProps} />
	</ErrorBoundaryWrapper>;
}
