import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AutobotsService } from './autobots.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('autobots')
@UseGuards(ThrottlerGuard) // limits 5 only 5 request per minute
export class AutobotsController {
  constructor(private readonly autobotsService: AutobotsService) {}

  @Get()
  async getAutobots(@Query('limit') limit = 10) {
    return this.autobotsService.getAutobots(limit);
  }

  @Get(':id/posts')
  async getAutobotPosts(@Param('id') id: number, @Query('limit') limit = 10) {
    return this.autobotsService.getAutobotPosts(id, limit);
  }

  @Get(':id/posts/:postId/comments')
  async getPostComments(
    @Param('id') id: number,
    @Param('postId') postId: number,
    @Query('limit') limit = 10,
  ) {
    return this.autobotsService.getPostComments(id, postId, limit);
  }
}
