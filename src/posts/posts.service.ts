import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './interfaces/post.interface';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  create(createPostDto: CreatePostDto): Post {
    const id = randomUUID();
    return this.postsRepository.create(id, createPostDto);
  }

  findAll(page = 1, limit = 5): Post[] {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be greater than 0');
    }

    const posts = this.postsRepository.findAll();
    const start = (page - 1) * limit;
    const end = start + limit;

    return posts.slice(start, end);
  }

  findOne(id: string): Post {
    const post = this.postsRepository.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  update(id: string, updatePostDto: UpdatePostDto): Post {
    const post = this.postsRepository.update(id, updatePostDto);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  delete(id: string): void {
    const isDeleted = this.postsRepository.delete(id);

    if (!isDeleted) {
      throw new NotFoundException('Post not found');
    }
  }
}
