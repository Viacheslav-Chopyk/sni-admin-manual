import { IGooglePost, IPostDashboard, socialType, IRedditPost, ITwitterPost, IYoutubePost, IFacebook, IInstagramPost } from './../../../shared/types/social.model';
import { IResponceDashboard } from './types/dashboard.types';
import { Observable, map, tap } from 'rxjs';
import { UserServiceService } from './../../../shared/services/user-service.service';
import { MainFilterService } from './../../../shared/services/main-filter.service';
import { ApiService } from './../../../core/services/api.service';
import { Injectable } from '@angular/core';
interface IRespSocial {
  data: IPostDashboard[];
  success: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private api: ApiService,
    private filterServ: MainFilterService,
    private userServ: UserServiceService
  ) {}

  getDataDashboard(): Observable<IResponceDashboard> {
    const filter = this.filterServ.filterSettings$.getValue();
    return this.api.post<IResponceDashboard>('monitoring/dashboard',
    {
       ...filter, businessId: this.userServ.currentBusinessId$.getValue()
      });
  }

  getDataChartFilter(): Observable<any> {
    const filter = this.filterServ.filterSettings$.getValue();
    return this.api.post<any>('monitoring/categoryPie',
    {
       ...filter, businessId: this.userServ.currentBusinessId$.getValue()
      });
  }

  getResultKey(page: number, social: socialType): Observable<any> {
    const filter = this.filterServ.filterSettings$.getValue();
    return this.api.post('search_api/private/' + social + '?page=' + page,
    {
      ...filter, businessId: this.userServ.currentBusinessId$.getValue()
     }).pipe(
      map((el: any) => {
        el.data.list = this.serializeData(el.data, social)
        return el;
      })
    )
  }

  private serializeData(data: any, social: socialType): IPostDashboard[] {
    let socials: IPostDashboard[] = [];
    switch (social) {
      case 'Reddit':
        socials = (data.list as IRedditPost[]).map(el => {
          return {
            title: el.PostTitle,
            post: el.PostText ? el.PostText.slice(0, 175) + '...' : '',
            link: el.Link,
            social: 'reddit.com',
            img: ''
          }
        })
        break;
      case 'Twitter':
        socials = (data.list as ITwitterPost[]).map(el => {
          return {
            title: el.Name,
            post: el.TweetText ? el.TweetText.slice(0, 175) + '...' : '',
            link: el.Link,
            social: 'twitter.com',
            img: el.Photos
          }
        });
        break;
      case 'Youtube':
        socials = (data.list as IYoutubePost[]).map(el => {
          return {
            title: el.Title,
            post: el.Description ? el.Description.slice(0, 175) + '...' : '',
            link: el.Url,
            social: 'youtube.com',
            img: el.Thumbnail
          }
        });
        break;
      case 'Instagram':
        socials = [];
        break;
      case 'Google':
        socials = (data.list as IGooglePost[]).map(el => {
          return {
            title: el.data.slice(0, 55) + '...',
            post: el.data ? el.data.slice(0, 175) + '...' : '',
            link: el.url,
            social: 'google.com',
            img: ''
          }
        });
        break;
        case 'FacebookPublic':
        socials = (data.list as IFacebook[]).map(el => {
          return {
            title: el.PostText.slice(0, 55) + '...',
            post: el.PostText ? el.PostText.slice(0, 175) + '...' : '',
            link: 'facebook.com.' + el.PostID,
            social: 'facebook.com',
            img: ''
          }
        });
        break;
      default:
        break;
    }
    return socials;
  }
}
