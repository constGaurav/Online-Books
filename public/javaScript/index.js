const google = document.getElementById("signin");
const data = document.getElementById("data");
const userName = document.getElementById("name");
const profilePic = document.getElementById("profilePic");
const searchOption = document.getElementById("search-option");

const setData = (profile) => {
  userName.innerText = profile.getName();
  profilePic.src = profile.getImageUrl();
  data.style.display = "block";
  google.style.display = "none";
  searchOption.style.display = "block";
}

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  // username = profile.getName();
  setData(profile);
  // console.log(username);
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    alert("You have been signed out successfully");
    userName.innerText = "Please Sign in";
    profilePic.src = "./images/user.jpg";
    data.style.display = "none";
    google.style.display = "block";
    searchOption.style.display = "none";
  });
}
