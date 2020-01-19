import React , {useState} from 'react';
import '../styles/styles.css';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Chart from './Chart';

import service from './Data';
import { isArray } from 'util';

export default function TweetGrid (props: any) {

    // auto generating randomized keys for the table elements
    //test  
    const uuidv1 = require('uuid/v1');
    uuidv1();
    
    const [previewTweets, setPreviewTweets] = useState([{id: 0, text: null}]);
    const [ranking, setRanking] = useState([[1, null], [null]]);
    const [twitterAccount, setTwitterAccount] = useState('');
    const [notAValidAccount, setNotAValidAccount] = useState('');

    const loadData = () => {
        service.getAllTweets(twitterAccount, props.jwt)
        .then((result: [] | null) => {
            if(isArray(result)) {
                setNotAValidAccount('');
                setPreviewTweets(result.slice(0, 50));
            }
            else{
                setNotAValidAccount('This is not an Account.');
                return;
            }
        });
        service.getRanking(twitterAccount, props.jwt)
        .then((result: [string, any][] | null) => {
            if(isArray(result)) {
                setRanking(result);
            }
        });
    };

    const handleTwitterAccountChange = (event: any) => {
        let newValue: string = event.target.value;
        setTwitterAccount(newValue);
    };
    
    return (
        <React.Fragment>
            <TextField className="searchBox" placeholder="Account Name e.g. 'elonMusk'" value={twitterAccount} onChange={handleTwitterAccountChange}></TextField>
            <Button color="primary" onClick={loadData}>Load Tweets</Button>
            <h3>{notAValidAccount}</h3>
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
            <Chart ranking = {ranking} previewTweets = {previewTweets} />
        </React.Fragment>
      );
}
