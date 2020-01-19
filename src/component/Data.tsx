import service from '../controller/TweetController';
import { isArray } from 'util';

// return all the tweets fetched from the API
const getAllTweets = (accountName: string, jwt: string) => {
    service.loadTweetsFromAccount(accountName, jwt).then((res) => {
        if (!isArray(res)) {
            return null;
        }
    });
    return service.loadTweetsFromAccount(accountName, jwt);
}

const cleanUpSentences = (tweets: []) => {
    var urlPattern = /(?:www|https?)[^\s]+/;
    var tagPattern = /(@)[^\s]+/gi;
    var hashTagPattern = /(#)[^\s]+/gi;
    var specialCharacters = /[.?!,‘’'"–\-*&;:]/gi;

    tweets.map((tweet: any) => {
        var tweetText = tweet.text;
        tweetText = tweetText.replace(urlPattern, '');
        tweetText = tweetText.replace(tagPattern, '');
        tweetText = tweetText.replace(hashTagPattern, '');
        tweetText = tweetText.replace(specialCharacters, '');
        tweet.text = tweetText;
        return tweet;
    })
    return tweets;
}

const cleanUpWords = (dirtyWords: string[]) => {
    const filter = ['are','Are', 'This','this', 'we', 'We','my','My','Ok', 'an', 'from', 'much', 'more', 'time', 'Yes', 'would', 'this', 'no', 'its', 'or', 'was', 'has', 'No', '...', 'Its', 'been', 'RT','UP','THIS','YEAR', 'The', 'so', 'with','your', 'but', 'true', 'high', 'ahead', 'used', '', '\n', 'I', 'you', 'to', 'and', 'is', 'the', 'a', 'of', 'on', 'it', 'in', 'for', 'all', 'will', 'not', 'they', 'be', 'b', 'bRT', 'at', 'than', 'by', 'that', 'amp', 'S', 'now', 'our', 'next', 'cars', 'about', 'up', 'no', 'yes', 'X', 'bTesla', 'Will', 'one', 'want', 'what', 'should', 'their', 'then'];
    
    for(let i = 0; i < dirtyWords.length; i++) {
        filter.forEach(filterItem => {
            if(dirtyWords[i] === filterItem) {
                delete dirtyWords[i];
            }
        })
    }
    return dirtyWords;
}

const getRanking = (accountName: string, jwt: string) => {
    return service.loadTweetsFromAccount(accountName, jwt)
        .then((result) => {
            if (!isArray(result)) {
                return null;
            }

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