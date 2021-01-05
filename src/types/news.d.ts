import { User } from "@/types/index";

declare namespace News {
  type id = string;
  type newsTitle = string;
  type content = string;
  type uploadedTime = number[];
  type tag = number[];
  type searchTag = number;

  interface NewsCard {
    username: User.Username;
    newsTitle: News.newsTitle;
    content: News.content;
    tag: News.tag;
  }

  interface NewsInfo {
    id: News.id;
    username: User.Username;
    newsTitle: News.newsTitle;
    content: News.content;
    tag: News.tag;
    uploadedTime: News.uploadedTime;
  }

  interface NewsSearch {
    newsTitle: News.newsTitle;
    searchTag: News.searchTag;
  }
}

export type NewsInfo = News.NewsInfo;
export type NewsCard = News.NewsCard;

export type NewsDto = {
  id: News.id;
};
