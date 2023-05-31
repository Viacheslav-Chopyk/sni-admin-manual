export type socialType = 'FacebookPublic' | 'Instagram' | 'Discord' | 'Twitter' | 'Reddit' | 'Linkedin' | 'Google' | 'TikTok' | 'Youtube';

export interface INetwork {
  name: socialType;
  img: string;
  is_not_empty: boolean;
  active: boolean;
}
export interface IPostDashboard {
  title: string;
  post: string;
  link: string;
  social: string;
  img: string;
}
export interface IRespRedditPost {
  DataAnalyzerRedditPost: IRedditPost[];
}
export interface IRedditPost {
  Link: string;
  PostText: string;
  PostTitle: string;
}
export interface IRespTwitterPost {
  DataAnalyzerTwitter: ITwitterPost[];
}
export interface ITwitterPost {
  Link: string;
  TweetText: string;
  Photos: string;
  Name: string;
}

export interface IRespYoutubePost {
  DataAnalyzerYoutubeVideo: IYoutubePost[];
}

export interface IYoutubePost {
  Title: string;
  Thumbnail: string;
  Description: string;
  Url: string;
}

export interface IRespInstagramPost {
  DataAnalyzerInstagramPost: IInstagramPost[];
}

export interface IInstagramPost {
  AuthorName:string,
  Caption: string,
  Url: string,
  Network: string,
  img: string
}

export interface IRespGooglePost {
  DataAnalyzerGoogleSearch : IGooglePost[]

}

export interface IGooglePost {
  data: string;
  url: string;
  Keyword: string;
}

export interface IRespFacebook {
  DataAnalyzerFacebookPostAPI: IFacebook[]
}

export interface IFacebook {
  PostImage: string;
  PostText: string;
  PostID: string;
  Keyword: string;
  Url: string;
  Network: string
}

export interface ITikTok {
  Text : string,
  Url: string,
  Network : string,
  HashTags: string,
  img: string
}

export interface IRespITikTok {
  DataAnalyzerTikTokVideo: ITikTok[]
}

