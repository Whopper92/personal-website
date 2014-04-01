<?php
  function connectDB() {
    include("../.db_cred.php");
    $con = pg_connect("host=$host dbname=$db
            user=$user password=$pass")
            or die ("Could not connect to server\n");
    return $con;
  }

  function disconnectDB($connection) {
    pg_close($connection);
  }

  $name  = $_GET[name];
  $city  = $_GET[city];
  $scifi = $_GET[scifi];
  $game  = $_GET[game];
  $music = $_GET[music];
  $os    = $_GET[os];

  $submitQuery = "insert into d3surveytest (name, city, scifi, game, music, os) VALUES ('" .$name. "', '" .$city. "', '" .$scifi. "', '" .$game. "', '" .$music. "', '" .$os. "')";

  connectDB();
  $result = pg_query($submitQuery);
  if (!$result) {
    $errormessage = pg_last_error();
      echo "Error with query: " . $errormessage;
      exit();
  } else {
    echo "Submission received!";
  }
  disconnectDB();
?>
