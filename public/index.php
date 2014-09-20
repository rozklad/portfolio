<?php
/**
 * Rozklad portfolio
 *
 * @package Portfolio
 * @version 0.1.0 (8/2014)
 * @author rozklad <rozklad.me>
 */

ini_set('display_errors', true);
error_reporting(E_ALL);

/*
|--------------------------------------------------------------------------
| Vendor libraries
|--------------------------------------------------------------------------
|
| Load 3rd party PHP libraries used. Full list found in composer.json
*/

require_once __DIR__ . '/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
|
| Helper functions.
*/

/**
 * Get path to storage, may specify subfolder
 * using param.
 * @param  string $subpath (Optional) define subfolder path to return with storage path
 * @return string          Full path to storage folder
 */
function storage_path( $subpath = null ) {
    return __DIR__ . '/../content' . $subpath;
}

// Show menu
\Portfolio\Presenters\PagePresenter::menu( storage_path() );

// Basic usage
\Portfolio\Presenters\PagePresenter::show('index.md');
