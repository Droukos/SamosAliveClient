import {PreviewUser, User} from "@/types";

export interface BannedUser {
    username: User.Username
}

export interface BannedUsers {
    bannedUsers: BannedUser[];
}

export interface BanUser {
    username: User.Username,
    duration: number
}

export interface BanUsers {
    banUsers: BanUser[];
}

export interface ChangeRole {
    username: User.Username,
    oldRole: string,
    newRole: string
}

export interface ChangeRoles {
    changeRoles: ChangeRole[];
}

export interface UpRole {
    username: User.Username,
    role: string
}

export interface UpRoles {
    upRoles: UpRole[];
}

export interface BanPreviewUser {
    previewUser: PreviewUser,
    duration: number
}

export interface ChangeRolePreviewUser {
    previewUser: PreviewUser,
    oldRoleError: boolean,
    newRoleError: boolean,
    oldRole: string,
    newRole: string
}

export interface UpdatePreviewUser {
    previewUser: PreviewUser,
    updateRole: string
}

export interface IMutToAdminList {
    prUser: PreviewUser,
    adminOption: number,
}

export interface IMutRmElemAdminList {
    index: number,
    adminOption: number
}

export interface ReplacePrUser {
    prUser: PreviewUser,
    adminOption: number,
    index: number,
    duration?: number,
    chRoleOldRoleError?: boolean,
    chRoleNewRoleError?: boolean,
    oldRole?: string,
    newRole?: string,
    updateRole?: string
}