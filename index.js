async function getArtData() {
  try {
    //Grab Info from web
    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks"
    );
    const data = await response.json();

    // Grab images - but do not "hardcode" -- there are multiple sections to this - Grabs base
    const apiBaseImgUrl = data.config.iiif_url;

    //need to add the content to the page now.
    const artworkSection = document.getElementById("artworkSection");
    artworkSection.innerHTML = "";
    

    //Need to grab the ID for each as the identifier - combine with base and end point - this gets all info needed for each artwork
    data.data.forEach((artworkInfo) => {
    //   const apiImageUrl = `${apiBaseImgUrl}/${artworkInfo.image_id}/full/843,/0/default.jpg`;


    // adding if statement for missing images in API
    let apiImageUrl;
    if (artworkInfo.image_id) {
        apiImageUrl = `${apiBaseImgUrl}/${artworkInfo.image_id}/full/843,/0/default.jpg`;
    } else {
        apiImageUrl="./Images/—Pngtree—no image vector illustration isolated_4979075.png"
    }

    // print info to document -- using innerText made the h3 and p tag show, changing it allowed it to work properly
      const artworkDiv = document.createElement("div");
      artworkDiv.innerHTML = `<h3>${artworkInfo.title};</h3> <p>${artworkInfo.artist_title || "Unknown Artist"}</p>`

      //missing image
      
      
      const img = document.createElement("img");
      img.src = apiImageUrl;
      img.alt = artworkInfo.title;

      img.onerror = () => {
        img.src = "./Images/placeholder.jpg";
      };

      artworkSection.appendChild(artworkDiv);
      artworkDiv.appendChild(img);
      
      //Console to see if info generates.
      console.log(`
        ${apiImageUrl}
        Title: ${artworkInfo.title}
        Artist Title: ${artworkInfo.artist_title || "Unknown Artist"}`);
    });
    // Catch is needed to catch any errors -- Missing Catch error if not applied
  } catch (error) {
    console.error("Error: ", error);
  }
}

getArtData();

// ========Background ==========

async function setHeaderBackground() {
    try {
      const artworkId = 151535; // specific artwork for background
      const response = await fetch(`https://api.artic.edu/api/v1/artworks/${artworkId}`);
      const data = await response.json();
  
      const apiBaseImgUrl = data.config.iiif_url;
      const artwork = data.data;
  
      const backgroundSection = document.querySelector(".background");
      if (artwork.image_id) {
        const backgroundImageUrl = `${apiBaseImgUrl}/${artwork.image_id}/full/843,/0/default.jpg`;
        backgroundSection.style.backgroundImage = `url(${backgroundImageUrl})`;

      }
    } catch (error) {
      console.error("Error retrieving background: ", error);
    }
  }
  
  setHeaderBackground();



 // =========Copyright section=============

 const body = document.body;

 let footer = document.createElement("footer");
 body.appendChild(footer);
 
 const today = new Date();
 const thisYear = today.getFullYear();
 
 const copyright = document.createElement("p");
 
 copyright.innerHTML = `\u00A9 Aaliyah Closs ${thisYear}`;
 
 footer.appendChild(copyright);
  