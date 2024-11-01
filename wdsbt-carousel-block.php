<?php
/**
 * Plugin Name:       WDS-BT Carousel Block
 * Description:       This is a carousel block that accepts other blocks as slides
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wdsbt-carousel-block
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 */
function wdsbt_wdsbt_carousel_block_init() {
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'wdsbt_wdsbt_carousel_block_init');

// Add debugging
add_action('init', function() {
    error_log('Plugin initialized');
});
