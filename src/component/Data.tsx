import tweets from '../resource/tweets.json';

const getPreviewData = () => {
    let previewData = [];
    for(let i = 0; i < 20; i++) {
        previewData.push(tweets[i]);
    }
    return previewData;
}

const cleanUpSentences = () => {
    // copy json to avoid two way binding
    const data = JSON.parse(JSON.stringify(tweets));

    var urlPattern = /(?:www|https?)[^\s]+/;
    var tagPattern = /(@)[^\s]+/gi;
    var hastTagPattern = /(#)[^\s]+/gi;
    var specialCharacters = /[.?!,‘’'"–\-*&;:]/gi;

    data.map((tweet: any) => {
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

const cleanUpWords = (dirtyWords: string[]) => {
    const filter = ['', '\n', 'I', 'you', 'to', 'and', 'is', 'the', 'a', 'of', 'on', 'it', 'in', 'for', 'all', 'will', 'not', 'they', 'be', ];
    
    for(let i = 0; i < dirtyWords.length; i++) {
        filter.forEach(filterItem => {
            if(dirtyWords[i] === filterItem) {
                delete dirtyWords[i];
            }
        })
    }
    return dirtyWords;
}

const getRanking = () => {
    const wordsCount = getWordsWithCounter();
    var topTen: any = {};
    for(let key in wordsCount) {
        if(Object.values(topTen).length < 10){
            topTen[key.replace(/_/, '')] = wordsCount[key];
        } else {
            for(let max in topTen) {
                if(wordsCount[key] > topTen[max]) {
                    delete topTen[max];
                    topTen[key.replace(/_/, '')] = wordsCount[key];
                }
            }
        }
    }
    
    // sort by ranking
    let sortedTopTen: [string, any][] = Object.entries(topTen).sort(compare);
    
    return sortedTopTen;
}

const getWordsWithCounter = () => {
    const cleanTweets = cleanUpSentences();
    const dirtyWords: string[] = [];
    let ranking: any = {};

    // get all the words
    cleanTweets.forEach((tweet: any) => {
        var tweetWords = tweet.text.split(' ');
        tweetWords.forEach((tweetWord: any) => {
            dirtyWords.push(tweetWord);
        })
    });

    const cleanWords = cleanUpWords(dirtyWords);

    // set a value and the related counter
    for(let i = 0; i < cleanWords.length; i++) {
        ranking["_" + cleanWords[i]] = (ranking["_" + cleanWords[i]] || 0) + 1;
    }
    // unset undefined
    delete ranking['_undefined'];

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
    getRanking,
}