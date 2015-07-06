<?php
/*
Plugin Name: Category Filter
Description: Filter a large number of categories when editing posts.
Version: 1.0.0
Author: jeremywarne
*/ 

function categoryfilter_enqueue() {
    wp_enqueue_script( 'categoryfilter', plugin_dir_url( __FILE__ ) . 'categoryfilter.js' );
}

add_action( 'admin_enqueue_scripts', 'categoryfilter_enqueue' );

?>