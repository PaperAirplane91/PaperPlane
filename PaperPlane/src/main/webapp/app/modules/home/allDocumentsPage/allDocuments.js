document.addEventListener("DOMContentLoaded", function () {
    const documentList = document.getElementById("document-list");

    // GET all documents in API and make the data a json response.
    fetch("http://localhost:8080/api/documents")
        .then((response) => response.json())
        .then((data) => {
            // Here we loop through the received JSON and get the titles from each section.
            data.forEach((document) => {
                const title = document.title;

                // Create a list item for each title and append it to the list
                const listItem = document.createElement("li");
                listItem.textContent = title;
                documentList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Could not retrieve data", error);
        });
});
