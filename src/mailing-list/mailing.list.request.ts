import {ErrorType} from "../error/error.types";
import * as yup from "yup";
import "yup-phone-lite";

export const newMailingListEntrySchema = yup.object({
  body: yup.object().shape({
    name: yup.string().trim().max(20).required().typeError(ErrorType.INVALID_ENTRY),
    lastName: yup.string().trim().max(20).required().typeError(ErrorType.INVALID_ENTRY),
    email: yup
      .string()
      .trim()
      .email()
      .max(50)
      .required()
      .typeError(ErrorType.INVALID_ENTRY),
    phone: yup.string().trim().phone("IL").max(10).typeError(ErrorType.INVALID_ENTRY),
  }),
});
