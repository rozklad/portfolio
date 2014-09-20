<?php namespace Portfolio\Presenters;
/**
 * Presenter
 *
 * @package Portfolio
 * @subpackage Presenters
 * @version 0.1.0 (8/2014)
 * @author rozklad <rozklad.me>
 */

use \Michelf\Markdown;

class PagePresenter {

    public static $instance = null;

    public function __construct()
    {

    }

    public static function __callStatic($method, $args)
    {
        $presenter = self::getInstance();

        switch ( count($args) ) {
            case 1:
                return $presenter->$method($args[0]);
            break;

            default:
                // other calls
            break;
        }
    }

    public static function getInstance()
    {
        if ( !self::$instance ) {
            self::$instance = new PagePresenter();
        }
        return self::$instance;
    }

    protected function menu( $dir )
    {
        $files = scandir($dir);

        $links = array();

        foreach ( $files as $file ) {

            if (!in_array($file,array('.','..'))) {

                $filepath = $dir . '/' . $file;
                $path_parts = pathinfo( $filepath );

                switch (true) {

                    case is_dir($filepath):
                        // Directories
                        $links[] = array(
                            'title' => $path_parts['filename'],
                            'href' => '/' . $path_parts['filename'],
                        );
                    break;

                    case $path_parts['extension'] == 'lnk':
                        // Links
                        $links[] = array(
                            'title' => $path_parts['filename'],
                            'href' => file_get_contents($filepath),
                            'rel'  => 'external',
                            'target' => '_blank'
                        );
                    break;

                    default:
                        // Other
                        // $links[$path_parts['filename']] = file_get_contents($filepath);
                    break;
                }
            }
        }

        // @todo Template
        if ( $links ) {
            echo '<ul>';
            foreach ( $links as $link ) {

                echo '<li><a href="' . $link['href'] . '">' . $link['title'] . '</a></li>';
            }
            echo '</ul>';
        }
    }

    protected function show( $filename = 'index.md' )
    {
        echo $this->get($filename);
    }

    protected function get( $filename = 'index.md' )
    {
        $filepath = storage_path() . '/' . $filename;

        try {

            if ( !file_exists( $filepath ) ) {
                // File does not exist
                throw new Exception('File does not exist. ['.$filepath.']');
            }

            $content = file_get_contents( $filepath );

            return Markdown::defaultTransform( $content );
        }
        catch (Exception $e)
        {
            echo 'Caught exception: ',  $e->getMessage();
        }

    }
}
