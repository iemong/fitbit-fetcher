import { config } from "https://deno.land/x/dotenv/mod.ts";

const { token } = config();

const res = await fetch("https://api.fitbit.com/1/user/-/profile.json", {
  headers: new Headers({
    method: "GET",
    "Authorization": `Bearer ${token}`,
  }),
});

const json = await res.json();

console.log(json);
