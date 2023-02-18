const searchBoxEl = document.querySelector('#search');
const placeHereEl = document.querySelector('#images');

searchBoxEl.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const apiKey = "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";
        const prompt = event.target.value;
        const n = 4;
        const size = "512x512";

        fetch(`https://api.openai.com/v1/images/generations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: prompt,
                n: n,
                size: size
            })
        })
            .then(response => response.json())
            .then(data => {
                const images = data.data;

                const displayImages = images.slice(0, 3);

                placeHereEl.innerHTML = '';

                displayImages.forEach(image => displayImage(image));
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

