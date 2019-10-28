import React , {useState} from 'react';
import '../styles/styles.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';

import service from './Data';

export default function TweetGrid () {
    
    const [tweets, setTweets] = useState(service.getPreviewData());
    const [ranking, setRanking] = useState(service.getRanking());

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
                            {tweets.map(tweet => (
                                <TableRow key={tweet.id}>
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
                                <TableCell align="center">Ranking</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(ranking).map(([word, counter]) => (
                                <TableRow key={word.toString()}>
                                    <TableCell>{word}</TableCell>
                                    <TableCell>{counter.toString()}</TableCell>
                                </TableRow>
                            )
                        )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
            {/* <div className="cleanUpButton">
                <Button variant="contained" color="primary" onClick={() => setTweets(service.cleanUpData())}>Clean Up</Button>
                <Button variant="contained" color="primary" onClick={() => setRanking(service.getRanking())}>Ranking</Button>
            </div> */}
        </React.Fragment>
      );
}

