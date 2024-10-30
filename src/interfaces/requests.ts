export interface IRequestResults {
  totalError: string;
  filteredErrors: { [key: string]: [] } | undefined;
  success: boolean;
  fulfilledValue: { [key: string]: [] };
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

export type IResponseJsonError = {
  message: string[];
  error: string;
  statusCode: number;
};

export type IResponseAdditionNote = {
  id: number;
  title: string;
  content: string;
};

export type ResponseAdditionNoteTypes =
  | IResponseJsonError
  | IResponseAdditionNote;
