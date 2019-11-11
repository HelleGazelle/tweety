import React , {useState, useEffect} from 'react';
import '../styles/styles.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import service from './Data';

export default function TweetGrid () {
    // auto generating randomized keys for the table elements
    const uuidv1 = require('uuid/v1');
    uuidv1();
    const twitterAccount = 'elonMusk';
    
    const [previewTweets, setPreviewTweets] = useState([{id: 0, text: null}]);
    const [ranking, setRanking] = useState([[1, null], [null]]);

    useEffect(() => {
        service.getAllTweets(twitterAccount)
        .then((result: []) => {
            setPreviewTweets(result.slice(0, 50));
        });
        service.getRanking(twitterAccount)
        .then((result: [string, any][]) => {
            setRanking(result);
        });
    }, [])
    
    return (
        <React.Fragment>
            <div className="container" >
                <Paper >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Tweet</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {previewTweets.map(tweet => (
                                <TableRow key={uuidv1()}>
                                    <TableCell>{tweet.text}</TableCell>
                                </TableRow>
                                )  
                            )}
                        </TableBody>
                    </Table>
                </Paper>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Rank</TableCell>
                                <TableCell align="center">Word</TableCell>
                                <TableCell align="center"># in text</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(ranking).map(([rank, [word, count]]) => (
                                <TableRow key={uuidv1()}>
                                    <TableCell>{parseInt(rank)+1}</TableCell>
                                    <TableCell>{word}</TableCell>
                                    <TableCell>{count}</TableCell>
                                </TableRow>
                            )
                        )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </React.Fragment>
      );
}
