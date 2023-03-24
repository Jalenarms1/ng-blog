import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../services/blog-post.service';
import { CommentService } from '../../services/comment.service';
import { DateFormatService } from '../../services/date-format.service';
import { Post } from '../models';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postId: string = ''
  comment: string = ''
  post: Post = {} as Post;
  constructor(private router: ActivatedRoute, private postService: BlogPostService, private dateFormat: DateFormatService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.router.params.subscribe(param => {
      this.postId = param['id']
    })

    this.postService.getPost(this.postId).subscribe(res => {
      console.log(res);
      res = {...res, createdAt: this.dateFormat.dateAndTime(res.createdAt) as string}
      res.comments = res.comments?.map(item => {
        return {...item, createdAt: this.dateFormat.dateAndTime(item.createdAt) as string}
      })
      this.post = res
    })
  }

  submitComment() {
    this.commentService.addComment(this.comment, this.postId).subscribe(res => {
      location.reload()
    })
  }

}
