import { User } from "@/types/index";

declare namespace News {
  type id = string;
  type newsTitle = string;
  type content = string;
  type uploadedTime = number[];
  type tag = number[];
  type searchTag = number[];

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

  interface NewsSearchOptions {
    newsTitle: News.newsTitle;
    searchTag: News.searchTag;
  }

  interface NewsSearchMut {
    options: News.NewsSearchOptions;
    searchCode: number;
  }
}

export type NewsInfo = News.NewsInfo;
export type NewsCard = News.NewsCard;
export type NewsSearchOptions = News.NewsSearchOptions;
export type NewsSearchMut = News.NewsSearchMut;

export type NewsDto = {
  id: News.id;
};
