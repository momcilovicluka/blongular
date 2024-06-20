import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
	selector: 'app-new-post',
	standalone: true,
	imports: [
		FormsModule,
		CommonModule,
		AngularEditorModule,
		HttpClientModule,
		ReactiveFormsModule,
		RouterModule
	],
	templateUrl: './new-post.component.html',
	styleUrl: './new-post.component.css',
})
export class NewPostComponent {
	permalink: string = '';
	imgSrc: string =
		'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg';
	selectedImage: any;

	categories: Array<any> = [];

	postForm: FormGroup;

	post: any;

	formStatus: string = 'Add New';

	id: string = '';

	constructor(
		private categoryService: CategoriesService,
		private fb: FormBuilder,
		private postsService: PostsService,
		private route: ActivatedRoute
	) {
		this.postForm = this.fb.group({
			title: ['', [Validators.required, Validators.minLength(10)]],
			permalink: ['', Validators.required],
			excerpt: ['', [Validators.required, Validators.minLength(10)]],
			category: ['', Validators.required],
			postImg: ['', Validators.required],
			content: ['', Validators.required],
		});

		this.postForm.get('permalink')?.disable();

		this.route.queryParams.subscribe((params) => {
			if (params['id']) {
				this.id = params['id'];
				this.postsService.loadOne(params['id']).subscribe((data) => {
					if (data) {
						this.post = data;
						this.postForm.patchValue({
							title: this.post.title,
							permalink: this.post.permalink,
							excerpt: this.post.excerpt,
							category: this.post.category.categoryId + '-' + this.post.category.category,
							content: this.post.content,
						});
						this.imgSrc = this.post.postImgPath;
						this.formStatus = 'Edit';
					}
				});
			}
		});
	}

	ngOnInit(): void {
		this.categoryService.loadData().subscribe((data) => {
			this.categories = data;
		});
	}

	get fc() {
		return this.postForm.controls;
	}

	onTitleChanged($event: any) {
		const title = $event.target.value;
		this.permalink = title.replace(/\s/g, '-');
	}

	showPreview($event: any) {
		const reader = new FileReader();
		reader.onload = () => {
			this.imgSrc = reader.result as string;
		};
		reader.readAsDataURL($event.target.files[0]);
		this.selectedImage = $event.target.files[0];
	}

	onSubmit() {
		let splitted = this.postForm.value.category.split('-');
		const postData: Post = {
			title: this.postForm.value.title,
			permalink: this.postForm.value.title.replace(/\s/g, '-'),
			category: {
				categoryId: splitted[0],
				category: splitted[1],
			},
			postImgPath: '',
			excerpt: this.postForm.value.excerpt,
			content: this.postForm.value.content,
			isFeatured: false,
			views: 0,
			status: 'new',
			createdAt: new Date(),
		};

		this.postsService.uploadImage(this.selectedImage, postData, this.formStatus, this.id);
		this.postForm.reset();
		this.imgSrc =
			'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg';
	}
}
