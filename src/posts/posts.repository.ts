import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsRepository {
  private posts: Post[] = [];

  create(id: string, createPostDto: CreatePostDto): Post {
    const post: Post = {
      id,
      title: createPostDto.title,
      content: createPostDto.content,
      published: createPostDto.published ?? false,
    };

    this.posts.push(post);
    return post;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: string): Post | undefined {
    return this.posts.find((post) => post.id === id);
  }

  update(id: string, updatePostDto: UpdatePostDto): Post | undefined {
    const post = this.findOne(id);

    if (!post) {
      return undefined;
    }

    Object.assign(post, updatePostDto);
    return post;
  }

  delete(id: string): boolean {
    const postIndex = this.posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      return false;
    }

    this.posts.splice(postIndex, 1);
    return true;
  }
}
