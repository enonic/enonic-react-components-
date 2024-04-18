import {ElementType} from 'domelementtype';
import type {RichTextData} from '../src/types';


import {
	describe,
	expect,
	test as it
} from '@jest/globals';
import {render} from '@testing-library/react'
import toDiffableHtml from 'diffable-html';
import React from 'react';
import {RichText} from '../src';
import {Image} from './RichText/Image';
import {Link} from './RichText/Link';
import {Macro} from './RichText/Macro';
// import {print} from 'q-i';



describe('RichText', () => {
	it('should use customReplacer to replace anything but image, link and macro', () => {
		const data: RichTextData = {
			images: [],
			links: [],
			macros: [],
			processedHtml: `<p>Some text</p>`
		}
		const html = render(<RichText
			className='myclass'
			customReplacer={(el, data) => {
				// console.debug('el', el);
				// console.debug('data', data);
				if (
					el.name === 'p'
					&& el.children[0].type === ElementType.Text
					&& el.children[0].data === 'Some text'
				) {
					return <p>Replaced text</p>;
				}
			}}
			data={data}
			Image={Image}
			Link={Link}
			Macro={Macro}
		/>).baseElement;
		// print(html.outerHTML, { maxItems: Infinity });
		expect(toDiffableHtml(html.outerHTML)).toBe(`
<body>
  <div>
    <section class="myclass">
      <p>
        Replaced text
      </p>
    </section>
  </div>
</body>
`);
	});
}); // describe RichText
