<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Ensure we have the required variables
if (!isset($block) || !isset($attributes)) {
    error_log('Block or attributes not set');
    return '<div>Block or attributes not set</div>';
}

// Get inner blocks from the block object
$inner_blocks = $block->inner_blocks;

// Build wrapper attributes
$show_scrollbar = isset($attributes['showScrollbar']) ? $attributes['showScrollbar'] : false;
$wrapper_classes = ['wp-block-wdsbt-wdsbt-carousel-block'];
if ($show_scrollbar) {
    $wrapper_classes[] = 'has-scrollbar';
}
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => implode(' ', $wrapper_classes)
]);

// Only count slides if we have inner blocks
$slide_count = !empty($inner_blocks) ? count($inner_blocks) : 0;

// Get settings from attributes
$show_dots = isset($attributes['showDots']) ? $attributes['showDots'] : true;
$button_style = isset($attributes['buttonStyle']) ? $attributes['buttonStyle'] : 'raised';
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="carousel-container">
        <?php if (!empty($inner_blocks)): ?>
            <?php foreach ($inner_blocks as $index => $inner_block): ?>
                <div class="carousel-slide" data-slide="<?php echo esc_attr($index); ?>">
                    <?php echo $inner_block->render(); ?>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>

    <?php if ($show_scrollbar): ?>
        <div class="carousel-scrollbar">
            <div class="carousel-scrollbar-thumb"></div>
        </div>
    <?php endif; ?>

    <?php if ($slide_count > 1): ?>
        <div class="carousel-navigation">
            <?php if ($show_dots): ?>
                <div class="carousel-dots">
                    <?php for ($i = 0; $i < $slide_count; $i++): ?>
                        <button type="button"
                                data-slide="<?php echo esc_attr($index); ?>"
                                class="<?php echo $i === 0 ? 'active' : ''; ?>"
                                aria-label="<?php printf(esc_attr__('Go to slide %d', 'wdsbt-carousel-block'), $i + 1); ?>">
                        </button>
                    <?php endfor; ?>
                </div>
            <?php endif; ?>
            <div class="carousel-buttons">
                <button type="button"
                        class="prev-slide <?php echo esc_attr($button_style); ?>"
                        aria-label="<?php esc_attr_e('Previous slides', 'wdsbt-carousel-block'); ?>">
                </button>
                <button type="button"
                        class="next-slide <?php echo esc_attr($button_style); ?>"
                        aria-label="<?php esc_attr_e('Next slides', 'wdsbt-carousel-block'); ?>">
                </button>
            </div>
        </div>
    <?php endif; ?>
</div>
