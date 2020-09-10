// Import Axios
import axios from "axios";

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

const gitUserName = "rmjuarez12";
const APIUrl = `https://api.github.com/users/${gitUserName}`;
const getGitData = axios.get(APIUrl);

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

getGitData.then((res) => {
  // console.log to inspect data returned
  console.log("Data returned", res);
});

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

getGitData
  .then((res) => {
    const cardParent = document.querySelector(".cards");
    const cardMakerFunction = cardMaker(res.data);

    cardParent.prepend(cardMakerFunction);
  })
  .catch((err) => console.log(err));

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

// Get the followers data
const APIUrlFollowers = `https://api.github.com/users/${gitUserName}/followers`;
const getFollowersData = axios.get(APIUrlFollowers);

getFollowersData
  .then((res) => {
    // Save all user data in a variable
    const followersArray = res.data;

    // Get the parent div to append to
    const cardParent = document.querySelector(".cards");

    // Add a followers title heading
    const followersTitle = document.createElement("h2");
    followersTitle.textContent = "Followers";
    followersTitle.classList.add("followers-heading");
    cardParent.appendChild(followersTitle);

    // Loop through all the followers data
    followersArray.forEach((user) => {
      // Get a new promise for each user
      const newURL = `https://api.github.com/users/${user.login}`;

      // USe the data to insert to the dom
      axios.get(newURL).then((userData) => {
        const cardMakerFunction = cardMaker(userData.data);
        cardParent.appendChild(cardMakerFunction);
      });
    });
  })
  .catch((err) => console.log(err));

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function cardMaker(user) {
  // Create the main container
  const cardContainer = document.createElement("div");

  // Add attributes to main container
  cardContainer.classList.add("card");

  // Create the image element
  const userImg = document.createElement("img");

  // Add source image to the image element
  userImg.src = user.avatar_url;

  // Create the elements for the card info
  const cardInfoContainer = document.createElement("div");
  const cardName = document.createElement("h3");
  const cardUserName = document.createElement("p");
  const cardLocation = document.createElement("p");
  const cardProfile = document.createElement("p");
  const cardFollowers = document.createElement("p");
  const cardFollowing = document.createElement("p");
  const cardBio = document.createElement("p");

  // Add attributes to card info elements
  cardInfoContainer.classList.add("card-info");
  cardName.classList.add("name");
  cardUserName.classList.add("username");

  // Add content to card-info elements
  cardName.textContent = user.name;
  cardUserName.textContent = user.login;
  cardLocation.textContent = `Location: ${user.location}`;
  cardProfile.textContent = "Profile: ";
  cardFollowers.textContent = `Followers: ${user.followers}`;
  cardFollowing.textContent = `Following: ${user.following}`;
  cardBio.textContent = `Bio: ${user.bio}`;

  // Create xtra inner HTML elements for certain pieces of info on the card info elements
  const cardProfileURL = document.createElement("a");

  // Add content to the profile link element and insert into profile element
  cardProfileURL.textContent = user.html_url;
  cardProfileURL.setAttribute("href", user.html_url);
  cardProfileURL.setAttribute("target", "_blank");
  cardProfile.appendChild(cardProfileURL);

  // Insert all necessary childs into the card info
  const cardInfoChildren = [
    cardName,
    cardUserName,
    cardLocation,
    cardProfile,
    cardFollowers,
    cardFollowing,
    cardBio,
  ];

  cardInfoChildren.forEach((element) => {
    cardInfoContainer.appendChild(element);
  });

  // Insert all necessary childs into the main card container
  const mainCardChildren = [userImg, cardInfoContainer];

  mainCardChildren.forEach((element) => {
    cardContainer.appendChild(element);
  });

  // Return the entire card element
  return cardContainer;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
