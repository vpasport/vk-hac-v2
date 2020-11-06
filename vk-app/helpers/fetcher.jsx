export default function fetcher(url, options) {
    if (typeof options !== 'object') options = {};

    options.credentials = 'include';

    if ('body' in options) {
        options.body = JSON.stringify(options.body);
    }

    if ('method' in options && options.method === "POST") {
        options.headers = {
            "Content-Type": "application/json"
        }
    }

    console.log(url, options)

    return fetch(url, options);
}