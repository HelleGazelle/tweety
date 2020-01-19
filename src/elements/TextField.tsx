import styled from 'styled-components';
import React from 'react';

const TextField = styled.input`
    background: none;
    padding: 0.5em;
    margin: 0.5em;
    border-radius: 4px;
    border-color:#bebebe;
    border-style:solid;
    font-size: 1em;
    text-align: center;
    width: 300px;
    height: 15px;
    :hover {border-color:#00acee;}
`;
export default TextField;