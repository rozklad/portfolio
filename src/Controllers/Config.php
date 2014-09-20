<?php namespace Portfolio\Controllers;
/**
 * Config
 *
 * @package Portfolio
 * @subpackage Controllers
 * @version 0.1.0 (9/2014)
 * @author rozklad <rozklad.me>
 */

class Config {

    // Relative path from app root
    protected $config_path = '/config';

    protected $data = array();

    protected static $instance;

    public function __construct()
    {
        $this->setAllConfigurationData();
    }

    public static function getInstance()
    {
        if ( !self::$instance ) {
            self::$instance = new Config();
        }
        return self::$instance;
    }

    public function setAllConfigurationData()
    {
        $dir = base_path() . $this->config_path;

        $files = scandir($dir);

        foreach ( $files as $configuration_file ) {

            if ( in_array($configuration_file, array('.', '..')) ) {
                continue;
            }

            $key = str_replace('.php', '', $configuration_file);
            $this->data[$key] = include_once($dir . '/' . $configuration_file);
        }

        return $this->data;
    }

    public static function getAllConfigurationData()
    {
        $config = self::getInstance();

        return $config->data;
    }

    public static function getAll() { return self::getAllConfigurationData(); }

    public static function get($name)
    {

    }

    public static function set($name, $value)
    {

    }
}
