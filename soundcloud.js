const request = require("sync-request");

const COOKIE_STRING =  '__utma=255682432.191511692.1519127802.1519619859.1519632159.31; __utmz=255682432.1519127802.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _pk_id.1.4ef9=9418a2a8be749d70.1519127804.33.1519632788.1519623006.; tfuser=yzllz0001; tfsecure=4b56c7d0677c9d10e9178cb07335a866; tfpass=5321d138e68b02749c0f28c434e0a6b7; LBSESSIONID=A|WpPCB|WpO/H; PHPSESSID=1b7f04be34cfa909dad8f1007ecb65ab; __utmb=255682432.7.10.1519632159; __utmc=255682432; _pk_cvar.1.4ef9=%7B%221%22%3A%5B%22userid%22%2C%222091938%22%5D%7D; _pk_ses.1.4ef9=*; __utmt=1';
const GET_VIDEO = "https://www.youlikehits.com/soundcloudplays.php?step=reload&rand="+Math.random();
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0";
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

