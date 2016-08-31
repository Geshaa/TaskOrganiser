<?php
require_once('Core.php');

class Authenticate {
	private $email;
	private $password;
	private $firstName;
	private $lastName;
	private $core;
	private $statement;
	private $results;

	public function login() {
		$this->core 		= Core::getInstance();

		$this->email 		= $_POST['email'];
		$this->password 	= $_POST['password'];

		$this->statement = $this->core->dbh->prepare("SELECT id, email, password from users WHERE email = :email");
		$this->statement->bindParam(':email', $this->email);
		$this->statement->execute();

		$this->results = $this->statement->fetch(PDO::FETCH_ASSOC);

		//need to implement password hash
		if( count($this->results) > 0 && $this->password == $this->results['password']) {
			echo 1;
		}
		else {
			echo -1;
		}
	}

	public function logout() {

		session_start();

		if(isset($_SESSION['userID']))
			unset($_SESSION['userID']);

		session_destroy();
		echo 'destroy';
	}

	public function register() {
		$this->core 		= Core::getInstance();

		$this->firstName 		= $_POST['fname'];
		$this->lastName 		= $_POST['lname'];
		$this->email 			= $_POST['email'];
		$this->password 		= $_POST['password'];


		print($this->firstName);
//		exit;

//		$this->statement = $this->core->dbh->prepare("SELECT COUNT(id) from users WHERE email = :email");
//		$this->statement->bindParam(':email', $this->email);
//		$this->statement->execute();

//		$count = $this->statement->fetchColumn();

//		if ( $count === "1") {
//			echo $count;
//		}
//		else {
//			$hash = password_hash($this->password, PASSWORD_DEFAULT);
			$stm = $this->core->dbh->prepare("INSERT INTO users(firstName, lastName, email, password) VALUES ( :firstName, :lastName, :email, :password)");
			$stm->bindParam(':firstName', $this->firstName);
			$stm->bindParam(':lastName', $this->lastName);
			$stm->bindParam(':email', $this->email);
			$stm->bindParam(':password', $this->password);
			$stm->execute(); 
//			echo $count;
//		}
	}
}

$user = new Authenticate();

switch($_REQUEST['mode']) {

	case 'login':
		$user->login();
		break;
	case 'logout':
		$user->logout();
		break;
	case 'register':
		$user->register();
		break;
}

?>