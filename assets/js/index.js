function urlshenanigans(url) {
    // hoping the user doesn't FUCK up the url
    try {
        const shit = new URL(url);
    } catch (error) {
        alert("[!] error: broken url")
    }
}

document.addEventListener('DOMContentLoaded', function() {
   const url = new URL(window.location.href);
   const searchParameters = url.searchParams;
   const githubUrl = searchParameters.get("url")

   if (!githubUrl) {
     return "no url!!!!!!!!!!!!!";
   }

   urlshenanigans(githubUrl)
}, false);