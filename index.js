const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const app = express();
const port = 3000;

app.get("/*", async (req, res) => {
    const params = req.params[0];
    const query = req.query;

    let url;

    try {
        url = new URL(params);
        url.search = new URLSearchParams(query).toString();
    } catch (err) {
        return res.status(400).send(err.toString());
    }

    try {
        const response = await (
            await fetch(url, {
                method: "GET",
                headers: {
                    accept:
                        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "en-US,en;q=0.9",
                    "cache-control": "no-cache",
                    dnt: "1",
                    pragma: "no-cache",
                    "sec-ch-ua":
                        '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Linux"',
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "none",
                    "sec-fetch-user": "?1",
                    "upgrade-insecure-requests": "1",
                    "user-agent":
                        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.50",
                },
            })
        ).text();

        res.send(response);
    } catch (err) {
        res.status(404).send(err.toString());
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});