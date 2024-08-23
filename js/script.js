// .overview - div for profile info
const profile = document.querySelector(".overview");
const username = "lizz-e";

//// fetch API JSON data ////
// fetch github profile data
const getProfile = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    // console.log(data);

    // func to get & display profile
    displayProfile(data);
};

getProfile();

// fetch & display user info
const displayProfile = function (data) {
    // create new div
    const div =  document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML =
    `<figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name: </strong>${data.name}</p>
        <p><strong>Bio: </strong>${data.bio}</p>
        <p><strong>Location: </strong>${data.location}</p>
        <p><strong>Number of public repos: </strong>${data.public_repos}</p>
    </div>` ;
    // add div to the profile (.overview element)
    profile.append(div);
    // add func() to the bottom of getProfile
};