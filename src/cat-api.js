const API_KEY = "live_r1f0nwjQR3c0mjy5rpIAzj4g0It4HwkellAVRLqi11b4Ew45mMO0VSQJhYvQA1oE";
export function fetchBreeds(){
    const url = `https://api.thecatapi.com/v1/breeds`;
    
    return fetch(url,{headers: {
        'x-api-key': API_KEY
    }})
    .then(response => {
    return response.json();
    });
}

export function fetchCatByBreed(breed) {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}&api_key=${API_KEY}`)
    .then(response => {
    return response.json();
    })
}
