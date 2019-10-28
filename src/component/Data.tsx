import tweets from '../resource/tweets.json';

const getPreviewData = () => {
    var data = [];
    for(let i = 0; i < 10; i++) {
        data.push(tweets[i]);
    }
    return data;
}

const cleanUpData = () => {
    const data = getPreviewData();

    var urlPattern = /(?:www|https?)[^\s]+/;
    var tagPattern = /(@)[^\s]+/gi;
    var hastTagPattern = /(#)[^\s]+/gi;
    var specialCharacters = /[.?!,‘’'"–\-*&;:]/gi;

    data.map(tweet => {
        var tweetText = tweet.text;
        tweetText = tweetText.replace(urlPattern, '');
        tweetText = tweetText.replace(tagPattern, '');
        tweetText = tweetText.replace(hastTagPattern, '');
        tweetText = tweetText.replace(specialCharacters, '');
        tweet.text = tweetText;
        return tweet;
    })
    return data;
}

const getRanking = () => {
    const wordsCount = getWordsWithCounter();
    var topTen: any = {};
    for(let key in wordsCount) {
        if(Object.values(topTen).length < 10){
            topTen[key] = wordsCount[key];
        } else {
            for(let max in topTen) {
                if(wordsCount[key] > topTen[max]) {
                    delete topTen[max];
                    topTen[key] = wordsCount[key];
                }
            }
        }
    }
    
    // sort by ranking
    let sortedTopTen = Object.entries(topTen).sort(compare);
    // bring data back to array structure
    let topTenResult: (name: string, counter: number)[] = [];
    sortedTopTen.forEach(item => {
        topTenResult[item[0]] = item[1];
    });
    return topTenResult;
}

const getWordsWithCounter = () => {
    const cleanTweets = cleanUpData();
    const words: string[] = [];
    const ranking: any = {};

    // get all the words
    cleanTweets.forEach(tweet => {
        var tweetWords = tweet.text.split(' ');
        tweetWords.forEach(tweetWord => {
            words.push(tweetWord);
        })
    });

    // set a value and the related counter
    for(var i = 0; i < words.length; i++) {
        ranking["_" + words[i]] = (ranking["_" + words[i]] || 0) + 1;
    }
    return ranking
}

const compare = (a: any, b: any) => {
    if(a[1] > b[1]) {
        return -1;
    }
    else return 1;
}

export default {
    getPreviewData,
    cleanUpData,
    getRanking,
}