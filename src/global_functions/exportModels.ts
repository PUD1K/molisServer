import Comments from '../comments-module/comments.model.ts';
import CommentsReaction from '../comments-module/comments-reaction.model.ts';
import Posts from '../posts-module/posts.model.ts';
import PostsReaction from '../posts-module/posts-reaction.model.ts';
import Tags from '../tags-module/tags.model.ts';
import Topics from '../topics-module/topics.model.ts';
import TopicsTags from '../topics-module/topics-tags.model.ts';
import Users from '../users-module/users.model.ts';

// Comments.hasOne(Comments, { foreignKey: 'parent_comment_id', as: 'parent_comment' }); // comments.parent_comment_id
Comments.hasMany(Comments, { foreignKey: 'parent_comment_id', as: 'child_comments' }); // comments.parent_comment_id
Comments.belongsTo(Posts, { foreignKey: 'post_id' });
Comments.belongsToMany(Users, { through: CommentsReaction }); // comments-reaction table

Posts.hasMany(Comments, { foreignKey: 'post_id' }); // comments.post_id
Posts.belongsTo(Topics, { foreignKey: 'topic_id' }); // posts.topic_id
Posts.belongsToMany(Users, { through: PostsReaction }); // posts-reaction table

Topics.hasMany(Topics, { foreignKey: 'parent_topic_id', as: 'child_topics' }); // topics.parent_topic_id
Topics.hasMany(Posts, { foreignKey: 'topic_id' });
Topics.belongsToMany(Tags, { through: TopicsTags });

Users.belongsToMany(Posts, { through: PostsReaction });
Users.belongsToMany(Comments, { through: CommentsReaction });

export { Comments, CommentsReaction, Posts, PostsReaction, Tags, Topics, TopicsTags, Users };
