const audio = new Audio(chrome.runtime.getURL('sound.mp3'));
audio.loop = true;

const statusElement = document.getElementById('status');
let isOffline = false;

function checkInternetConnection() {
    const img = new Image();

    img.onload = function () {
        statusElement.textContent = 'Online';
        document.title = 'Online';
        if (isOffline) {
            audio.pause();
            audio.currentTime = 0;
            isOffline = false;
        }
    };

    img.onerror = function () {
        if (!isOffline) {
            audio.play().catch((error) => console.error('Playback Error:', error));
            isOffline = true;
            statusElement.textContent = 'Offline';
            document.title = 'Offline';
        }
    };

    img.src = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png?' + new Date().getTime();
}

setInterval(checkInternetConnection, 1000);
