const request = require("sync-request");

const COOKIE_STRING =  'tfuser=yzllz002; tfsecure=9d197bd21dc68b611d85aedff2338b41; tfpass=388d5a80de4fd3f269d6fab440892e0b; PHPSESSID=fa5476bae12f1fabeec08e4fd74efc4f; __utma=255682432.1129091615.1519126798.1519379904.1519388343.21; __utmb=255682432.4.10.1519388343; __utmc=255682432; __utmz=255682432.1519126798.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _pk_cvar.1.4ef9=%7B%221%22%3A%5B%22userid%22%2C%222091907%22%5D%7D; _pk_id.1.4ef9=d457635c337fd395.1519126798.20.1519388532.1519380422.; _pk_ses.1.4ef9=*; LBSESSIONID=A|WpAHd|WpAGt';
const GET_VIDEO = "https://www.youlikehits.com/soundcloudplays.php?step=reload&rand="+Math.random();
const USER_AGENT = "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.5; en-US; rv:1.9.0.3) Gecko/2008092414 Firefox/3.0.3";
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

