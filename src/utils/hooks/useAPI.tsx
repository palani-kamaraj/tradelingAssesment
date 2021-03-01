import React, { useState } from "react";
import { APIMethod } from "../types/enum";

const useAPI = (
  url: string,
  method = APIMethod.GET as APIMethod,
  body?: any
) => {
  const APIURL = "https://api.github.com";
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const execute = async () => {
    setLoading(true);
    if (!url) return;
    await fetch(APIURL + url, {
      headers: {
        "content-type": "application/vnd.github.v3+json",
      },
      method,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setResponse(res);
      })
      .catch(() => {
        setLoading(false);
        setError("error");
      });
  };

  return { execute, response, loading, error };
};

export default useAPI;
