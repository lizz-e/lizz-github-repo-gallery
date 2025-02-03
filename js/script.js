// .overview - profile info
const profile = document.querySelector(".overview");
const username = "lizz-e";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");
const viewReposButton= document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

//// fetch API JSON data ////
const getProfile = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    displayProfile(data);
};

getProfile();

// fetch & display user info
const displayProfile = function (data) {
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
    profile.append(div);
    getRepos(username);
};

// fetch repo data //
const getRepos = async function (username) {
    const grabRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=update&per_page=100`);
    const repoData = await grabRepos.json();
    displayRepos(repoData);
}; 

// display repos
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    };
};

// click event for repo in the repolist section
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

// create function to get specific repo info
const getRepoInfo = async function (repoName) {
    const getInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getInfo.json();
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    const languages = [];

    for (const language in languageData) {
        languages.push(language); 
    };

    displayRepoInfo(repoInfo, languages);
};

// create function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    const singleRepoInfo = document.createElement("div");
    singleRepoInfo.innerHTML = 
    `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">
    View Repo on GitHub!</a>`;
    repoDataSection.innerHTML = "";
    repoDataSection.append(singleRepoInfo);
    repoDataSection.classList.remove("hide");
    repoSection.classList.add("hide");
    viewReposButton.classList.remove("hide");
};

//click event for back button
viewReposButton.addEventListener("click", function () {
    repoSection.classList.remove("hide");
    repoDataSection.classList.add("hide");
    viewReposButton.classList.add("hide");
});

// input event for search box
filterInput.addEventListener("input", function (e) {
    const searchText= e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerCaseText = searchText.toLowerCase();

    for (const repo of repos) {
        const repoText = repo.innerText.toLowerCase();

        if (repoText.includes(lowerCaseText)) {
            repo.classList.remove("hide");
        }else {
            repo.classList.add("hide");
        }
    };
});