export type INote = {
  id: number;
  title: string;
  content: string;
};

export type responseJsonType = {
  [key: string]: number | string[] | string;
};

export interface IRequestResults {
  totalError: string;
  filteredErrors: { [key: string]: string[] } | undefined;
  success: boolean;
  fulfilledValue: responseJsonType;
}

export type methodsType = "get" | "post" | "delete";

export interface IOptions {
  method: methodsType;
  headers: {
    "Content-Type"?: string;
    Authorization?: string;
  };
  body?: string;
}
