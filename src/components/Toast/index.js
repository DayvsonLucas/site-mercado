import { useSnackbar } from 'notistack';

  const Toast = props => {
    const { enqueueSnackbar } = useSnackbar();
    
    enqueueSnackbar(props.message, { ...props.variant });
}

export default Toast;  