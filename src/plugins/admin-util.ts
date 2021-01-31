import { bufToData, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import {
  BanPreviewUser,
  ChangeRolePreviewUser,
  ReplacePrUser,
  UpdatePreviewUser
} from "@/types/admin";
import { authRSocketApi, getAccessTokenJwt } from "@/plugins/api/rsocket-api";

export function isBanListInvalid(data: BanPreviewUser[]) {
  return data.find(elem => isNaN(elem.duration)) !== undefined;
}

export function isChangeRoleListInvalid(data: ChangeRolePreviewUser[]) {
  return (
    data.find(elem => elem.oldRoleError || elem.newRoleError) !== undefined
  );
}

export function isDelRoleListInvalid(data: UpdatePreviewUser[]) {
  return (
    data.find(
      elem => elem.previewUser.roles.length <= 1 || elem.updateRole == ""
    ) !== undefined
  );
}

export function isAddRoleListInvalid(data: UpdatePreviewUser[]) {
  return (
    data.find(
      elem => elem.previewUser.roles.length >= 3 || elem.updateRole == ""
    ) !== undefined
  );
}

export function buildUpdateRole(data: ReplacePrUser) {
  return {
    previewUser: data.prUser,
    updateRole: data.updateRole!
  };
}

export async function adminRequestResponse(data: any, path: string) {
  return getAccessTokenJwt().then(token => {
    return new Promise(resolve => {
      authRSocketApi()
        .requestResponse({
          data: dataBuf(data),
          metadata: metadataBuf(token, path)
        })
        .subscribe({
          onError: error => console.error(error),
          onComplete: value => resolve(bufToData(value))
        });
    });
  });
}
