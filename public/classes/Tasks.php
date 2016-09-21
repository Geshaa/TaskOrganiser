<?php
require_once('Core.php');

class Tasks {
    private $userid;
    private $categoryid;
    private $name;
    private $description;
    private $date;
    private $done;

    private $core;
    private $statement;
    private $results;

    public function listAll() {
        $this->core 		= Core::getInstance();
        $this->userid 		= $_GET['userid'];

        $this->statement = $this->core->dbh->prepare("SELECT id, name, description, date, done from tasks WHERE user_id = :userid");
        $this->statement->bindParam(':userid', $this->userid);
        $this->statement->execute();

        $this->results = $this->statement->fetchAll(PDO::FETCH_ASSOC);

        print json_encode($this->results);
    }

//    public function create() {
//        $this->core 			= Core::getInstance();
//
//        $this->name 		    = $_POST['name'];
//        $this->description 		= $_POST['description'];
//        $this->userid 		    = $_POST['userid'];
//        $this->date             = date("Y-m-d H:i:s");
//
//        $stm = $this->core->dbh->prepare("INSERT INTO categories(user_id, name, description, date) VALUES ( :userid, :name, :description, :date)");
//        $stm->bindParam(':userid', $this->userid);
//        $stm->bindParam(':name', $this->name);
//        $stm->bindParam(':description', $this->description);
//        $stm->bindParam(':date', $this->date);
//        $stm->execute();
//    }
//
//    public function read() {
//        $this->core 		= Core::getInstance();
//        $this->userid 		= $_GET['userid'];
//
//        $this->statement = $this->core->dbh->prepare("SELECT id, name, description, date from categories WHERE user_id = :userid");
//        $this->statement->bindParam(':userid', $this->userid);
//        $this->statement->execute();
//
//        $this->results = $this->statement->fetchAll(PDO::FETCH_ASSOC);
//
//        print json_encode($this->results);
//    }
//
//    public function update() {
//        $this->core 			= Core::getInstance();
//
//        $this->name 		    = $_POST['name'];
//        $this->description 		= $_POST['description'];
//        $this->categoryid 	    = $_POST['id'];
//
//        $stm = $this->core->dbh->prepare("UPDATE categories SET name = :name, description =:description  WHERE id = :id");
//        $stm->bindParam(':id', $this->categoryid);
//        $stm->bindParam(':name', $this->name);
//        $stm->bindParam(':description', $this->description);
//        $stm->execute();
//    }
//
//    public function delete() {
//        $this->core 		    = Core::getInstance();
//        $this->categoryid 		= $_GET['categoryid'];
//
//        $this->statement = $this->core->dbh->prepare("DELETE from categories WHERE id = :categoryid");
//        $this->statement->bindParam(':categoryid', $this->categoryid);
//        $this->statement->execute();
//    }
}

$task = new Tasks();

switch($_REQUEST['mode']) {

    case 'list':
        $task->listAll();
        break;
    case 'create':
        $task->create();
        break;
    case 'read':
        $task->read();
        break;
    case 'update':
        $task->update();
        break;
    case 'delete':
        $task->delete();
        break;
}

?>