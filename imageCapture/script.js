const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const capturedImage = document.getElementById('capturedImage');
const captureBtn = document.getElementById('captureBtn');

// Predefined folder path
const saveFolderPath = './Image'; // Replace with your desired folder path

async function captureAndSaveImage() {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));

  try {
    const handle = await window.showDirectoryPicker();
    const fileHandle = await handle.getFileHandle(`${saveFolderPath}/captured_image.jpg`, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();

    capturedImage.src = URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error saving image:', error);
  }
}

// Check for webcam support
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function (error) {
      console.error('Error accessing webcam:', error);
    });
} else {
  console.error('Webcam not supported');
}

// Capture and save the image when the button is clicked
captureBtn.addEventListener('click', captureAndSaveImage);
