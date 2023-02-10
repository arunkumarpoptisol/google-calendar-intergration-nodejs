const { OAuth2Client } = require("google-auth-library");
const express = require("express");
const google = require("@googleapis/calendar");
const OAuth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URL
);

async function GetRefreshToken(token) {
  let refreshToken = await oAuth2Client.getToken(token);
  return refreshToken;
}

async function CreateEvent(data, refreskToken) {
  // adding event to google
  await oAuth2Client.setCredentials({ refresh_token: refresh_token });
  const calendar = google.calendar("v3");
  const res = await calendar.events.insert({
    auth: OAuth2Client,
    calendarId: "primary",
    requestBody: {
      attendees: data.attendees, // email that you want to add as guest summary: data.title, // title of the event
      description: data.description, // description of event
      guestsCanModify: true,
      color: "6", // you can check the docs for different colors
      start: {
        dateTime: new Date(data.startDate), // event start date
      },
      end: {
        dateTime: new Date(data.endDate), // event end date
      },
    },
  });
  return res;
}

async function UpdateEvent(data, refreskToken) {
  // adding event to google
  await OAuth2Client.setCredentials({ refresh_token: refresh_token });
  const calendar = google.calendar("v3");
  const res = await calendar.events.update({
    auth: OAuth2Client,
    calendarId: "primary",
    eventId: data.id, // this is the id we saved while creating event requestBody: {
    attendees: data.attendees, // email that you want to add as guest summary: data.title, // title of the event
    description: data.description, // description of event guestsCanModify: true,
    color: "6", // you can check the docs for different colors
    start: {
      dateTime: new Date(data.startDate), // event start date
    },
    end: {
      dateTime: new Date(data.endDate), // event end date
    },
  });
  return res;
}

async function ListEvents(data, refresh_token) {
  return await calendar.events.list({
    auth: OAuth2Client,
    calendarId: "primary",
    maxResults: 5,
  });
}

async function DeleteEvent(data, refresh_token) {
  return await calendar.events.delete({
    auth: OAuth2Client,
    calendarId: "primary",
    // Event identifier.
    eventId: data.id,
  });
}
module.exports = {
  GetRefreshToken,
  CreateEvent,
  UpdateEvent,
  ListEvents,
  DeleteEvent,
};
