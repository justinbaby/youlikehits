const request = require("sync-request");

const COOKIE_STRING =  '__utma=255682432.1310730169.1519115410.1519619892.1519633052.34; __utmb=255682432.6.10.1519633052; __utmz=255682432.1519115410.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _pk_id.1.4ef9=7686d905cfa09a75.1519115487.29.1519633099.1519622986.; tfuser=yzllz0002; tfsecure=25e8e6c34ec487e0459ba4363f0b927f; tfpass=5321d138e68b02749c0f28c434e0a6b7; _pk_cvar.1.4ef9=%7B%221%22%3A%5B%22userid%22%2C%222091942%22%5D%7D; _pk_ses.1.4ef9=*; __utmt=1; LBSESSIONID=A|WpPCz|WpPCy; PHPSESSID=3e71cee65822de2b209d66bb8875e3c4; __utmc=255682432';
const GET_VIDEO = "https://www.youlikehits.com/soundcloudplays.php?step=reload&rand="+Math.random();
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393";
const seconds = 3;
const options = {
    headers : {
        'Cookie': COOKIE_STRING,
        'User-Agent' : USER_AGENT
    }
};
const NO_SONGS = "There are no more songs to play for points. Check back later";
let count = 0;
while(count < 50) {
    count++;

    let response = request('GET', GET_VIDEO, options);
    response = response.getBody('utf8');
    console.log(response);
    if (response.includes(NO_SONGS)) {
        process.exit(0);
    }
    let detailsStart = response.indexOf("imageWin") + "imageWin(".length;
    let detailsEnd = response.indexOf(");", detailsStart);
    let details = response.substring(detailsStart, detailsEnd);
    details = details.split(",").map(function(element) {
        return element.trim().replace(/'/g, "");
    })
    console.log(details);
    if(details.length !== 4) {
        continue;
        process.exit(0);
    }

    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while(waitTill > new Date()){}

    const GET_POINTS = `https://www.youlikehits.com/soundcloudplaysplay.php?id=${details[0]}&step=points&x=${details[3]}&rand=`+Math.random();
    console.log(GET_POINTS);
    try {
        response = request('GET', GET_POINTS, options);
    } catch(e) {
        console.log(e);
        continue;
    }
    response = response.getBody('utf8');
    console.log(response);
    console.log(count);
}

