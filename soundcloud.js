const request = require("sync-request");

const COOKIE_STRING =  'tfuser=yzllz001; tfsecure=f4666d90190c149338a0094bb8997db6; tfpass=5321d138e68b02749c0f28c434e0a6b7; __utmz=255682432.1519446995.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); PHPSESSID=64a7722a8a68a8e510b885103593679e; __utma=255682432.962908685.1519446995.1519485838.1519524685.6; __utmc=255682432; _pk_cvar.1.4ef9=%7B%221%22%3A%5B%22userid%22%2C%222084126%22%5D%7D; _pk_ses.1.4ef9=*; __utmt=1; LBSESSIONID=A|WpIf3|WpIbT; __utmb=255682432.7.10.1519524685; _pk_id.1.4ef9=6b58266f7877e9cd.1519446997.6.1519525851.1519488276.';
const GET_VIDEO = "https://www.youlikehits.com/soundcloudplays.php?step=reload&rand="+Math.random();
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36";
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

