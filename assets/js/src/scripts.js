const posts = (function() { // pattern IIFE [ Immediately Invoked Function Expressions ]
    const url = "https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs";

    return { // <- module pattern
        sendSearch: function() {
            console.log('busca pa nois');
            let searchTerm = document.querySelector('#searchTerm').value;
            console.log(searchTerm);
            fetch(url + `?search=${searchTerm}`)
            .then(response => response.json())
            .then(json => {
                let searchResult = document.querySelector('#searchResult');
                let result = json.map(item => (
                    `<li>${item.title}</li>`
                    // console.log(item)
                ))
                .join('');
                searchResult.innerHTML = result;
            });
        },
        getPosts: function() {
            fetch(url)
                .then(function(response) {
                    if (response.ok) {
                        response.json()
                            .then( function(data) {
                                var blogWrapper = document.getElementById("demo");
                                var allPosts = data.map(item => {
            
                                    var capitalLetter = item.title.charAt(0).toUpperCase();
                                    var title = `<h2 class='blog-post-title'>${capitalLetter + item.title.slice(1)}</h2>`;
                                    var body = `<p>${item.body}</p>`;
                                    var meta = `<p class='blog-post-meta'>Post <a href='#'>#${item.id}</a></p>`;
                                    var blogPost = `<div class='blog-post'>${title + meta + '<hr />' + body + body + body + body}</div>`;
                                    return blogPost;
                                })
                                .splice(0, 4) // começa do index 0, conta até 4 (até o terceiro item), e deleta o restante
                                .join(""); // altera a junção entre os itens do array
            
                                blogWrapper.innerHTML = allPosts;
                            });
                    }
                });
        }
    }

} () /* parênteses para invocar a função logo que ela é construída, e não pode ser acessada externamente */);

const search = ( function () {
    return {
        openSearch: function() {
            document.querySelector('#searchLink')
                .addEventListener('click', () => { 
                    let form = document.querySelector('#searchBox > div');
                    let input = document.querySelector('#searchBox > div > input');
                    let submitSearach = document.querySelector('#submitSearch');

                    form.style.display = "block";
                    form.animate(
                        [
                            // keyframes
                            { transform: "translateX(25px)" },
                            { transform: "translateX(0px)" }
                        ],
                        {
                            // timing options
                            duration: 300,
                            iterations: 1
                        }
                    );
                    input.focus();
                    submitSearach.addEventListener('click', function() {
                        posts.sendSearch();
                    });
                });
        }
    }
} () )

search.openSearch();
posts.getPosts();

// function reqListener() {
//     this.responseText;
//     console.log(this.responseText);
// }

// var oReq = new XMLHttpRequest();
// oReq.onload = reqListener;
// oReq.open("GET", "https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs", true);
// oReq.send();
