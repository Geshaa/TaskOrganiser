<?php
require_once('Core.php');

class Categories {
    private $userid;
    private $name;
    private $description;
    private $date;
    private $categoryid;

    private $core;
    private $statement;
    private $results;

    public function create() {
        $this->core 			= Core::getInstance();

        $this->name 		    = $_POST['name'];
        $this->description 		= $_POST['description'];
        $this->userid 		    = $_POST['userid'];
        $this->date             = date("Y-m-d H:i:s");

        $stm = $this->core->dbh->prepare("INSERT INTO categories(user_id, name, description, date) VALUES ( :userid, :name, :description, :date)");
        $stm->bindParam(':userid', $this->userid);
        $stm->bindParam(':name', $this->name);
        $stm->bindParam(':description', $this->description);
        $stm->bindParam(':date', $this->date);
        $stm->execute();
    }

    public function read() {
        $this->core 		= Core::getInstance();
        $this->userid 		= $_GET['userid'];

        $this->statement = $this->core->dbh->prepare("SELECT id, name, description, date from categories WHERE user_id = :userid");
        $this->statement->bindParam(':userid', $this->userid);
        $this->statement->execute();

        $this->results = $this->statement->fetchAll(PDO::FETCH_ASSOC);

        print json_encode($this->results);
    }

    public function update() {

    }

    public function delete() {
        $this->core 		    = Core::getInstance();
        $this->categoryid 		= $_GET['categoryid'];

        $this->statement = $this->core->dbh->prepare("DELETE from categories WHERE id = :categoryid");
        $this->statement->bindParam(':categoryid', $this->categoryid);
        $this->statement->execute();
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