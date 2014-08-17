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

require_once __DIR__ . '/vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Controllers
|--------------------------------------------------------------------------
|
| Custom, project specific wrappers.
*/

require_once __DIR__ . '/controllers/Presenter.php';

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
|
| Helper functions.
*/

function storage_path() {
	return __DIR__ . '/content';
}

// Show menu
Presenter::menu( storage_path() );

// Basic usage
Presenter::show('index.md');