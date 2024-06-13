import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  podcasts: defineTable({
    user: v.id('users'),
    title: v.string(),
    description: v.string(),
    audioUrl: v.optional(v.string()),
    voicePrompt: v.string(),
    voiceType: v.string(),
    audioDuration: v.number(),
    imageUrl: v.optional(v.string()),
    imagePrompt: v.string(),
    author: v.string(),
    authorId: v.string(),
    authorImageUrl: v.string(),
    views: v.number(),
  })
    .searchIndex('search_author', { searchField: 'author' })
    .searchIndex('search_title', { searchField: 'title' })
    .searchIndex('search_body', {
      searchField: 'description',
    }),
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
  }),
});
