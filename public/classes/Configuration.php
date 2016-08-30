<?php
/**
 * User: Georgi
 * Date: 8/25/2016
 * Time: 3:18 PM
 */
class Configuration
{
    static $confArray;

    public static function read($name)
    {
        return self::$confArray[$name];
    }

    public static function write($name, $value)
    {
        self::$confArray[$name] = $value;
    }
}

// db test connection  - use other password and user in real application
Configuration::write('db.host', 'localhost');
Configuration::write('db.basename', 'taskorganiser');
Configuration::write('db.user', 'root');
Configuration::write('db.password', '');
