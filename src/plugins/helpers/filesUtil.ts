import { FileImg } from "@/types";
import i18n from "@/plugins/i18n";
import { TranslateResult } from "vue-i18n";

export function checkIfFileSizeIsUnderMB(
  fileImg: FileImg,
  mb: number
): boolean {
  if (fileImg.selectedFile.name == "") return false;
  return fileImg.selectedFile.size / 1024 / 1024 <= mb;
}

export function checkFileType(fileImg: FileImg): boolean {
  let warnFileType = false;
  if (fileImg.selectedFile.name == "") return false;
  for (let i = 0; i < fileImg.validFileExtensions.length; i++) {
    const sCurExtension = fileImg.validFileExtensions[i];
    if (
      fileImg.selectedFile.name
        .substr(
          fileImg.selectedFile.name.length - sCurExtension.length,
          sCurExtension.length
        )
        .toLowerCase() == sCurExtension.toLowerCase()
    ) {
      warnFileType = true;
      break;
    }
  }
  return warnFileType;
}

export function getFileRules(field: TranslateResult, fileImg: FileImg) {
  return [
    (value: { size: number }) =>
      !value ||
      value.size < 1000000 ||
      i18n.t("validations.fileSize", [field, 1]),
    (value: any) =>
      !value ||
      checkFileType(fileImg) ||
      i18n.t("validations.fileValid", [field])
  ];
}
