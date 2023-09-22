<?php 
$conn = mysqli_connect("localhost:3307", "root", "", "webcam");


echo 'outside if condition';

if(isset($_FILES['webcam']['tmp_name'])) {

    echo 'inside if condition';
    $tmpName = $_FILES['webcam']['tmp_name'];
    $imageName = date('Y.m.d') . ' - ' . date('h.i.sa') . ' .jpeg';
    move_uploaded_file($tmpName, 'img/' . $imageName);

    $date = date('Y/m/d') . ' & ' . date('h:i:sa');
    $query = "INSERT INTO tbimage VALUES('','$date','$imageName')";
    mysqli_query($conn, $query);
}

?>

