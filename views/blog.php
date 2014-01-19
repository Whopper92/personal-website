<?php

  function connectBlogDB() {
    // Pending better way to do this...
    $host  = 'db.cecs.pdx.edu';
    $user  = 'hopperw';
    $pass  = 'Namyllib126c!';
    $db    = 'hopperw';
    $table = 'site_blog_posts';

    $con = pg_connect("host=$host dbname=$db
            user=$user password=$pass")
            or die ("Could not connect to server\n");
    return $con;
  }

  function disconnectBlogDB($connection) {
    pg_close($connection);
  }

  function generateRecentPostList($connection, $table) {
    $recentPostTitlesQuery = "SELECT title FROM $table ORDER BY date DESC LIMIT 5";

    $result = pg_query($connection, $recentPostTitlesQuery)
              or die("Could not execute query\n");

    while ($row = pg_fetch_row($result)) {
      $pageTag = preg_replace( '/\s+/', '', $row[0] );
      echo "<A NAME='$pageTag'><p class='blogNavListItem'><a href='#$pageTag'>$row[0]</a></p><hr class='blogNavListDivider'>";
    }
  }

  function generateTagList($connection, $table) {
    $uniqueTagsQuery = "SELECT DISTINCT tags FROM $table";
    $result = pg_query($connection, $uniqueTagsQuery)
              or die("Could not execute query\n");

    while ($row = pg_fetch_row($result)) {
      echo "<a href='#$row[0]'>$row[0]</a><br>";
    }
  }

  function displayRecentPosts($connection, $table) {
    $recentPostQuery = "SELECT author, date, title, content, comments FROM site_blog_posts ORDER BY date DESC LIMIT 5;";

    $result = pg_query($connection, $recentPostQuery)
              or die("Could not execute query\n");

    while ($row = pg_fetch_row($result)) {
      $pageTag     = preg_replace( '/\s+/', '', $row[2] );
      $month       = substr($row[1], 5, 2);
      $monthName = date("F", mktime(0, 0, 0, $month, 10));
      $day         = substr($row[1], 8, 2);
      $year        = substr($row[1], 0, 4);
      $displayDate = $monthName . ' ' . $day . ', ' . $year;
      if ($row[4] == NULL) {
        $row[4] = 'There are no comments for this article.';
      }

      echo "<A NAME='$pageTag'></a>";
      echo "<div class='row'><div class='blogPostTitle col-md-9'><h2>$row[2]</h2></div><div class='blogPostDate col-md-2'>$displayDate</div></div><div class='row'><div class='col-md-4'><h4 class='blogPostAuthor'>Posted by $row[0]</h4></div></div><hr class='blogNavListDivider'>";
      echo "<div class='blogPostContent'>$row[3]</div>";
      echo "<div class='blogPostComments'>$row[4]</div>";
      echo "<hr class='blogNavListDivider'>";
    }
  }
?>
<div class='page-content'>
  <!-- Left side bar - always present -->
  <div id='blogNavBar' class='col-md-3'>
    <!-- Dynamic list of most recent posts -->
    <div class='blogNavHeader'>
      Recent
    </div>
    <div class='blogNavList'>
      <?php
        $con = connectBlogDB();
        generateRecentPostList($con, 'site_blog_posts');
        disconnectBlogDB($con);
      ?>
    </div>
    <br>
    <div class='blogNavHeader'>
      Tags
    </div>
    <div class='blogNavList'>
      <?php
        $con = connectBlogDB();
        generateTagList($con, 'site_blog_posts');
        disconnectBlogDB($con);
      ?>
    </div>
  </div>
  <div id='blogMainContent' class='col-md-9'>
    <?php
      $con = connectBlogDB();
      displayRecentPosts($con, 'site_blog_posts');
      disconnectBlogDB($con);
    ?>
  </div>
</div>
