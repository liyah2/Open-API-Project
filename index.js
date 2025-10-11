async function getArtData () {
    const response = await fetch(" https://api.artic.edu/api/v1/artists?page=2&limit=10")
    const data = await response.json();
    console.log(data);
}

getArtData();