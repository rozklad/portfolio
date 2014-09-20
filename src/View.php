<?php namespace Portfolio;
/**
 * View
 *
 * @package Portfolio
 * @version 0.1.0 (9/2014)
 * @author rozklad <rozklad.me>
 */


use Mustache_Engine;
use Mustache_Loader_FilesystemLoader;

class View {

    public static $instance = null;

    public function __construct()
    {
        $this->m = new Mustache_Engine(array(
            'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/views'),
        ));
    }

    public static function getInstance()
    {
        if ( !self::$instance ) {
            self::$instance = new View();
        }
        return self::$instance;
    }

    public static function render($template = 'index', $vars = array())
    {
        $view = self::getInstance();

        echo $view->m->render($template, $vars);
    }
}
