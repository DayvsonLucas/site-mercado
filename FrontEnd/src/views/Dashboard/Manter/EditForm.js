import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Upload } from '../../../components'
import { AddProduct, UpdateProduct } from '../../../actions/product'

const useStyles = makeStyles(() => ({
  root: {},
  Thumbnail: {
    border: '1px dashed #ddd',
    cursor: 'pointer',
    backgroundSize: 'cover',
    height: '252px',//'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    flexDirection: 'column'
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    padding: 0,
    justifyContent: 'center'
  },
  thumb: {
    position: "relative",
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 95,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%"
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  },

}));

function EditForm({
  className,
  product,
  productId,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (product.imageView) {
      const finalArray = [...files, {
        ...files,
        preview: `data:${product.contentType};base64,${product.imageView}`
      }]

      setFiles(finalArray)
    }
  }, [product])

  const handleOnSubmit = (values, actions) => {
    if (!productId) {
      let model = {
        "name": values.name,
        "quantity": values.quantity,
        "unitaryValue": values.unitaryValue,
      }
      AddProduct(model, files).then(response => {
        if (response.success) {
          actions.setSubmitting(false);
          actions.resetForm();
          enqueueSnackbar('Produto Adicionado com sucesso', {
            variant: 'success',
          });
        }
        else {
          actions.setSubmitting(false);
          enqueueSnackbar("Falha ao adicionar o produto", {
            variant: 'error',
          });
        }
      }).catch(error => {
        actions.setSubmitting(false);
        enqueueSnackbar(error, {
          variant: 'error',
        });
      })
    } else {
      UpdateProduct(values, files).then(response => {
        if (response.success) {
          actions.setSubmitting(false);
          actions.resetForm();
          enqueueSnackbar('Produto Atualizado com sucesso', {
            variant: 'success',
          });
        }
        else {
          actions.setSubmitting(false);
          enqueueSnackbar("Falha ao atualizar o produto", {
            variant: 'error',
          });
        }
      }).catch(error => {
        actions.setSubmitting(false);
        enqueueSnackbar(error, {
          variant: 'error',
        });
      })
    }
  }

  const thumbs = files.length > 0 && files.map((file, index) => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <img
          src={file.preview}
          className={classes.img}
        />
      </div>
    </div>
  ));

  return (
    <Formik
      initialValues={{
        id: product.id || '',
        name: product.name || '',
        quantity: product.quantity || '',
        unitaryValue: product.unitaryValue || '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Nome é Obrigatório'),
        quantity: Yup.string().required('Quantidade é Obrigatório'),
        unitaryValue: Yup.string().required('Valor é Obrigatório'),
      })}
      onSubmit={handleOnSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >

          <Card>
            <CardContent>

              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  sm={12}
                  xs={12}
                >

                  <div className={classes.Thumbnail}>
                    <Upload files={files} setFiles={setFiles} />
                  </div>
                  <aside className={classes.thumbsContainer}>
                    {thumbs}
                  </aside>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Nome do Produto"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.quantity && errors.quantity)}
                    fullWidth
                    helperText={touched.quantity && errors.quantity}
                    label="Quantidade"
                    name="quantity"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.quantity}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.unitaryValue && errors.unitaryValue)}
                    fullWidth
                    helperText={touched.phone && errors.unitaryValue}
                    label="Valor Unitário"
                    name="unitaryValue"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.unitaryValue}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {productId ? 'Atualizar Produto' : 'Adicionar Produto'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
}

EditForm.propTypes = {
  className: PropTypes.string,
};

export default EditForm;
