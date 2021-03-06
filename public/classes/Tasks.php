<?php
require_once('Core.php');

class Tasks {
    private $id;
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

        $this->statement = $this->core->dbh->prepare("SELECT id, category_id, name, description, date, done from tasks WHERE user_id = :userid");
        $this->statement->bindParam(':userid', $this->userid);
        $this->statement->execute();

        $this->results = $this->statement->fetchAll(PDO::FETCH_ASSOC);

        print json_encode($this->results);
    }

    public function listBy() {
        $this->core         = Core::getInstance();
        $this->userid       = $_GET['userid'];
        $this->categoryid   = $_GET['categoryid'];

        $this->statement = $this->core->dbh->prepare("SELECT id, category_id, name, description, date, done from tasks WHERE user_id = :userid AND category_id = :categoryid");
        $this->statement->bindParam(':userid', $this->userid);
        $this->statement->bindParam(':categoryid', $this->categoryid);
        $this->statement->execute();

        $this->results = $this->statement->fetchAll(PDO::FETCH_ASSOC);

        print json_encode($this->results);
    }

    public function create() {
        $this->core 			= Core::getInstance();

        $this->name 		    = $_POST['name'];
        $this->description 		= $_POST['description'];
        $this->date 		    = $_POST['date'];
        $this->userid 		    = $_POST['userid'];
        $this->categoryid 		= $_POST['categoryid'];
        $this->done 		    = 0;

        $stm = $this->core->dbh->prepare("INSERT INTO tasks(user_id, category_id, name, description, date, done) VALUES ( :userid, :categoryid, :name, :description, :date, :done)");
        $stm->bindParam(':userid', $this->userid);
        $stm->bindParam(':categoryid', $this->categoryid);
        $stm->bindParam(':name', $this->name);
        $stm->bindParam(':description', $this->description);
        $stm->bindParam(':date', $this->date);
        $stm->bindParam(':done', $this->done);
        $stm->execute();
    }

    public function update() {
        $this->core 			= Core::getInstance();

        $this->name 		    = $_POST['name'];
        $this->description 		= $_POST['description'];
        $this->date 		    = $_POST['date'];
        $this->done 		    = $_POST['done'];
        $this->userid 		    = $_POST['userid'];
        $this->id 		        = $_POST['taskid'];
        $this->categoryid 		= $_POST['categoryid'];

        $stm = $this->core->dbh->prepare("UPDATE tasks SET name = :name, description = :description, date = :date, category_id = :categoryid  WHERE user_id = :userid AND id = :id");
        $stm->bindParam(':id', $this->id);
        $stm->bindParam(':userid', $this->userid);
        $stm->bindParam(':categoryid', $this->categoryid);
        $stm->bindParam(':name', $this->name);
        $stm->bindParam(':description', $this->description);
        $stm->bindParam(':date', $this->date);
        $stm->execute();
    }

    public function updateDone() {
        $this->core 			= Core::getInstance();

        $this->done 		    = $_POST['done'];
        $this->userid 		    = $_POST['userid'];
        $this->id 		        = $_POST['taskid'];

        $stm = $this->core->dbh->prepare("UPDATE tasks SET done = :done WHERE user_id = :userid AND id = :id");
        $stm->bindParam(':done', $this->done);
        $stm->bindParam(':userid', $this->userid);
        $stm->bindParam(':id', $this->id);
        $stm->execute();
    }

    public function delete() {
        $this->core 		    = Core::getInstance();
        $this->id 		        = $_GET['taskid'];

        $this->statement = $this->core->dbh->prepare("DELETE from tasks WHERE id = :id");
        $this->statement->bindParam(':id', $this->id);
        $this->statement->execute();
    }

    public function deleteAll() {
        $this->core             = Core::getInstance();
        $this->userid           = $_GET['userid'];
        $this->categoryid       = $_GET['categoryid'];

        $this->statement = $this->core->dbh->prepare("DELETE from tasks WHERE category_id = :category_id AND user_id = :user_id");
        $this->statement->bindParam(':category_id', $this->categoryid);
        $this->statement->bindParam(':user_id', $this->userid);
        $this->statement->execute();
    }

    public function deleteCompleted() {
        $this->core 		    = Core::getInstance();
        $this->userid 		    = $_GET['userid'];

        $this->statement = $this->core->dbh->prepare("DELETE from tasks WHERE user_id = :userid AND done = 1");
        $this->statement->bindParam(':userid', $this->userid);
        $this->statement->execute();
    }

    public function uncompleted() {
        $this->core 		= Core::getInstance();
        $this->userid 		= $_GET['userid'];

        $this->statement = $this->core->dbh->prepare("SELECT id from tasks WHERE user_id = :userid AND done = 0");
        $this->statement->bindParam(':userid', $this->userid);
        $this->statement->execute();

        $this->results = $this->statement->fetchAll(PDO::FETCH_ASSOC);

        echo count($this->results);
    }

    public function completed() {
        $this->core         = Core::getInstance();
        $this->userid       = $_GET['userid'];

        $this->statement = $this->core->dbh->prepare("SELECT id from tasks WHERE user_id = :userid AND done = 1");
        $this->statement->bindParam(':userid', $this->userid);
        $this->statement->execute();

        $this->results = $this->statement->fetchAll(PDO::FETCH_ASSOC);

        echo count($this->results);
    }

    public function setUndo() {
        $this->core             = Core::getInstance();

        $this->name             = $_POST['name'];
        $this->description      = $_POST['description'];
        $this->date             = $_POST['date'];
        $this->done             = $_POST['done'];
        $this->userid           = $_POST['userid'];
        $this->categoryid       = $_POST['categoryid'];

        $stm = $this->core->dbh->prepare("REPLACE INTO deleted (user_id, category_id, name, description, date, done) VALUES ( :userid, :categoryid, :name, :description, :date, :done)");
        $stm->bindParam(':userid', $this->userid);
        $stm->bindParam(':categoryid', $this->categoryid);
        $stm->bindParam(':name', $this->name);
        $stm->bindParam(':description', $this->description);
        $stm->bindParam(':date', $this->date);
        $stm->bindParam(':done', $this->done);
        $stm->execute();
    }

    public function undo() {
        $this->core             = Core::getInstance();

        $this->userid           = $_POST['userid'];

        $stm = $this->core->dbh->prepare("INSERT INTO tasks (user_id, category_id, name, description, date, done) SELECT * FROM deleted WHERE user_id = :userid");
        $stm->bindParam(':userid', $this->userid);

        $stm->execute();

        print 'copyed';
    }
}

session_start();

if ( !isset($_SESSION['userID']) && empty( $_SESSION['userID']) )
    return;

$task = new Tasks();

switch($_REQUEST['mode']) {

    case 'list':
        $task->listAll();
        break;
    case 'listBy':
        $task->listBy();
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
    case 'updateDone':
        $task->updateDone();
        break;
    case 'delete':
        $task->delete();
        break;
    case 'deleteAll':
        $task->deleteAll();
        break;
    case 'deleteCompleted':
        $task->deleteCompleted();
        break;
    case 'uncompleted':
        $task->uncompleted();
        break;
     case 'completed':
        $task->completed();
        break;
    case 'setUndo':
        $task->setUndo();
        break;
    case 'undo':
        $task->undo();
        break;
}

?>