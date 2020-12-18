import { User } from "@/types/index";

declare namespace News {
  type id = string;
  type newsTitle = string;
  type content = string;
  type uploadedTime = number[];

  interface NewsCard {
    username: User.Username;
    newsTitle: News.newsTitle;
    content: News.content;
  }

  interface NewsInfo {
    id: News.id;
    username: User.Username;
    newsTitle: News.newsTitle;
    content: News.content;
    uploadedTime: News.uploadedTime;
  }
}

export type NewsInfo = News.NewsInfo;
export type NewsCard = News.NewsCard;

export type NewsDto = {
  id: News.id;
};
