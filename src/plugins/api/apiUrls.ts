
export const userApi: Record<string, string> = {
  user: "/user/",
  searchPreview: "user.get.preview",
  userData: "/user/user_data",
  personal: "/user/personal",
  avatar: "/user/avatar",
  status: "/user/availability"
};

export const authApi: Record<string, string> = {
  login: "/auth/login",
  logout: "/auth/logout",
  signup: "auth.signup",
  checkUsername: "/auth/check_username",
  checkEmail: "/auth/check_email",
  accessToken: "/auth/token/access_token",
  userData: "/auth/token/user_data"
};

export function apiWithVar(api: string, variable: string | undefined) {
    return api + "/" + variable;
}
