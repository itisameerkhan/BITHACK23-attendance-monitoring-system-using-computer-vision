<?php 
require 'function.php'
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Database</title>
</head>
<body>
    <table border=1 cellspacing=0 callpadding-10>
        <tr>
            <td>#</td>
            <td>Date and Time</td>
            <td>Images</td>
        </tr>
        <?php
        $i = 1;
        $rows = mysqli_query($conn, 'SELECT * FROM tbimage ORDER BY id DESC');
        ?>

        <?php foreach($rows as $row) : ?>
            <tr>
                <td><?php echo $i++; ?></td>
                <td><?php echo $row['date']; ?></td>
                <td><?php echo $row['image']; ?></td>
                <td><img src="img/<?php echo $row['image']; ?>" alt="" width='200' title="img/<?php echo $row['image']; ?>"></td>
            </tr>
        <?php endforeach ?>
    </table>
</body>
</html>