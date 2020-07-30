import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/posts.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService
    ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      text: [null, [Validators.required]],
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    } else {
      const post: Post = {
        title: this.form.value.title,
        text: this.form.value.text,
        author: this.form.value.author,
        date: new Date()
      }
      this.postsService.create(post).subscribe(() => {
        this.form.reset();
      })
      console.log(post);
    }
  }

}
