<?php
require_once('Core.php');

class Categories {
    private $userid;
    private $name;
    private $description;
    private $date;

    private $core;
    private $statement;
    private $results;

    public function create() {
        $this->core 			= Core::getInstance();

        $this->firstName 		= $_POST['fname'];
        $this->lastName 		= $_POST['lname'];
        $this->email 			= $_POST['email'];
        $this->password 		= $_POST['password'];
        $this->phone 			= $_POST['phone'];

        $this->statement = $this->core->dbh->prepare("SELECT COUNT(id) from users WHERE email = :email");
        $this->statement->bindParam(':email', $this->email);
        $this->statement->execute();

        $count 	 = $this->statement->fetchColumn();

        $object = array();

        if ( $count === "1" ) {
            $object[] = -1;
        }
        else {
            $hash = password_hash($this->password, PASSWORD_DEFAULT);
            $stm = $this->core->dbh->prepare("INSERT INTO users(firstName, lastName, phone, email, password) VALUES ( :firstName, :lastName, :phone, :email, :password)");
            $stm->bindParam(':firstName', $this->firstName);
            $stm->bindParam(':lastName', $this->lastName);
            $stm->bindParam(':phone', $this->phone);
            $stm->bindParam(':email', $this->email);
            $stm->bindParam(':password', $hash);
            $stm->execute();

            $stm = $this->core->dbh->prepare("SELECT id from users WHERE email = :email");
            $stm->bindParam(':email', $this->email);
            $stm->execute();
            $this->results = $stm->fetch(PDO::FETCH_ASSOC);

            $object[] = 1;
            $object[] = intval($this->results['id']);
        }

        print json_encode($object);
    }

    public function read() {
        $this->core 		= Core::getInstance();
        $this->userid 		= $_POST['userid'];

        $this->statement = $this->core->dbh->prepare("SELECT name, description, date from categories WHERE user_id = :userid");
        $this->statement->bindParam(':userid', $this->userid);
        $this->statement->execute();

        $this->results = $this->statement->fetchAll(PDO::FETCH_ASSOC);

        print json_encode($this->results);
    }

    public function update() {

    }

    public function delete() {

    }
}

$category = new Categories();

switch($_REQUEST['mode']) {

    case 'create':
        $category->create();
        break;
    case 'read':
        $category->read();
        break;
    case 'update':
        $category->update();
        break;
    case 'delete':
        $category->delete();
        break;
}

?>