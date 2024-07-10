import { useState, useEffect } from 'react';
import { validTokenURL } from '@api';
import { parseISO, format } from 'date-fns';

/////Check Null or Empty
export function isNullOrEmpty(value) {
    return (value === undefined || value === null || value === '' || value?.length === 0) ? true : false;
}

/////Fetch Data
export const fetchData = async (url, dataConfig) => {
    try {
        const controller = new AbortController();
        const signal = controller.signal;

        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            dataType: "json",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataConfig),
            signal: signal,
        });

        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            return null;
        }
    } catch (error) {
        return false;
    }
};

/////Get last 2 words
export function getLastTwoWords(str) {
    // Split the string into an array of words
    const words = str.trim().split(/\s+/);

    // Get the last two words
    const lastTwoWords = words.slice(-1);

    // Join the last two words into a string
    return lastTwoWords.join(' ');
}

///// Check if user token still valid
export const checkValidToken = async(token) => {
    const postData = await fetch(validTokenURL + `token=${token}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
        )
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => false);

    return postData;
}

//// Get Date Time
export const getDateFormat = (date, formatDate) => {
    const dateString = date;
    const parsedDate = parseISO(dateString);
    const formattedDate = format(parsedDate, formatDate);

    return formattedDate;
}