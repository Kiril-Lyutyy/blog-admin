import { Link } from 'react-router-dom';

import { Grid, Box, Button } from '@mui/material';
import {
  PostBox,
  PostTitle,
  PostMeta,
  PostPreview,
  ButtonGroup,
} from './styles';
import { stripHtml } from './utils';

const PostCard = ({ post, canEdit, onDelete }) => {
  const cleanContent = stripHtml(post.content);
  const preview =
    cleanContent.length > 120
      ? cleanContent.slice(0, 120) + '...'
      : cleanContent;

  return (
    <Grid item xs={12} key={post.id}>
      <PostBox>
        <Box mb={0.5}>
          <PostTitle variant="h5" component={Link} to={`/posts/${post.id}`}>
            {post.title}
          </PostTitle>
        </Box>

        <PostMeta variant="body1" component="p">
          By {post.author} on {new Date(post.created_at).toLocaleDateString()}
        </PostMeta>

        <PostPreview>{preview}</PostPreview>

        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
          <Box>
            {cleanContent.length > 120 && (
              <Button
                component={Link}
                to={`/posts/${post.id}`}
                size="small"
                variant="contained"
                color="secondary"
              >
                Read More
              </Button>
            )}
          </Box>

          {canEdit && (
            <ButtonGroup>
              <Button
                component={Link}
                to={`/posts/${post.id}/edit`}
                size="small"
                variant="outlined"
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </PostBox>
    </Grid>
  );
};

export default PostCard;
