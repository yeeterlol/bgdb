async function urlshenanigans(url) {
    // hoping the user doesn't FUCK up the url
    try {
        const shit = new URL(url);

        if (!shit.hostname == "github.com") {
            alert('not github, wip lolz')
            return "not github"
        }
    
        let text = document.getElementById("p");
        /*
            WARNING THIS IS PROBABLY FUCKING INSECURE
            FIX THIS SHIT BEFORE XSS OUGHHHH
            ITS 2:18am and i want to die help
        */
        const pathname = shit.pathname
        text.textContent = `loading ${pathname}....`
            
        const data = await fetch(`https://api.github.com/repos${pathname}/releases/latest`)
        if (!data.ok) { 
            if (data.status === 404) {
                alert('there is no releases')
                return "precompiled exe"
            }

            if (data.status === 429) {
                alert('rate limited....')
                return "rate limit."
            }
        }
        
        const json = await data.json();
          
        // const json = await data.json();
        console.log(json.assets);
        if (json.assets.length === 0) {
            alert("no precompiled exe, only source. you probably don't need source if your using this tool :3")
            return "a"
        }
        
        for (let i = 0; i < json.assets.length; i++) {
            // console.log(json.assets[i]);
            let b = document.createElement("div");
            b.className = "item"
            let p = document.createElement("p");
            p.textContent = json.assets[i].name;
        
            let a = document.createElement("a");
            a.href = json.assets[i].browser_download_url;
            a.textContent = "Download";
            a.className = "button";

            b.append(p);
            b.append(a);

            let div = document.getElementById("list");
            div.append(b);
        }

        
        
        
        text.textContent = "";
        // text.textContent = "";

    } catch (error) {
        alert("[!] error: broken url")
        console.error(error);
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