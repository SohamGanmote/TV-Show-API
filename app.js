//TV Shows APIs
//https://api.tvmaze.com/search/shows?q=${showname}

const search = document.querySelector("#searchShow");
const btn = document.querySelector("button");
const lists = document.querySelector(".cardBox")

btn.addEventListener("click", () => {
    show();
})
const show = async() => {
    const allCards = document.querySelectorAll(".card");
    for (let card of allCards) {
        card.remove();
    }

    const showname = search.value;
    try {
        const request = await axios.get(`https://api.tvmaze.com/search/shows?q=${showname}`)

        console.log(request);

        const numberOfMovies = request.data.length;

        if (numberOfMovies === 0) {

            const errImg = document.querySelector(".page-Error");
            errImg.remove();

            const error = document.createElement("img");
            error.setAttribute("src", "Error404.svg")
            error.classList.add("page-Error");
            lists.append(error);
        }

        if (numberOfMovies !== 0) {

            const errImg = document.querySelector(".page-Error");
            errImg.remove();

            for (let i = 0; i < numberOfMovies; i++) {
                const card = document.createElement("div");
                card.classList.add("card");

                const numberOfGenres = request.data[i].show.genres.length;

                const poster = document.createElement("img");
                console.log(request.data[i].show.image.original);
                poster.setAttribute("src", request.data[i].show.image.original)
                card.append(poster);

                const movieName = document.createElement("h2");
                console.log(request.data[i].show.name);
                movieName.innerText = request.data[i].show.name;
                card.append(movieName);

                const movieSummary = document.createElement("div");
                console.log(request.data[i].show.summary);
                movieSummary.innerHTML = request.data[i].show.summary.slice(0, 150);
                console.log(movieSummary.length);
                movieSummary.classList.add("summary")
                card.append(movieSummary);

                const movieGenres = document.createElement("div");
                movieGenres.classList.add("genres")
                for (let j = 0; j < numberOfGenres; j++) {
                    const p = document.createElement("p");
                    console.log(request.data[i].show.genres[j]);
                    p.innerText = request.data[i].show.genres[j];
                    movieGenres.append(p);
                }
                card.append(movieGenres);

                const officialLink = request.data[i].show.officialSite;
                const showLink = document.createElement("a");
                showLink.setAttribute("href", officialLink);
                showLink.setAttribute("target", "_blank");

                const watchBtn = document.createElement("button");
                watchBtn.innerText = "Watch Now";
                watchBtn.classList.add("watch");
                showLink.append(watchBtn);
                card.append(showLink);

                lists.append(card);
            }
        }
    } catch (err) {
        console.log("Server Error");
    }
    search.value = "";
}