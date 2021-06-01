import React, {
    useState,
    useEffect
} from 'react';
import { useParams } from 'react-router'
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import EditForm from './EditForm';
import { ListProductById } from '../../../actions/product'
import { Loading } from 'components';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function Manter() {
    const classes = useStyles();
    const params = useParams()
    const isMountedRef = useIsMountedRef();
    const [product, setProduct] = useState({
        id: '',
        name: '',
        quantity: '',
        unitaryValue: '',
    });
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (params.id) {
            setLoading(true)
            ListProductById(params.id)
                .then((response) => {
                    setProduct(response.data);
                    setLoading(false)
                });
        }
    }, []);


    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Page
            className={classes.root}
            title="Editar Produto"
        >
            <Container maxWidth="lg">
                <Box mt={3}>
                    <EditForm product={product} productId={params.id} />
                </Box>
            </Container>
        </Page>
    );
}

export default Manter;
