const request = require("sync-request");

const COOKIE_STRING =  'tfuser=yzllz002; tfsecure=9d197bd21dc68b611d85aedff2338b41; tfpass=388d5a80de4fd3f269d6fab440892e0b; PHPSESSID=2a6b5560c33b7f07df2701ef2ff3d5ad; __utma=255682432.1129091615.1519126798.1519659566.1519694512.44; __utmb=255682432.5.10.1519694512; __utmc=255682432; __utmz=255682432.1519126798.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); LBSESSIONID=A|WpS0B|WpSyq; _pk_cvar.1.4ef9=%7B%221%22%3A%5B%22userid%22%2C%222091907%22%5D%7D; _pk_id.1.4ef9=d457635c337fd395.1519126798.43.1519694976.1519659567.; _pk_ses.1.4ef9=*';
const GET_VIDEO = "https://www.youlikehits.com/soundcloudplays.php?step=reload&rand="+Math.random();
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0";
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

