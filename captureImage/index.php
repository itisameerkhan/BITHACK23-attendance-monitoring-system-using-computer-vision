<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webcam</title>
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src='./assets/webcam.min.js' defer></script>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet">
</head>
<body onload='configure();'>

<div class="top-container">
        <div class="top-container-search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="SEARCH">
        </div>
        <h1>Attendance Monitoring System</h1>
        <div class="profile-container">
            <i class="fa-solid fa-calendar-days"></i>
            <i class="fa-regular fa-bell"></i>
            <img src="https://cdn3.iconfinder.com/data/icons/user-group-black/100/user-process-512.png" alt="" id="admin-profile-pic">
        </div>
</div>
<div class="left-container">
        <img src="https://upload.wikimedia.org/wikipedia/en/7/77/Bannari_Amman_Institute_of_Technology_logo.png" alt="">
        <div class="icon-container">
            <a href="/students"><i class="fa-solid fa-house"></i></a>
            <a href="" class="live-icon"><i class="fa-solid fa-plus"></i></a>
            <a href=""><i class="fa-solid fa-clock"></i></a>
            <a href=""><i class="fa-solid fa-message"></i></a>
            <a href=""><i class="fa-solid fa-right-from-bracket"></i></a>
        </div>
</div> 
    <div class="container">
        <div id="my_camera"></div>
        <div id="results"></div>
        <br>
        <button onclick="saveSnap();">save</button>
        <a href="image.php">
            <button>Go to Image Database</button>
        </a>
   </div>

<script>
function configure() 
{
    Webcam.set({
    width:480,
    height: 360,
    image_formant: 'jpeg',
    jpeg_quality: 90
    });

    Webcam.attach('#my_camera');
}

const saveSnap = () => {
    Webcam.snap((data_url) => {
        document.getElementById('results').innerHTML = '<img id="webcam" src="'+data_url+'">';
    });

    Webcam.reset();

    let base64image = document.getElementById('webcam').src;
    Webcam.upload(base64image, 'function.php', function(code, text){
        alert('saved successfully');
        document.location.href = 'image.php';
    })
}
</script>
</body>
</html>