import cookieCutter from "cookie-cutter";

export const fetchToken = () => {
  const data = {
    client_id: "Makhmud.Makhmudov.LEIPapa@rapidlei-staging.com",
    client_secret: "gYuexPg9Qc9dtiH03ZGlycQ73pQjq4aToj9ECNkZg",
    grant_type: "client_credentials",
  };
  let body = "";
  for (let key in data) {
    if (body.length > 0) body += "&";
    body += key + "=" + data[key];
  }

  const url = "https://apistaging.rapidlei.com/v1/auth/token";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  })
    .then((res) => res.json())
    .then((data) => cookieCutter.set("access_token", data.access_token));
};

export const fetchCompanies = async (companiesText) => {
  const data = {
    keyword: companiesText,
    legalJurisdiction: "GB",
    entityType: "GENERAL",
  };

  console.log("fetch", companiesText);
  const url =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      "https://apistaging.rapidlei.com/v1/leis/searchByKeyword"
    );
  if (companiesText) {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieCutter.get("access_token")}`,
      },
      redirect: "follow",
      body: JSON.stringify(data),
    })
      .then(async (r) => {
        const data = await r.json();
        console.log(data);
        return data;
      })
      .catch(() => cookieCutter.set("access_token", null));
    return result;
  }
};
