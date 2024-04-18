import type {Element} from 'domhandler';
import type {
	ImageComponent,
	ImageData
} from '../types';


import React from 'react';
import {IMG_ATTR} from '../constants';
import {ErrorBoundary} from './ErrorBoundary';
import {ErrorComponent} from './ErrorComponent';
import {findImageData} from './findImageData';


export function replaceImage({
	el,
	Image,
	images,
}: {
	el: Element
	Image: ImageComponent
	images?: ImageData[]
}) {
	if (!images || !images.length) {
		return <ErrorComponent>Can't replace image, when there are no images in the data object!</ErrorComponent>
	}
	const imageRef = el.attribs[IMG_ATTR];
	if (imageRef) {
		const imageData = findImageData({
			images,
			imageRef
		});
		if (imageData) {
			const {
				attribs: {
					alt,
					sizes,
					src,
					srcset,
					style
				}
			} = el;
			const {
				image,
				style: imageStyle
			} = imageData;
			return <ErrorBoundary Fallback={({error}) => <ErrorComponent>{error.message}</ErrorComponent>}>
				<Image
					alt={alt}
					image={image}
					imageStyle={imageStyle}
					sizes={sizes}
					src={src}
					srcset={srcset}
					styleStr={style}
				/></ErrorBoundary>;
		}
	}
}
