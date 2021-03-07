import {config} from "https://deno.land/x/dotenv/mod.ts";
import {format} from "https://deno.land/x/date_fns/index.js";

const {token} = config();

const date = format(new Date(), "yyyy-MM-dd", {});

const res = await fetch(
    `https://api.fitbit.com/1.2/user/-/sleep/date/${date}.json`,
    {
        headers: new Headers({
            method: "GET",
            "Authorization": `Bearer ${token}`,
        }),
    },
);

const json = await res.json();

console.log(json);
