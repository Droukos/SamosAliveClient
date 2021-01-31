import { TranslateResult } from "vue-i18n";

declare namespace Validations {
  type Field = string;
  type Value = string;
}

export type Field = Validations.Field;
export type Value = Validations.Value;
