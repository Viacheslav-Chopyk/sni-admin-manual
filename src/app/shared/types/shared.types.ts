// export interface IComment {
//   name: string;
//   img: string;
//   smile: number;
//   like: number;
//   date: string;
//   text: string;
//   isAnswer: boolean;
// }


export interface IUser {
  ID: number;
  TaskID: number;
  GroupID: number | string;
  ProfileName: string;
  ProfileID: number | string;
  CanSeeFriends: null | boolean;
  CanSeePosts: null | boolean;
  Age: null | number;
  Gender: null | string;
  Country: null | string;
  City: null | string;
  IsPostsExistsInProfileLast30Days: null | boolean;
  IsPostsExistsInGroupLast30Days: null | boolean;
  EducationLevel: null | string;
  CurrentJob: null | string;
  RelationshipStatus: null | string;
  PostsTextSementhic: null | string;
  IsAdmin: boolean;
  IsEngager: null | string;
  LastTimeTaken: string;
  Env: string;
  Network: null | string;
  presence?: number;
  influence?: number;
}

export interface IComment extends IPost {
  ID: number;
  TaskID: number;
  GroupID: number | string;
  ProfileName: string;
  ProfileID: number | string;
  PostID: number | string;
  CommentText: string;
  CommentSemanthic: string;
  IsKeyWordExists: boolean;
  CommentDate: string;
  LastTimeTaken: string;
  Likes: number;
  Env: string;
  Network: null | string;
  PostSemanthic: string | undefined;
  Category: string;
  User: {
    ProfileName: string;
  }
  Keyword?: string;
}
export interface IGroupPosts extends IGroup {
  Posts: IPostReport[];
}
export interface IPostReport extends IPost {
  IsKeyWordExists: boolean;
  Keyword?: string;
  Comments: IComment[];
  User: {
    ProfileName: string
  }
}

export interface IGroup {
  ID: number | string;
  TaskID: number;
  GroupID: number | string;
  CreationDate: string | null;
  IsParent: boolean | null;
  GroupType: string | null;
  LastTimeTaken: string;
  GroupName: string;
  GroupMembersAmount: number | null;
  Env: string;
  Network: null | string;
  Keywords: string[];
}

export interface IPost {
  ID: number;
  TaskID: number;
  GroupID: number | string;
  ProfileName: string;
  ProfileID: number | string;
  PostID: number | string;
  PostText: string;
  PostImage: null | string;
  PostSemanthic:  string | undefined;
  PostType: string;
  IsKeyWordExists: boolean;
  PostDate: string;
  LastTimeTaken: string;
  Likes: number;
  Env: string;
  Network: null | string;
  CommentSemanthic: string | undefined;
  Category: string;
  smile?: number;
  usersCount?: number;
  CompanyName: string | string[];
  CountCommentsPerPosts: number;
}

export interface IDataMonitoring {
  id: number;
  Keyword: string;
  Comments: Array<IComment>;
  CommentsCount: number;
  Groups: Array<IGroup>;
  GroupsCount: string;
  Posts: Array<IPost>;
  PostsCount: number;
  Users: Array<IUser>;
  UsersCount: number;
}

export interface IGroupDataChart extends IGroup {
  posts: IPostByCategory
}

export interface IPostByCategory {
  brands: IPost[] | IComment[],
  category: IPost[] | IComment[],
  general: IPost[] | IComment[],
  interesting: IPost[] | IComment[],
}

export interface IResponce<T> {
  success: boolean;
  data: T;
}
