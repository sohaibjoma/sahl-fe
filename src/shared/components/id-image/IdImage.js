import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardMedia, Fade, Modal, Skeleton } from '@mui/material';
import { useGetPilotIdQuery } from '@/redux/apis/pilots';

const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundcolor: 'red',
    },
  },
  img: {
    outline: 'none',
  },
}));

export default function IdImage({ id, side, alt, size = 140 }) {
  const { data: image, isFetching } = useGetPilotIdQuery({ id, side });

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = () => {
    setOpen(true);
  };

  return (
    <>
      <Card>
        {isFetching ? (
          <Skeleton variant='rectangular' animation='wave' height={size} />
        ) : (
          <CardMedia
            component='img'
            alt={alt}
            width={size}
            height={size}
            onClick={handleImage}
            sx={{ cursor: 'pointer' }}
            src={`data:${image?.mime_type};base64, ${image?.base64_image}`}
          />
        )}
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        className={classes.modal}
      >
        <Fade in={open} timeout={500} className={classes.img}>
          <img
            alt={alt}
            loading='lazy'
            style={{ maxHeight: '90%', maxWidth: '90%' }}
            src={`data:${image?.mime_type};base64, ${image?.base64_image}`}
          />
        </Fade>
      </Modal>
    </>
  );
}
