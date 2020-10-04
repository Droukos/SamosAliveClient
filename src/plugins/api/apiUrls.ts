export const userApi: Record<string, string> = {
  user: "/user/",
  searchPreview: "/user/find_users_preview",
  userData: "/user/user_data",
  personal: "/user/personal",
  avatar: "/user/avatar",
  status: "/user/availability"
};

export const authApi: Record<string, string> = {
  login: "/auth/login",
  logout: "/auth/logout",
  signup: "/auth/sign_up",
  checkUsername: "/auth/check_username",
  checkEmail: "/auth/check_email",
  accessToken: "/auth/token/access_token",
  userData: "/auth/token/user_data"
};

export const eventApi: Record<string, string> = {
  createEvent: "/event/createEvent",
  findOccurrenceType: "/event/find_occurrence_type"
};

export const newsApi: Record<string, string> = {
  createNews: "/news/createNews",
  findNews: "/news/find_news"
};

export function apiWithVar(api: string, variable: string | undefined) {
  return api + "/" + variable;
}
