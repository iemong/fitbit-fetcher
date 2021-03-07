import {config} from "https://deno.land/x/dotenv/mod.ts";
import {
    format,
    startOfYesterday,
} from "https://deno.land/x/date_fns/index.js";

type Summary = {
    stage: {
        deep: number;
        light: number;
        rem: number;
        wake: number;
    };
    totalMinutesAsleep: number;
    totalSleepRecords: number;
    totalTimeInBed: number;
};

const {token} = config();

const today = format(new Date(), "yyyy-MM-dd", {});
// const yesterday = format(startOfYesterday(), "yyyy-MM-dd", {});

const res = await fetch(
    `https://api.fitbit.com/1.2/user/-/sleep/date/${today}.json`,
    {
        headers: new Headers({
            method: "GET",
            "Authorization": `Bearer ${token}`,
        }),
    },
);

const json = await res.json();
const {summary} = json;
const {totalMinutesAsleep, totalTimeInBed}: Summary = summary;

const convert2HoursAndMinutes = (minutes: number): string => `${Math.floor(minutes / 60)}時間 ${minutes % 60}分`;

console.log(`実際の睡眠時間: ${convert2HoursAndMinutes(totalMinutesAsleep)}`);
console.log(`布団の中にいた時間: ${convert2HoursAndMinutes(totalTimeInBed)}`);
