<?php
/**
 * User: Georgi
 * Date: 3/25/2016
 * Time: 3:14 PM
 */
require_once('Configuration.php');

class Core
{
    public $dbh; // handle of the db connection
    private static $instance;

    public function __construct()
    {
        // building data source name from config
        $dsn =  'mysql:host=' . Configuration::read('db.host') .
                ';dbname='    . Configuration::read('db.basename') .
                ';connect_timeout=15';
        $user = Configuration::read('db.user');
        $password = Configuration::read('db.password');

        try {
            $this->dbh = new PDO($dsn, $user, $password);
            $this->dbh->exec('set names utf8');
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
        }
    }

    public static function getInstance()
    {
        if (!isset(self::$instance))
        {
            $object = __CLASS__;
            self::$instance = new $object;
        }
        return self::$instance;
    }
}

?>