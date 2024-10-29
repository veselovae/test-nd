import {
  type IRequestResults,
  type IOptions,
  type methodsType,
  type ResponseAdditionNoteTypes,
} from "@/interfaces/requests";

import { type Ref } from "vue";

const errorsFilter = (errors: string[], filter: object) => {
  const filtered = {};

  for (const [key, value] of Object.entries(filter)) {
    filtered[key] = [];

    value.forEach((filterValue: string) => {
      const filteredByValue = errors.filter(
        (err) => err.toLowerCase().indexOf(filterValue) !== -1
      );
      filtered[key].push(...filteredByValue);
    });
  }

  //   errors.forEach((err) => {
  //     if (err.toLowerCase().indexOf("заголовок") !== -1) {
  //       filtered.title.push(err);
  //     } else if (err.toLowerCase().indexOf("содержимое") !== -1) {
  //       filtered.content.push(err);
  //     }
  //   });
  return filtered;
};

export const getRequest = async (
  path: string,
  method: methodsType,
  headers: object,
  body: object | null = null
) => {
  const url = "https://dist.nd.ru/api/" + path;

  const header = {
    "Content-Type": "application/json",
  };

  for (const [key, value] of Object.entries(headers)) {
    header[key as keyof typeof header] = value;
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
  const JsonResponse = await response.json();
  return JsonResponse;
};

export const processRequestResults = (
  responseJson: ResponseAdditionNoteTypes,
  filter: object,
  results: IRequestResults = {
    fulfilledValue: {},
    success: false,
    totalError: "",
    filteredErrors: {},
  }
) => {
  if (responseJson?.statusCode === 400) {
    results.filteredErrors = errorsFilter(responseJson.message, filter);
  } else if (
    responseJson?.statusCode === 404 ||
    responseJson?.statusCode === 401
  ) {
    results.totalError = responseJson.message;
  } else {
    results.success = true;
    results.fulfilledValue = responseJson;
  }
  console.log(results);

  return results;
};

//
export const resetFieldsValue = (refObj: Ref<object>) => {
  for (const key of Object.keys(refObj.value)) {
    refObj.value[key] = "";
  }
};
