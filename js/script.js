// .overview - div for profile info
const profile = document.querySelector(".overview");
const username = "lizz-e";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");

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

// add click event when clicking on a repo in the repolist section
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        // console.log(repoName);
        getRepoInfo(repoName);
    }
});

// create function to get specific repo info
const getRepoInfo = async function (repoName) {
    const getInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getInfo.json();
    console.log(repoInfo);

    // create array of languages
    // get languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        // push language into the array
        languages.push(language); 
    };
    // console.log(languages);

    displayRepoInfo(repoInfo, languages);
};

// create function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    // create div element to put the data in the html
    const singleRepoInfo = document.createElement("div");
    // repoInfo was the object retrieved
    singleRepoInfo.innerHTML = 
    `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">
    View Repo on GitHub!</a>`;

    // empty html section
    repoDataSection.innerHTML = "";
    // append to repo data section
    repoDataSection.append(singleRepoInfo);
    // show repo data
    repoDataSection.classList.remove("hide");
    // hide repo section
    repoSection.classList.add("hide");
};