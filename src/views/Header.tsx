import React, { useState } from "react";
import "./styles/header.css";
import axios from "axios";

export default function Header() {
    const [gifs, setGifs] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [apiKey, setApiKey] = useState("");

    function addGifs(data: object) {}

    async function sendRequest() {
        console.log(search, apiKey);
        const clientKey = "my_test_app";
        const lmt = 8;
        try {
            const { data, statusText } = await axios.get(
                "https://tenor.googleapis.com/v2/search?q=" +
                    search +
                    "&key=" +
                    apiKey +
                    "&client_key=" +
                    clientKey +
                    "&limit=" +
                    lmt
            );
            console.log(JSON.stringify(data, null, 4));
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div id="header">
            <input
                type="text"
                placeholder="Tenor API Token"
                id="api-box"
                onChange={(event) => {
                    setApiKey(event.target.value);
                }}
            />
            <div id="search-box">
                <input
                    placeholder="Search..."
                    id="search-text"
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                />
                <input
                    type="button"
                    value="Search"
                    id="search-btn"
                    onClick={sendRequest}
                />
            </div>
        </div>
    );
}
