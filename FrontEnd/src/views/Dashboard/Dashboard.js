import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import { ListProduct } from '../../actions/product';
import { Page, Loading } from '../../components';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function Dashboard() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = useCallback(() => {
    ListProduct()
      .then((response) => {
        if (isMountedRef.current) {
          setProducts(response.data);
          setLoading(false)
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (!products) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Lista de Produtos"
    >
      <Container maxWidth={false}>
        <Header />
        {products && (
          <Box mt={3}>
            {loading &&
              <Loading />
            }
            <Results products={products} getProducts={getProducts} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default Dashboard;
