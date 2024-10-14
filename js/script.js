// Search for news API. Create an acccount and get the API key from account
import { API_KEY } from "./config.js";

// create a structure of card
const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
    try {
        /*
         console.log("Fetching the data ....")
         ************************************
        */

        // For fetching the data visit the homepage of website and there are some examples. of data in json format.
        // The home page shows the URL by which we can fetch the data.
        // You can see the docs of the website to see the query string parameter
        const apiUrl = "https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=" + API_KEY;
        
        // Beacuse of the parameter pageSize=10 we're showing 10 blocks. 
        // That type parameter you can search on news api website.

        const response = await fetch(apiUrl);
        const data = await response.json();
        /*
        console.log("Data =",data);
        **************************
        */
       

        // we want to show the data in our card
        //  for show something we need to return something
        return data.articles;
    } catch (error) {
        console.error("Error fecting while data.", error);
        return []; // That shows no-data is fetched
    }
}

function displayBlogs(articles) {
    // This function will generate cards
    // also we need to one more thing if the website is showing some previously fetched data then first of all we want to remove that and after removing we'll simply replace it with newest one.
    blogContainer.innerHTML = "";
    articles.forEach((article) => {

        // We're going to create a same thing like this dyanmically using javascript
        /*
        <div class="blog-card">
            <img src="https://placehold.co/600x400" alt="600 x 400 image">
            <h2> This is a title</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, earum. Tempora, explicabo quidem cum sint ipsa harum fugit, dicta amet incidunt, quam quia. Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
        </div>
        */
        
        // create a div-tag
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        
        // store the image somewhere
        const img = document.createElement("img");
        
        // img-tag also have two attributes
        img.src = article.urlToImage;
        img.alt = article.title;

        // create h2
        const title = document.createElement("h2");
        title.textContent = article.title;

            // some titles are too large so add ... after some np. of word in title.
            const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) + "..." : article.title; 
            title.textContent = truncatedTitle;

        // create discription (p-tag)
        const description = document.createElement("p");
        description.textContent = article.description;
        
        // same way with discription.
            if(!article.description){
                description.textContent = "Click here to see Description";
            
            }
            else{

                const truncatedDescription = article.description.length > 120 ? article.description.slice(0,120) + "..." : article.description;
                description.textContent = truncatedDescription;
            }

        /* We have successfully created our components 
        Now, after creating our components we need to append those componets inside our main#blog-container
        for doing that ..,
        */
       blogCard.appendChild(img);
       blogCard.appendChild(title);
       blogCard.appendChild(description);

       blogContainer.appendChild(blogCard);



    })
}

(async () => {
    /* 
    console.log("hi");
    ********************
     */
    try {
        const articles = await fetchRandomNews();
        /*
         console.log("Articles =",articles);
        ********************
        */
       displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching while random news");
    }
})();
