<?php
require_once('Core.php');

class Authenticate {
	private $email;
	private $password;
	private $firstName;
	private $lastName;
	private $phone;
	private $core;
	private $statement;
	private $results;
	private $userID;

	public function login() {
		$this->core 		= Core::getInstance();

		$this->email 		= $_POST['email'];
		$this->password 	= $_POST['password'];

		$this->statement = $this->core->dbh->prepare("SELECT id, email, password from users WHERE email = :email");
		$this->statement->bindParam(':email', $this->email);
		$this->statement->execute();

		$this->results = $this->statement->fetch(PDO::FETCH_ASSOC);

		$object = array();

		if( count($this->results) > 0 && password_verify($this->password, $this->results['password']) ) {
			$object[] = 1;
			$object[] = intval($this->results['id']);
		}
		else {
			$object[] = -1;
		}

		print json_encode($object);
	}

	public function register() {
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

	public function getUserData() {
		$this->core 		= Core::getInstance();

		$this->userID 		= $_GET['userID'];

		$this->statement = $this->core->dbh->prepare("SELECT firstName, lastName, phone from users WHERE id = :userID");
		$this->statement->bindParam(':userID', $this->userID);
		$this->statement->execute();

		$this->results = $this->statement->fetchAll(PDO::FETCH_ASSOC);

		print json_encode($this->results);
	}

}

$user = new Authenticate();

switch($_REQUEST['mode']) {

	case 'login':
		$user->login();
		break;
	case 'register':
		$user->register();
		break;
	case 'getUser':
		$user->getUserData();
		break;
}
?>