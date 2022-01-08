import QueryString from "app/utils/querystring";
import PopupWindow from "./PopupWindow";

export const grantAccess = async () => {
  const authorizeUri = "https://github.com/login/oauth/authorize";
  const client_id = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID ?? "";
  const client_secret = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_SECRET ?? "";

  const qs = QueryString.stringify({ client_id, client_secret, scope: "gist" });
  const url = `${authorizeUri}?${qs}`;

  try {
    const pw = new PopupWindow({ url });
    const data = await pw.open();

    if (!data?.code) throw new Error("error");

    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ client_id, client_secret, code: data.code }),
    });

    const resData = await res.json();

    return resData as {
      access_token: string;
      scope: string;
      token_type: string;
    };
  } catch (e) {
    throw Error("Couldn't grant access");
  }
};
