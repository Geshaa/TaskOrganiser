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

//		$this->email 		= $_POST['email'];
//		$this->password 	= $_POST['password'];

		$this->statement = $this->core->dbh->prepare("SELECT id, email, password from users");
//		$this->statement->bindParam(':email', $this->email);
		$this->statement->execute();

		$this->results = $this->statement->fetch(PDO::FETCH_ASSOC);

		if( count($this->results) > 0 ) {
			$data[] = $this->results;
//			echo $this->results['userLevel'];
		}
		else {
			echo '0 results';
		}

		echo json_encode($data);
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

		$this->firstName 		= $_POST['regFirstName'];
		$this->lastName 		= $_POST['regLastName'];
		$this->email 			= $_POST['regEmail'];
		$this->password 		= $_POST['regPassword'];

		$this->statement = $this->core->dbh->prepare("SELECT COUNT(id) from users WHERE email = :email");
		$this->statement->bindParam(':email', $this->email);
		$this->statement->execute();

		$count = $this->statement->fetchColumn();

		if ( $count === "1") {
			echo $count;
		}
		else {
			$hash = password_hash($this->password, PASSWORD_DEFAULT);
			$stm = $this->core->dbh->prepare("INSERT INTO users(firstName, lastName, email, password) VALUES ( :firstName, :lastName, :email, :password)");
			$stm->bindParam(':firstName', $this->firstName);
			$stm->bindParam(':lastName', $this->lastName);
			$stm->bindParam(':email', $this->email);
			$stm->bindParam(':password', $hash);
			$stm->execute(); 
			echo $count;
		}
	}
}

$user = new Authenticate();

switch($_GET['mode']) {

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