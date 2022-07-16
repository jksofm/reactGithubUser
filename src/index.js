import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <GithubProvider>
    <Auth0Provider
      domain="dev-e7se7gz4.us.auth0.com"
      clientId="Hyu3BGYRYgI66AXqa4CNNdpc8nPDYJVU"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Auth0Provider>
  </GithubProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
