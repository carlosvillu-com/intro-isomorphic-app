import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import Transmit from "react-transmit";
import {Router} from "react-router";
import createBrowserHistory from 'history/lib/createBrowserHistory';


const reactRoot = window.document.getElementById("root");
Transmit.render(Router, {routes, history: createBrowserHistory()}, reactRoot);

/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
if (process.env.NODE_ENV !== "production") {
	if (!reactRoot.firstChild || !reactRoot.firstChild.attributes ||
	    !reactRoot.firstChild.attributes["data-react-checksum"]) {
		console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
	}
}
