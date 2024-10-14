// Search for news API. Create an acccount and get the API key from account
import { API_KEY } from "./config.js";

// create a structure of card
const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
    try {
        // For fetching the data visit the homepage of website and there are some examples. of data in json format.
        // The home page shows the URL by which we can fetch the data.
        // You can see the docs of the website to see the query string parameter
        const apiUrl =
            "https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=" +
            API_KEY;

        const req_object = new Request(apiUrl);
        const response = await fetch(req_object);
        const data = response.json();
        console.log("data =", data);

        // we want to show the data in our card
        //  for show something we need to return something
        return data.articles;
    } catch (error) {
        console.error("Error fecting while data.", error);
        return []; // That shows no-data is fetched
    }
}

function displayBlogs() {}

(async () => {
    console.log("hi");
    try {
        const articles = await fetchRandomNews();
        console.log(articles);
    } catch (error) {
        console.error("Error fetching while random news");
    }
})();
