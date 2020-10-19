export const userApi: Record<string, string> = {
  user: "user.filter.by.id",
  searchPreview: "user.get.preview",
  userData: "/user/user_data",
  personal: "/user/personal",
  avatar: "/user/avatar",
  status: "user.put.availability.state."
};

export const authApi: Record<string, string> = {
  login: "/auth/login",
  logout: "/auth/logout",
  signup: "auth.signup",
  checkUsername: "auth.username.check",
  checkEmail: "auth.email.check",
  accessToken: "/auth/token/access_token",
  userData: "/auth/token/user_data"
};

export const eventApi: Record<string, string> = {
  createEvent: "aed.event.post",
  findOccurrenceType: "aed.event.get"
};

export const newsApi: Record<string, string> = {
  createNews: "news.post",
  findNews: "news.get"
};

export const problemsApi: Record<string, string> = {
  createProblems: "aed.problems.post",
  findProblems: "aed.problems.get"
}

export function apiWithVar(api: string, variable: string | undefined) {
  return api + "/" + variable;
}
