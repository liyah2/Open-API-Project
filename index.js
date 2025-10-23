// ==========FETCH AND DISPLAY ARTWORKS ========== //
async function getArtData() {
    try {
      const input = document.getElementById("artwork-search");
      const searchTerm = input.value.trim();
  
      // Base API URL fetches all gallery images
      let apiUrl = "https://api.artic.edu/api/v1/artworks";
  
      // Allows user to search by a term
      if (searchTerm) {
        apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
          searchTerm
        )}&query[term][is_public_domain]=true&fields=artist_title,date_display,image_id,thumbnail,title`;
      }
  
      // Get's artwork from API
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      const apiBaseImgUrl = data.config.iiif_url;
  
      // Clear previous search results
      const artworkSection = document.getElementById("artworkSection");
      artworkSection.innerHTML = "";
  
      // Display each artwork
      data.data.forEach((artworkInfo) => {
        // Handle missing images
        let apiImageUrl;
        if (artworkInfo.image_id) {
          apiImageUrl = `${apiBaseImgUrl}/${artworkInfo.image_id}/full/843,/0/default.jpg`;
        } else {
          apiImageUrl = "./Images/noimage.png"; // fallback image
        }
  
        // Create artwork container
        const artworkDiv = document.createElement("div");
        artworkDiv.innerHTML = `
          <h3>${artworkInfo.title};</h3>
          <p>${artworkInfo.artist_title || "Unknown Artist"}</p>
        `;
  
        const img = document.createElement("img");
        img.src = apiImageUrl;
        img.alt = artworkInfo.title;
  
        // Handle broken images
        img.onerror = () => {
          img.src = "./Images/noimage.png";
        };
  
        artworkDiv.appendChild(img);
        artworkSection.appendChild(artworkDiv);
  
        // Testing API fetch info
        console.log(`
          ${apiImageUrl}
          Title: ${artworkInfo.title}
          Artist: ${artworkInfo.artist_title || "Unknown Artist"}
        `);
      });
    } catch (error) {
      console.error("Error fetching artwork data: ", error);
    }
  }
  
  getArtData();
  
  // ========== SEARCH FORM HANDLER ========== //
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    getArtData();
  });
  
  
  // ========== BACKGROUND HEADER SECTION ========== //
  // Fetches a specific artwork and sets it as the header background
  async function setHeaderBackground() {
    try {
      const artworkId = 151535; 
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/${artworkId}`
      );
      const data = await response.json();
  
      const apiBaseImgUrl = data.config.iiif_url;
      const artwork = data.data;
  
      const backgroundSection = document.querySelector(".background");
  
      // Set background 
      if (artwork.image_id) {
        const backgroundImageUrl = `${apiBaseImgUrl}/${artwork.image_id}/full/843,/0/default.jpg`;
        backgroundSection.style.backgroundImage = `url(${backgroundImageUrl})`;
      }
    } catch (error) {
      console.error("Error retrieving background: ", error);
    }
  }
  
  setHeaderBackground();
  
  
  // ========== COPYRIGHT FOOTER SECTION ========== //
  // Add copyright to footer of page
  
  function addFooter() {
    const today = new Date();
    const thisYear = today.getFullYear();
    const body = document.body;
  
    const footer = document.createElement("footer");
    const copyright = document.createElement("p");
  
    copyright.innerHTML = `\u00A9 Aaliyah Closs ${thisYear}`;
  
    footer.appendChild(copyright);
    body.appendChild(footer);
  }
  
  addFooter();
  