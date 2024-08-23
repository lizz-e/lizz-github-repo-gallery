// .overview - div for profile info
const profile = document.querySelector(".overview");
const username = "lizz-e";
const repoList = document.querySelector(".repo-list");

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

    getRepos();
    // getRepos shows the repos that the user created
};

// fetch repo data //
// fetch repos
const getRepos = async function () {
    // end point is repos. sort repos by most recent update is sort=update. show 100 repos per page is per_page=100
    const grabRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=update&per_page=100`);
    const repoData = await grabRepos.json();
    // console.log(repoData);
    displayRepos(repoData);
}; 
// placed getRepos() in displayProfile() to fetch & display repo

// display repos
const displayRepos = function (repos) {
    for (const repo of repos) {
        // create a list
        const repoItem = document.createElement("li");
        // create repo class
        repoItem.classList.add("repo");
        // show repo name on the website
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        // add the items to the repo list
        repoList.append(repoItem);
    };
    // add displayRepos() at getRepos()
};