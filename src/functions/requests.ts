import {
  type responseJsonType,
  type IRequestResults,
  type IOptions,
  type methodsType,
} from "@/interfaces/requests";

import { type Ref } from "vue";

const errorsFilter = (errors: string[], filter: object) => {
  const filtered: { [key: string]: string[] } = {};

  for (const [key, value] of Object.entries(filter)) {
    filtered[key] = [];

    value.forEach((filterValue: string) => {
      const filteredByValue = errors.filter(
        (err) => err.toLowerCase().indexOf(filterValue) !== -1
      );
      filtered[key].push(...filteredByValue);
    });
  }
  return filtered;
};

export const getRequest = async (
  path: string,
  method: methodsType,
  headers?: object,
  body: object | null = null
) => {
  const url = "https://dist.nd.ru/api/" + path;

  const header = {
    "Content-Type": "application/json",
  };

  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      header[key as keyof typeof header] = value;
    }
  }

  const options: IOptions = {
    method: method,
    headers: {
      ...header,
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, { ...options });
  if (method === "delete" && response.status === 200) {
    return;
  }
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const processRequestResults = (
  responseJson: responseJsonType,
  filter: { [key: string]: string[] },
  results: IRequestResults = {
    fulfilledValue: {},
    success: false,
    totalError: "",
    filteredErrors: {},
  }
) => {
  if (responseJson?.statusCode === 400) {
    results.filteredErrors = errorsFilter(
      responseJson.message as string[],
      filter
    );
  } else if (
    responseJson?.statusCode === 404 ||
    responseJson?.statusCode === 401 ||
    responseJson?.statusCode === 409
  ) {
    results.totalError = responseJson.message as string;
  } else {
    results.success = true;
    results.fulfilledValue = responseJson as responseJsonType;
  }
  console.log(results);

  return results;
};

export const resetFieldsValue = (refObj: Ref<{ [key: string]: string }>) => {
  for (const key of Object.keys(refObj.value)) {
    refObj.value[key] = "";
  }
};
