// import tweets from '../resource/tweets.json';
import service from '../controller/TweetController';

// return all the tweets fetched from the API
const getAllTweets = (accountName: string) => {
    return service.loadTweetsFromAccount(accountName);
}

const cleanUpSentences = (tweets: []) => {
    var urlPattern = /(?:www|https?)[^\s]+/;
    var tagPattern = /(@)[^\s]+/gi;
    var hastTagPattern = /(#)[^\s]+/gi;
    var specialCharacters = /[.?!,‘’'"–\-*&;:]/gi;

    tweets.map((tweet: any) => {
        var tweetText = tweet.text;
        tweetText = tweetText.replace(urlPattern, '');
        tweetText = tweetText.replace(tagPattern, '');
        tweetText = tweetText.replace(hastTagPattern, '');
        tweetText = tweetText.replace(specialCharacters, '');
        tweet.text = tweetText;
        return tweet;
    })
    return tweets;
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

const getRanking = (accountName: string) => {
    return service.loadTweetsFromAccount(accountName)
        .then((result) => {
            // copy json to avoid two way binding
            const data = JSON.parse(JSON.stringify(result));

            const wordsCount = getWordsWithCounter(data);
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
    })
}

const getWordsWithCounter = (tweets: []) => {
    const cleanTweets = cleanUpSentences(tweets);
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
    getRanking,
    getAllTweets
}