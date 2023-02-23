import { validatorFactory } from "../utils/validator.utils";
import {ErrorCodes} from "../error/error.codes";
import { newMailingListEntrySchema } from "./mailing.list.request";

export const mailingListEntryValidator = validatorFactory(
  ErrorCodes.INVALID_ENTRY,
  newMailingListEntrySchema
);
