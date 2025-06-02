import { Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { STRIP_DESC } from '../../constants/posts';
import {
  ButtonGroup,
  PostBox,
  PostMeta,
  PostPreview,
  PostTitle,
} from './styles';
import { stripHtml } from './utils';

const PostCard = ({ post, canEdit, onDelete }) => {
  const cleanContent = stripHtml(post.content);
  const preview =
    cleanContent.length > STRIP_DESC
      ? cleanContent.slice(0, STRIP_DESC) + '...'
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
            {cleanContent.length > STRIP_DESC && (
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
