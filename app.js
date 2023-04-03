const searchBoxEl = document.querySelector('#search');
const placeHereEl = document.querySelector('#images');
import config from './config.js';

searchBoxEl.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {

        const prompt = "";
        const n = 3;
        const size = "512x512";

        fetch(`https://api.openai.com/v1/images/generations`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': config.API_KEY
            },
            // headers: {
            //     'Content-Type': "application/json",
            //     'Authorization': "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"
            //     },
            body: JSON.stringify({
                prompt: prompt,
                n: n,
                size: size
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.data && data.data.length > 0) {
                    const images = data.data;
                    const displayImages = images.slice(0, 3);

                    placeHereEl.innerHTML = '';

                    displayImages.forEach(image => displayImage(image));
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
});

function displayImage(image) {
    const div = document.createElement('div');
    div.classList.add('flex', 'p-6', 'rounded-lg');

    const img = document.createElement('img');
    img.src = image.url;
    img.style.maxWidth = '300px';

    div.appendChild(img);
    placeHereEl.appendChild(div);
}

