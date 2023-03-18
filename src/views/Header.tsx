import React, { useCallback, useEffect, useState } from "react";
import "./styles/header.css";
import axios from "axios";

export default function Header(props: {
    setGifs?: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const [search, setSearch] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [apiKeyConst, setApiKeyConst] = useState("");

    useEffect(
        useCallback(() => {
            const data = JSON.parse(localStorage.getItem("api-key"));
            if (data != undefined) {
                setApiKey(data.key);
                setApiKeyConst(data.key);
            }
        }, []),
        []
    );

    function addGifs(data: any[]) {
        const urls: string[] = [];
        data.map((item) => {
            urls.push(item.media_formats.tinygif.url);
        });
        console.log(urls);
        props.setGifs(urls);
    }

    function addErr(data: string) {
        const err: string[] = ["error", data];
        props.setGifs(err);
    }

    async function sendRequest() {
        props.setGifs([]);
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
            if (data.results.length == 0) {
                setApiKey("");
                throw new Error("No gifs...");
            }
            addGifs(data.results);
            localStorage.setItem("api-key", JSON.stringify({ key: apiKey }));
            setApiKeyConst(apiKey);
        } catch (error) {
            addErr(error.message);
            console.log(error.message);
        }
    }
    return (
        <div id="header">
            {apiKeyConst == "" && (
                <input
                    type="password"
                    placeholder="Tenor API Token"
                    id="api-box"
                    value={apiKey}
                    onChange={(event) => {
                        const s = event.target.value;
                        setApiKey(s);
                    }}
                />
            )}
            <div id="search-box">
                <input
                    placeholder="Search..."
                    id="search-text"
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key == "Enter" && search != "") sendRequest();
                    }}
                />
                <input
                    type="button"
                    value="Search"
                    id="search-btn"
                    onClick={sendRequest}
                />
            </div>
            <button
                id="clear-api-btn"
                onClick={() => {
                    setApiKey("");
                    setApiKeyConst("");
                    localStorage.setItem(
                        "api-key",
                        JSON.stringify({ key: "" })
                    );
                }}
            >
                Clear API key
            </button>
        </div>
    );
}
