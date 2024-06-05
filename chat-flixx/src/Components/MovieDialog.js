import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import {useSelector,useDispatch} from "react-redux";
import { setOpen } from '../redux/movieSlice';
import VideoBackground from './VideoBackground';

export default function MovieDialog() { 
  const {open,id} = useSelector(store=>store.movie.open);
  const dispatch = useDispatch();

  const handleClose = () =>{
    dispatch(setOpen(false));
  }
 
  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" 
      >
       <DialogTitle id="alert-dialog-description">
        {"use googles location service?"}
       </DialogTitle>
       <DialogContent>
          <DialogContentText id="alert-dialog-description">
            let google handle this error!
            {/* <VideoBackground movieId={id} bool = {true}/> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}