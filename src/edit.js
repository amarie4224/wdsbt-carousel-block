/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl, SelectControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { autoPlay, autoPlaySpeed, showDots, showScrollbar, buttonStyle } = attributes;
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Carousel Settings', 'wdsbt-carousel-block')}>
					<ToggleControl
						label={__('Auto Play', 'wdsbt-carousel-block')}
						checked={autoPlay}
						onChange={(value) => setAttributes({ autoPlay: value })}
					/>
					{autoPlay && (
						<RangeControl
								label={__('Auto Play Speed (ms)', 'wdsbt-carousel-block')}
								value={autoPlaySpeed}
								onChange={(value) => setAttributes({ autoPlaySpeed: value })}
								min={1000}
								max={10000}
								step={500}
						/>
					)}
					<ToggleControl
						label={__('Show Navigation Dots', 'wdsbt-carousel-block')}
						checked={showDots}
						onChange={(value) => setAttributes({ showDots: value })}
					/>
					<ToggleControl
						label={__('Show Scrollbar', 'wdsbt-carousel-block')}
						checked={showScrollbar}
						onChange={(value) => setAttributes({ showScrollbar: value })}
					/>
					<SelectControl
						label={__('Navigation Button Style', 'wdsbt-carousel-block')}
						value={buttonStyle}
						options={[
							{ label: __('Raised', 'wdsbt-carousel-block'), value: 'raised' },
							{ label: __('Outlined', 'wdsbt-carousel-block'), value: 'outlined' }
						]}
						onChange={(value) => setAttributes({ buttonStyle: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="carousel-editor">
					<InnerBlocks
						allowedBlocks={['core/group']}
						template={[
							['core/group', {}, []],
							['core/group', {}, []],
							['core/group', {}, []]
						]}
						templateLock={false}
						renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
					/>
				</div>

				{/* Navigation Preview */}
				{showScrollbar && (
					<div className="carousel-scrollbar">
						<div className="carousel-scrollbar-thumb"></div>
					</div>
				)}

				<div className="carousel-navigation">
					{showDots && (
						<div className="carousel-dots">
							<button type="button" className="active"></button>
							<button type="button"></button>
							<button type="button"></button>
						</div>
					)}
					<div className={`carousel-buttons button-style-${buttonStyle}`}>
						<button type="button" className="prev-slide" aria-label="Previous">
							<span className="button-icon"></span>
						</button>
						<button type="button" className="next-slide" aria-label="Next">
							<span className="button-icon"></span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
